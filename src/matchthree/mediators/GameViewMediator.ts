import { GameView } from "./../views/GameView";
import { GameEvent } from "./../events/GameEvent";
import { LevelModel } from "./../game/models/LevelModel";

import { injectable, inject } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

@injectable()
export class GameViewMediator extends Mediator<GameView> {
    @inject(LevelModel) private levelModel: LevelModel;
    
    private _componentsCreated: boolean = false;

    public initialize(): void {
        // Always wait for level creation before creating components
        // This ensures proper initialization order
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.CREATE_LEVEL_COMMAND, this.onLevelCreated, this);
    }
    
    private onLevelCreated(): void {
        // Remove the listener and create components
        this.eventMap.unmapListener(this.eventDispatcher, GameEvent.CREATE_LEVEL_COMMAND, this.onLevelCreated, this);
        this.createComponents();
    }
    
    private createComponents(): void {
        if (!this._componentsCreated) {
            this.view.createComponents();
            this._componentsCreated = true;
        }
    }
    
    public destroy(): void {
        this.eventMap.unmapListeners();
        this.view.destroy();
    }
}
