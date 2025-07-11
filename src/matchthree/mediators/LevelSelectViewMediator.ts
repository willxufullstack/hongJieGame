import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { LevelInfo } from "./../game/models/LevelInfo";
import { LevelsRepository } from "./../game/utils/LevelRepository";
import { ScoreUtils } from "./../game/utils/ScoreUtils";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { LevelSelectButton } from "./../views/components/LevelSelectButton";
import { LevelSelectView } from "./../views/LevelSelectView";

@injectable()
export class LevelSelectViewMediator extends Mediator<LevelSelectView> {
    @inject(FlowService) private flowService: FlowService;
    @inject(GameService) private gameService: GameService;
    @inject(LevelsRepository) private levelsRepository: LevelsRepository;

    private levelsIds: Map<LevelSelectButton, number>;

    public initialize(): void {
        try {
            // Set up back button immediately if available
            if (this.view && this.view.backButton) {
                this.eventMap.mapListener(this.view.backButton, "click", this.backButton_onTriggeredHandler, this);
            }
            
            // Listen for assets loaded event and check global flag
            this.eventMap.mapListener(this.eventDispatcher, 'ASSETS_LOADED', this.onAssetsLoaded, this);
            
            // Also check if assets are already loaded
            if ((window as any).ASSETS_LOADED) {
                setTimeout(() => this.onAssetsLoaded(), 100);
            }
            
            // Try immediate initialization first
            if (this.canCreateButtons()) {
                this.createMapButtons();
            } else {
                // Fall back to waiting if dependencies aren't ready
                this.waitForViewReady();
            }
        } catch (error) {
            console.error("Error in LevelSelectViewMediator.initialize:", error);
            // Fallback: try again after a delay
            setTimeout(() => this.waitForViewReady(), 100);
        }
    }
    
    private onAssetsLoaded(): void {
        console.log("Assets loaded - attempting to create buttons");
        // Remove the listener to avoid multiple calls
        this.eventMap.unmapListener(this.eventDispatcher, 'ASSETS_LOADED', this.onAssetsLoaded, this);
        
        // Try to create buttons now that assets are loaded
        if (this.canCreateButtons()) {
            this.createMapButtons();
        } else {
            // Still wait a bit more for other dependencies
            setTimeout(() => {
                if (this.canCreateButtons()) {
                    this.createMapButtons();
                } else {
                    this.createFallbackButtons();
                }
            }, 500);
        }
    }
    
    private canCreateButtons(): boolean {
        try {
            // Check if view is available
            if (!this.view) {
                console.log("LevelSelectView: view not available");
                return false;
            }
            
            // Check if createLevelButton method works (this tests PixiFactory)
            if (typeof this.view.createLevelButton !== 'function') {
                console.log("LevelSelectView: createLevelButton method not available");
                return false;
            }
            
            // Test if PixiFactory can actually create buttons (assets loaded)
            try {
                const testButton = this.view.createLevelButton("test");
                if (testButton) {
                    // Clean up test button
                    if (testButton.parent) {
                        testButton.parent.removeChild(testButton);
                    }
                } else {
                    console.log("LevelSelectView: PixiFactory cannot create buttons (assets not loaded)");
                    return false;
                }
            } catch (testError) {
                console.log("LevelSelectView: Button creation test failed:", testError);
                return false;
            }
            
            // Check levels repository
            if (!this.levelsRepository) {
                console.log("LevelSelectView: levelsRepository not injected");
                return false;
            }
            
            try {
                const levels = this.levelsRepository.getLevels();
                if (!levels || levels.length === 0) {
                    console.log("LevelSelectView: levels array is empty or null");
                    return false;
                }
                console.log(`LevelSelectView: All dependencies ready, ${levels.length} levels available`);
                return true;
            } catch (levelsError) {
                console.log("LevelSelectView: Error getting levels:", levelsError);
                return false;
            }
        } catch (error) {
            console.error("Error in canCreateButtons:", error);
            return false;
        }
    }
    
    private waitForViewReady(attempts: number = 0): void {
        const maxAttempts = 50; // Significantly increased for Vercel environment
        
        try {
            if (this.canCreateButtons()) {
                this.createMapButtons();
                return;
            }
            
            if (attempts >= maxAttempts) {
                console.warn("LevelSelectView not ready after maximum attempts - attempting fallback creation");
                this.createFallbackButtons();
                return;
            }
            
            // Progressive delay: start fast, then slow down
            const delay = attempts < 10 ? 50 : attempts < 30 ? 100 : 200;
            setTimeout(() => {
                this.waitForViewReady(attempts + 1);
            }, delay);
        } catch (error) {
            console.error("Error in waitForViewReady:", error);
            if (attempts < maxAttempts) {
                setTimeout(() => {
                    this.waitForViewReady(attempts + 1);
                }, 200);
            } else {
                this.createFallbackButtons();
            }
        }
    }
    
    private createFallbackButtons(): void {
        try {
            console.log("Creating fallback level buttons");
            this.levelsIds = new Map<LevelSelectButton, number>();
            
            // Get levels from repository if available, otherwise use defaults
            let levels;
            try {
                levels = this.levelsRepository ? this.levelsRepository.getLevels() : null;
            } catch (e) {
                levels = null;
            }
            
            const numLevels = levels && levels.length > 0 ? levels.length : 9;
            console.log(`Creating ${numLevels} fallback buttons`);
            
            for (let i = 0; i < numLevels; i++) {
                // Try multiple button creation methods
                let levelButton = null;
                
                // Method 1: Try view's createLevelButton
                try {
                    levelButton = this.view.createLevelButton(String(i + 1));
                } catch (e) {
                    console.log(`Method 1 failed for button ${i + 1}:`, e);
                    levelButton = null;
                }
                
                // Method 2: Try direct LevelSelectButton creation
                if (!levelButton) {
                    try {
                        levelButton = this.createDirectLevelButton(String(i + 1));
                    } catch (e) {
                        console.log(`Method 2 failed for button ${i + 1}:`, e);
                        levelButton = null;
                    }
                }
                
                if (levelButton) {
                    try {
                        levelButton.x = ViewPortSize.HALF_WIDTH - 60 + Math.floor(i % 3) * 60;
                        levelButton.y = 180 + Math.floor(i / 3) * 60;
                        if (typeof levelButton.setStars === 'function') {
                            levelButton.setStars(0);
                        }
                        if (levelButton.anchor && typeof levelButton.anchor.set === 'function') {
                            levelButton.anchor.set(0.5);
                        }
                        
                        const levelId = levels && levels[i] ? levels[i].levelId : i;
                        this.levelsIds.set(levelButton, levelId);
                        this.eventMap.mapListener(levelButton, "click", this.levelButton_onTriggeredHandler, this);
                        console.log(`Successfully created fallback button ${i + 1}`);
                    } catch (setupError) {
                        console.error(`Error setting up button ${i + 1}:`, setupError);
                    }
                } else {
                    console.warn(`Failed to create any button for level ${i + 1}`);
                }
            }
            console.log("Fallback buttons creation completed");
        } catch (error) {
            console.error("Error in createFallbackButtons:", error);
        }
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private createMapButtons(): void {
        try {
            console.log("Creating level buttons from repository");
            this.levelsIds = new Map<LevelSelectButton, number>();
            
            const levels: LevelInfo[] = this.levelsRepository.getLevels();
            console.log(`Creating ${levels.length} level buttons`);
            
            let levelInfo: LevelInfo;
            let levelButton: LevelSelectButton;

            for (let i = 0; i < levels.length; i++) {
                levelInfo = levels[i];
                
                // Safe button creation with fallback
                try {
                    levelButton = this.view.createLevelButton(String(levelInfo.levelId + 1));
                    if (!levelButton) {
                        console.warn("createLevelButton returned null, using direct creation");
                        levelButton = this.createDirectLevelButton(String(levelInfo.levelId + 1));
                    }
                } catch (buttonError) {
                    console.warn("Error creating button, using direct creation:", buttonError);
                    levelButton = this.createDirectLevelButton(String(levelInfo.levelId + 1));
                }
                
                if (levelButton) {
                    levelButton.x =
                        ViewPortSize.HALF_WIDTH - (levelButton.width + 4) + Math.floor(i % 3) * (levelButton.width + 4);
                    levelButton.y = 180 + Math.floor(i / 3) * (levelButton.height + 8);
                    levelButton.setStars(ScoreUtils.getNumStars(levelInfo.hiScore, levelInfo.scoreStarts));
                    levelButton.anchor.set(0.5);
                    this.levelsIds.set(levelButton, levels[i].levelId);
                    this.eventMap.mapListener(levelButton, "click", this.levelButton_onTriggeredHandler, this);
                    console.log(`Created level button ${i + 1}`);
                } else {
                    console.warn(`Failed to create level button for level ${i}, skipping`);
                }
            }
            console.log("Level buttons creation completed");
        } catch (error) {
            console.error("Error in createMapButtons:", error);
            // Fallback to creating basic buttons
            this.createFallbackButtons();
        }
    }
    private backButton_onTriggeredHandler(e: any): void {
        this.flowService.setHomeView();
    }
    private createDirectLevelButton(text: string): LevelSelectButton {
        try {
            // Direct creation without going through view
            const levelButton = new LevelSelectButton();
            if (levelButton && typeof levelButton.setText === 'function') {
                levelButton.setText(text);
                this.view.addChild(levelButton);
                return levelButton;
            }
            return null;
        } catch (error) {
            console.error("Direct level button creation failed:", error);
            return null;
        }
    }

    private levelButton_onTriggeredHandler(e: any): void {
        try {
            const levelId = this.levelsIds.get(e.currentTarget);
            console.log("Level button clicked, levelId:", levelId);
            
            if (levelId !== undefined) {
                console.log("Calling gameService.createLevel with levelId:", levelId);
                this.gameService.createLevel(levelId);
            } else {
                console.error("Level ID not found for button:", e.currentTarget);
            }
        } catch (error) {
            console.error("Error in levelButton_onTriggeredHandler:", error);
        }
    }
}
