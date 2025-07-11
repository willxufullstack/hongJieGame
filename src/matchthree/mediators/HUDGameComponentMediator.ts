import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { GameEvent } from "./../events/GameEvent";
import { GameStatus } from "./../game/models/GameStatus";
import { LevelInfo } from "./../game/models/LevelInfo";
import { LevelModel } from "./../game/models/LevelModel";
import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { HUDGameComponent } from "./../views/components/HUDGameComponent";

@injectable()
export class HUDGameComponentMediator extends Mediator<HUDGameComponent> {
    @inject(LevelModel) private levelModel: LevelModel;
    @inject(GameStatus) private gameStatus: GameStatus;
    @inject(GameService) private gameService: GameService;
    @inject(FlowService) private flowService: FlowService;

    private _paused: boolean;

    public initialize(): void {
        try {
            if (this.view.pauseButton) {
                this.eventMap.mapListener(this.view.pauseButton, "click", this.pauseButton_onTriggeredHandler, this);
            }
            this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_HUD_DATA, this.game_onUpdateHandler, this);

            // Check if levelInfo is available (level has been selected)
            if (!this.levelModel || !this.levelModel.levelInfo) {
                console.warn("HUDGameComponentMediator initialized before level selection - deferring HUD setup");
                // Listen for level creation to setup HUD properly
                this.eventMap.mapListener(this.eventDispatcher, GameEvent.CREATE_LEVEL_COMMAND, this.onLevelCreated, this);
                return;
            }

            this.setupHUDType();
        } catch (error) {
            console.error("Error in HUDGameComponentMediator.initialize:", error);
        }
    }
    
    private onLevelCreated(): void {
        // Remove the temporary listener
        this.eventMap.unmapListener(this.eventDispatcher, GameEvent.CREATE_LEVEL_COMMAND, this.onLevelCreated, this);
        // Now setup HUD properly
        this.setupHUDType();
    }
    public destroy(): void {
        this._paused = true;
        this.eventMap.unmapListeners();
    }
    private setupHUDType(): void {
        if (this.levelModel.levelInfo.levelType === LevelInfo.TIMER_TYPE) {
            this.view.setTimerType();
            this.eventMap.mapListener(this.eventDispatcher, GameEvent.RESUME, this.game_onResumeHandler, this);
        } else {
            this.view.setMoveType();
        }
    }
    private game_onResumeHandler(e: any): void {
        this._paused = false;
        this.tick();
    }
    private tick(): void {
        if (this._paused === true) {
            return;
        }
        this.levelModel.clock--;
        this.view.updateValues(this.levelModel);

        if (this.levelModel.levelInfo.levelType === LevelInfo.TIMER_TYPE && this.levelModel.clock === 0) {
            if (this.gameStatus.hasToWait) {
                this.gameService.gameOver();
            } else {
                this.gameService.gameOverCommand();
            }
            this._paused = true;
            return;
        }
        setTimeout(this.tick.bind(this), 1000);
    }
    private game_onUpdateHandler(e: any): void {
        this.view.updateValues(this.levelModel);
    }
    private pauseButton_onTriggeredHandler(e: any): void {
        this._paused = true;
        this.flowService.showPausePopup();
    }
}
