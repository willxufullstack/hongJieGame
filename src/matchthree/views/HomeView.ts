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
        // English subtitle with proper centering
        const englishTitle = PixiFactory.getHorrorText("Red Sister Big Devil", 24);
        englishTitle.x = ViewPortSize.HALF_WIDTH;
        englishTitle.y = ViewPortSize.MAX_HEIGHT * 0.22;
        // Center the container properly
        englishTitle.pivot.x = englishTitle.getBounds().width * 0.5;
        englishTitle.pivot.y = englishTitle.getBounds().height * 0.5;
        this.addChild(englishTitle);

        // Chinese main title with proper centering
        const chineseTitle = "\u7EA2\u59D0\u5927\u9B54\u738B"; // Unicode for 红姐大魔王
        const chineseLogo = PixiFactory.getHorrorText(chineseTitle, 36);
        chineseLogo.x = ViewPortSize.HALF_WIDTH;
        chineseLogo.y = ViewPortSize.MAX_HEIGHT * 0.32;
        // Center the container properly
        chineseLogo.pivot.x = chineseLogo.getBounds().width * 0.5;
        chineseLogo.pivot.y = chineseLogo.getBounds().height * 0.5;
        this.addChild(chineseLogo);

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