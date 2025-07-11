import { Container, Sprite } from "pixi.js";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { IconButton } from "./components/IconButton";

export class HomeView extends Container {
    private _playButton: IconButton;
    private _optionsButton: IconButton;
    public get playButton(): IconButton {
        return this._playButton;
    }
    public get optionsButton(): IconButton {
        return this._optionsButton;
    }

    constructor() {
        super();

        this.createBackground();
        this.createImages();
        this.createButtons();
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getBackground());
    }
    private createImages(): void {
        // Replace image logo with text logo "HongJie DaMoWang"
        const logo = PixiFactory.getText("HongJie DaMoWang", 32);
        logo.x = ViewPortSize.HALF_WIDTH;
        logo.y = ViewPortSize.MAX_HEIGHT * 0.3;
        logo.pivot.x = logo.width * 0.5;
        logo.pivot.y = logo.height * 0.5;
        this.addChild(logo);

        // Original image logo commented out
        // const logoImage: Sprite = PixiFactory.getImage(AtlasKeys.LOGO_MATCH_THREE);
    }
    private createButtons(): void {
        this._playButton = PixiFactory.getIconButton(AtlasKeys.ICON_RESUME, IconButton.TYPE_MEDIUM);
        this._playButton.x = ViewPortSize.HALF_WIDTH;
        this._playButton.y = ViewPortSize.MAX_HEIGHT - 50 - MagicValues.BORDER_OFFSET_BOTTOM;
        this.addChild(this._playButton);

        this._optionsButton = PixiFactory.getIconButton(AtlasKeys.ICON_CONFIG, IconButton.TYPE_MEDIUM);
        this._optionsButton.x = ViewPortSize.HALF_WIDTH;
        this._optionsButton.y = ViewPortSize.MAX_HEIGHT - MagicValues.BORDER_OFFSET_BOTTOM;
        this.addChild(this._optionsButton);
    }
}