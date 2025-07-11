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
    
    private canCreateButtons(): boolean {
        try {
            // Comprehensive dependency check
            if (!this.view) {
                console.log("LevelSelectView: view not available");
                return false;
            }
            
            if (typeof this.view.createLevelButton !== 'function') {
                console.log("LevelSelectView: createLevelButton method not available");
                return false;
            }
            
            if (!this.levelsRepository) {
                console.log("LevelSelectView: levelsRepository not injected");
                return false;
            }
            
            if (typeof this.levelsRepository.getLevels !== 'function') {
                console.log("LevelSelectView: getLevels method not available");
                return false;
            }
            
            const levels = this.levelsRepository.getLevels();
            if (!levels || levels.length === 0) {
                console.log("LevelSelectView: levels array is empty or null");
                return false;
            }
            
            console.log(`LevelSelectView: All dependencies ready, ${levels.length} levels available`);
            return true;
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
            // Create a minimal set of buttons if repository isn't ready
            this.levelsIds = new Map<LevelSelectButton, number>();
            
            // Create 9 default level buttons (common number for match-3 games)
            for (let i = 0; i < 9; i++) {
                const levelButton = this.view.createLevelButton(String(i + 1));
                if (levelButton) {
                    levelButton.x = ViewPortSize.HALF_WIDTH - (levelButton.width + 4) + Math.floor(i % 3) * (levelButton.width + 4);
                    levelButton.y = 180 + Math.floor(i / 3) * (levelButton.height + 8);
                    levelButton.setStars(0); // No stars for fallback
                    levelButton.anchor.set(0.5);
                    this.levelsIds.set(levelButton, i);
                    this.eventMap.mapListener(levelButton, "click", this.levelButton_onTriggeredHandler, this);
                }
            }
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
                levelButton = this.view.createLevelButton(String(levelInfo.levelId + 1));
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
                    console.warn(`Failed to create level button for level ${i}`);
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
    private levelButton_onTriggeredHandler(e: any): void {
        this.gameService.createLevel(this.levelsIds.get(e.currentTarget));
    }
}
