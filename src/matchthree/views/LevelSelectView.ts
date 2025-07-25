import { Container } from "pixi.js";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { MagicValues } from "./../utils/MagicValues";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { IconButton } from "./components/IconButton";
import { LevelSelectButton } from "./components/LevelSelectButton";

export class LevelSelectView extends Container {
    private _backButton: IconButton;
    public get backButton(): IconButton {
        return this._backButton;
    }

    constructor() {
        super();

        this.createBackground();
        this.createText();
        this.createButton();
        
        // Bind method to instance for production environment
        this.createLevelButton = this.createLevelButton.bind(this);
    }
    public createLevelButton(text: string): LevelSelectButton {
        try {
            const level: LevelSelectButton = PixiFactory.getLevelSelectButton();
            level.setText(text);
            this.addChild(level);
            return level;
        } catch (error) {
            console.error("Error creating level button, using fallback:", error);
            // Create fallback button
            const fallbackLevel = new LevelSelectButton();
            fallbackLevel.setText(text);
            this.addChild(fallbackLevel);
            return fallbackLevel;
        }
    }
    private createBackground(): void {
        this.addChild(PixiFactory.getBackground());
        this.addChild(PixiFactory.getBackgroundPopup());
    }
    private createText(): void {
        this.addChild(PixiFactory.getTitle(Texts.LEVEL_SELECT));
    }
    private createButton(): void {
        this._backButton = PixiFactory.getIconButton(AtlasKeys.ICON_HOME, IconButton.TYPE_MEDIUM);
        this._backButton.x = ViewPortSize.HALF_WIDTH;
        this._backButton.y = ViewPortSize.MAX_HEIGHT - MagicValues.BORDER_OFFSET_BOTTOM;
        this._backButton.anchor.set(0.5);
        this.addChild(this._backButton);
    }
}
