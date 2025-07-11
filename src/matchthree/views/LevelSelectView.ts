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

        try {
            this.createComponents();
        } catch (error) {
            console.error("Error in LevelSelectView constructor:", error);
        }
    }

    public createComponents(): void {
        try {
            this.createBackground();
            this.createText();
            this.createButton();
        } catch (error) {
            console.error("Error in LevelSelectView.createComponents:", error);
        }
    }
    public createLevelButton(text: string): LevelSelectButton {
        try {
            // Try to create button using PixiFactory
            if (PixiFactory && typeof PixiFactory.getLevelSelectButton === 'function') {
                const level: LevelSelectButton = PixiFactory.getLevelSelectButton();
                if (level) {
                    level.setText(text);
                    this.addChild(level);
                    return level;
                }
            }
            
            // Fallback: create button directly
            console.log("Using fallback button creation for:", text);
            const fallbackButton = this.createFallbackLevelButton(text);
            if (fallbackButton) {
                this.addChild(fallbackButton);
                return fallbackButton;
            }
            
            console.warn("All button creation methods failed");
            return null;
        } catch (error) {
            console.error("Error creating level button:", error);
            return null;
        }
    }
    
    private createFallbackLevelButton(text: string): LevelSelectButton {
        try {
            // Create button directly without PixiFactory
            const button = new LevelSelectButton();
            if (button && typeof button.setText === 'function') {
                button.setText(text);
                return button;
            }
            return null;
        } catch (error) {
            console.error("Fallback button creation failed:", error);
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
