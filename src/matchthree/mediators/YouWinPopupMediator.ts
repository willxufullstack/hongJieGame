import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { LevelModel } from "./../game/models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { YouWinPopup } from "./../views/YouWinPopup";

@injectable()
export class YouWinPopupMediator extends Mediator<YouWinPopup> {
    @inject(LevelModel) private levelModel: LevelModel;
    @inject(FlowService) private flowService: FlowService;
    @inject(GameService) private gameService: GameService;

    public initialize(): void {
        try {
            // Check if view is properly initialized
            if (!this.view) {
                console.error("YouWinPopup view not available");
                return;
            }
            
            // Use setTimeout to ensure view is fully constructed before accessing methods
            setTimeout(() => {
                this.initializeView();
            }, 10);
        } catch (error) {
            console.error("Error in YouWinPopupMediator.initialize:", error);
        }
    }
    
    private initializeView(): void {
        try {
            if (!this.view || typeof this.view.createStars !== 'function') {
                console.error("YouWinPopup.createStars method not available after initialization delay");
                return;
            }
            
            // Check if levelModel is available
            if (!this.levelModel) {
                console.error("LevelModel not available in YouWinPopupMediator");
                return;
            }
            
            // Check if levelModel has required properties
            if (typeof this.levelModel.numStars === 'undefined' || !this.levelModel.levelInfo) {
                console.error("LevelModel properties not available:", {
                    numStars: this.levelModel.numStars,
                    levelInfo: this.levelModel.levelInfo
                });
                return;
            }

            this.view.createStars(this.levelModel.numStars);
            this.view.updateValues(String(this.levelModel.score), String(this.levelModel.levelInfo.hiScore));

            if (this.view.retryButton) {
                this.eventMap.mapListener(this.view.retryButton, "click", this.retryButton_onTriggeredHandler, this);
            }
            if (this.view.levelSelectButton) {
                this.eventMap.mapListener(
                    this.view.levelSelectButton,
                    "click",
                    this.levelSelectButton_onTriggeredHandler,
                    this
                );
            }
        } catch (error) {
            console.error("Error in YouWinPopupMediator.initializeView:", error);
        }
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private retryButton_onTriggeredHandler(e: any): void {
        this.flowService.closePopup();
        this.gameService.retryCommand();
    }
    private levelSelectButton_onTriggeredHandler(e: any): void {
        this.flowService.closePopup();
        this.flowService.setLevelSelectView();
    }
}
