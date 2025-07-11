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

        this.createComponents();
    }

    public createComponents(): void {
        this.createBackground();
        this.createText();
        this.createButton();
    }
    public createLevelButton(text: string): LevelSelectButton {
        try {
            const level: LevelSelectButton = PixiFactory.getLevelSelectButton();
            if (level) {
                level.setText(text);
                this.addChild(level);
                return level;
            }
            console.warn("Failed to create level button - PixiFactory returned null");
            return null;
        } catch (error) {
            console.error("Error creating level button:", error);
            return null;
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
        if (this._backButton) {
            this._backButton.x = ViewPortSize.HALF_WIDTH;
            this._backButton.y = ViewPortSize.MAX_HEIGHT - MagicValues.BORDER_OFFSET_BOTTOM;
            this._backButton.anchor.set(0.5);
            this.addChild(this._backButton);
        }
    }
}
