import { Container, Graphics, Sprite, Texture } from "pixi.js";

import { IconButton } from "./../views/components/IconButton";
import { LevelSelectButton } from "./../views/components/LevelSelectButton";
import { AtlasKeys } from "./AtlasKeys";
import { MagicValues } from "./MagicValues";
import { ViewPortSize } from "./ViewPortSize";

export class PixiFactory {
    public static getText(text: string, fontSize: number = MagicValues.SIZE_DEFAULT): Container {
        const style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: fontSize }
        };

        return new PIXI.extras.BitmapText(text, style);
    }
    public static getHorrorText(text: string, fontSize: number = MagicValues.SIZE_DEFAULT): Container {
        // Detect if text contains Chinese characters
        const hasChinese = /[\u4e00-\u9fff]/.test(text);
        
        // Check if Creepster font is actually loaded
        const isCreepsterLoaded = document.fonts.check('16px Creepster');
        
        const style = new PIXI.TextStyle({
            fontFamily: hasChinese ? 
                '"Microsoft YaHei", "SimHei", serif' :  // Chinese: use system fonts
                isCreepsterLoaded ? 
                    'Creepster, serif' :  // English: use Creepster if loaded
                    'serif',  // Fallback to serif
            fontSize: fontSize,
            fill: 0xFF0000,  // Bright blood red color
            align: 'center',
            fontWeight: hasChinese ? 'bold' : 'normal',
            letterSpacing: hasChinese ? 0 : 2,  // More spacing for English Nosifer
            dropShadow: true,
            dropShadowColor: 0x8B0000,
            dropShadowBlur: hasChinese ? 6 : 4,  // More blur for Chinese to simulate dripping
            dropShadowDistance: hasChinese ? 3 : 2
        });

        const horrorText = new PIXI.Text(text, style);
        
        // Add multiple shadow layers for more dramatic effect
        const shadowStyle1 = new PIXI.TextStyle({
            fontFamily: 'Arial, "Microsoft YaHei", "SimHei", sans-serif',
            fontSize: fontSize,
            fill: 0x000000,  // Black shadow
            align: 'center',
            fontWeight: 'bold'
        });
        
        const shadowStyle2 = new PIXI.TextStyle({
            fontFamily: 'Arial, "Microsoft YaHei", "SimHei", sans-serif',
            fontSize: fontSize,
            fill: 0x440000,  // Dark red shadow
            align: 'center',
            fontWeight: 'bold'
        });
        
        const shadow1 = new PIXI.Text(text, shadowStyle1);
        const shadow2 = new PIXI.Text(text, shadowStyle2);
        
        const container = new Container();
        
        // Multiple shadow layers for depth
        shadow2.x = 4;
        shadow2.y = 4;
        shadow2.alpha = 0.5;
        
        shadow1.x = 2;
        shadow1.y = 2;
        shadow1.alpha = 0.8;
        
        container.addChild(shadow2);
        container.addChild(shadow1);
        container.addChild(horrorText);
        
        return container;
    }
    public static getTitle(label: string): Container {
        const style = {
            align: "center",
            font: { name: MagicValues.FONT_FAMILY, size: MagicValues.SIZE_TITLE }
        };

        const title = new PIXI.extras.BitmapText(label, style);
        title.x = ViewPortSize.HALF_WIDTH;
        title.y = 110;
        title.pivot.x = title.width * 0.5;
        title.pivot.y = title.height * 0.5;
        return title;
    }
    public static getIconButton(icon: string, shapeType: string = IconButton.TYPE_SMALL): IconButton {
        const button: IconButton = new IconButton(shapeType);
        button.setIco(icon);
        return button;
    }
    public static getImage(atlasKey: string): Sprite {
        const texture: Texture = AtlasKeys.getTexture(atlasKey);
        return new Sprite(texture);
    }
    public static getBackground(): Sprite {
        const background = new Sprite(AtlasKeys.getTexture(AtlasKeys.BG_IMAGE));
        // Scale the background to fit the game viewport
        background.width = ViewPortSize.MAX_WIDTH;
        background.height = ViewPortSize.MAX_HEIGHT;
        // Add horror tint - darker and more ominous
        background.tint = 0x888888; // Darker tint for horror atmosphere
        return background;
    }
    public static getColorBackground(color = 0x000000): Graphics {
        return this.getColorBox(ViewPortSize.MAX_WIDTH, ViewPortSize.MAX_HEIGHT, color);
    }
    public static getColorBox(width: number, heigth: number, color = 0x00000): Graphics {
        const background: Graphics = new Graphics();
        background.beginFill(color);
        background.drawRect(0, 0, width, heigth);
        return background;
    }
    public static getBackgroundPopup(): Sprite {
        const image: Sprite = new Sprite(AtlasKeys.getTexture(AtlasKeys.BG_POPUP_IMAGE));
        image.anchor.set(0.5);
        image.x = ViewPortSize.HALF_WIDTH;
        image.y = ViewPortSize.HALF_HEIGHT;
        return image;
    }
    public static getBackgroundHUD(): Sprite {
        return new Sprite(AtlasKeys.getTexture(AtlasKeys.BG_HUD_IMAGE));
    }
    public static getShadowBackground(alpha = 0.6): Graphics {
        const bg: Graphics = PixiFactory.getColorBackground(0x000000);
        bg.alpha = alpha;
        return bg;
    }
    public static getLevelSelectButton(): LevelSelectButton {
        return new LevelSelectButton();
    }
}
