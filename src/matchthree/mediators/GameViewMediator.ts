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
        console.log("GameViewMediator.initialize() called");
        // Since GameView is only created during level creation, we can create components immediately
        // The CREATE_LEVEL_COMMAND has already been processed by the time this mediator is initialized
        this.createComponents();
    }
    
    private createComponents(): void {
        console.log("GameViewMediator.createComponents() called, componentsCreated:", this._componentsCreated);
        if (!this._componentsCreated) {
            console.log("Creating GameView components...");
            this.view.createComponents();
            this._componentsCreated = true;
            console.log("GameView components created successfully");
        }
    }
    
    public destroy(): void {
        this.eventMap.unmapListeners();
        this.view.destroy();
    }
}
