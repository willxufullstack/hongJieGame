import { Container } from "pixi.js";

import { PixiFactory } from "./../utils/PixiFactory";
import { GridFieldComponent } from "./components/GridFieldComponent";
import { HUDGameComponent } from "./components/HUDGameComponent";

export class GameView extends Container {
    private _gridField: GridFieldComponent;
    private _hudComponent: HUDGameComponent;
    public get gridField(): GridFieldComponent {
        return this._gridField;
    }

    constructor() {
        super();
        console.log("GameView constructor called");
        this.createBackground();
        console.log("GameView background created");
        // Components will be created by the mediator when the view is properly initialized
    }
    public destroy(): void {
        this.removeChild(this._gridField);
        this.removeChild(this._hudComponent);

        this._gridField = null;
        this._hudComponent = null;
    }
    public createComponents(): void {
        console.log("GameView.createComponents() called");
        this._hudComponent = new HUDGameComponent();
        this.addChild(this._hudComponent);
        console.log("HUD component created and added");

        this._gridField = new GridFieldComponent();
        this.addChild(this._gridField);
        console.log("Grid field component created and added");
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getBackground());
    }
}
