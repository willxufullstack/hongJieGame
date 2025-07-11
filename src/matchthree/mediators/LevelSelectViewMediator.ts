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
            
            // Wait for view and dependencies to be ready before creating level buttons
            this.waitForViewReady();
        } catch (error) {
            console.error("Error in LevelSelectViewMediator.initialize:", error);
        }
    }
    
    private waitForViewReady(attempts: number = 0): void {
        const maxAttempts = 20; // Increased attempts for better reliability
        
        try {
            // Check if all required dependencies are available
            if (this.view && 
                typeof this.view.createLevelButton === 'function' && 
                this.levelsRepository &&
                this.levelsRepository.getLevels) {
                
                // Additional check to ensure levels are actually loaded
                const levels = this.levelsRepository.getLevels();
                if (levels && levels.length > 0) {
                    this.createMapButtons();
                    return;
                }
            }
            
            if (attempts >= maxAttempts) {
                console.warn("LevelSelectView not ready after maximum attempts - skipping button creation");
                return;
            }
            
            // Use setTimeout with shorter delay for more responsive checking
            setTimeout(() => {
                this.waitForViewReady(attempts + 1);
            }, 50);
        } catch (error) {
            console.error("Error in waitForViewReady:", error);
            if (attempts < maxAttempts) {
                setTimeout(() => {
                    this.waitForViewReady(attempts + 1);
                }, 100);
            }
        }
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private createMapButtons(): void {
        try {
            this.levelsIds = new Map<LevelSelectButton, number>();
            
            const levels: LevelInfo[] = this.levelsRepository.getLevels();
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
                } else {
                    console.warn(`Failed to create level button for level ${i}`);
                }
            }
        } catch (error) {
            console.error("Error in createMapButtons:", error);
        }
    }
    private backButton_onTriggeredHandler(e: any): void {
        this.flowService.setHomeView();
    }
    private levelButton_onTriggeredHandler(e: any): void {
        this.gameService.createLevel(this.levelsIds.get(e.currentTarget));
    }
}
