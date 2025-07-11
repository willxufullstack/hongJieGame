import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { MagicValues } from "./MagicValues";

export class HorrorTextRenderer {
    
    public static createHorrorText(text: string, fontSize: number = 32): Container {
        const container = new Container();
        
        // Detect if text contains Chinese characters
        const hasChinese = /[\u4e00-\u9fff]/.test(text);
        
        if (hasChinese) {
            // Chinese text with simulated horror effects
            return this.createChineseHorrorText(text, fontSize, container);
        } else {
            // English text with hand-drawn horror effects
            return this.createEnglishHorrorText(text, fontSize, container);
        }
    }
    
    private static createChineseHorrorText(text: string, fontSize: number, container: Container): Container {
        // Base text style for Chinese
        const style = new TextStyle({
            fontFamily: '"Microsoft YaHei", "SimHei", serif',
            fontSize: fontSize,
            fill: 0xFF0000,
            align: 'center',
            fontWeight: 'bold',
            dropShadow: true,
            dropShadowColor: 0x660000,
            dropShadowBlur: 8,
            dropShadowDistance: 4
        });
        
        const textElement = new Text(text, style);
        textElement.anchor.set(0.5);
        container.addChild(textElement);
        
        // Add blood drip effects around Chinese text
        this.addBloodDrips(container, textElement.width, textElement.height);
        
        return container;
    }
    
    private static createEnglishHorrorText(text: string, fontSize: number, container: Container): Container {
        // Create each letter with custom horror effects
        const letters = text.split('');
        let totalWidth = 0;
        const letterSpacing = fontSize * 0.8;
        
        letters.forEach((letter, index) => {
            if (letter === ' ') {
                totalWidth += letterSpacing * 0.5;
                return;
            }
            
            const letterContainer = this.createHorrorLetter(letter, fontSize);
            letterContainer.x = totalWidth;
            container.addChild(letterContainer);
            
            totalWidth += letterSpacing;
        });
        
        // Center the entire text
        container.pivot.x = totalWidth * 0.5;
        
        return container;
    }
    
    private static createHorrorLetter(letter: string, fontSize: number): Container {
        const letterContainer = new Container();
        
        // Base letter with distorted style
        const style = new TextStyle({
            fontFamily: 'serif',
            fontSize: fontSize,
            fill: 0xFF0000,
            align: 'center',
            fontWeight: 'bold'
        });
        
        const textElement = new Text(letter, style);
        textElement.anchor.set(0.5);
        
        // Add random distortion
        const distortion = Math.random() * 0.2 - 0.1;
        textElement.skew.x = distortion;
        textElement.scale.y = 1 + (Math.random() * 0.3 - 0.15);
        
        letterContainer.addChild(textElement);
        
        // Add blood drips for each letter
        this.addLetterBloodDrips(letterContainer, fontSize);
        
        // Add cracks and scratches
        this.addHorrorEffects(letterContainer, fontSize);
        
        return letterContainer;
    }
    
    private static addBloodDrips(container: Container, width: number, height: number): void {
        const bloodGraphics = new Graphics();
        
        // Create multiple blood drips
        for (let i = 0; i < 5; i++) {
            const x = (Math.random() - 0.5) * width;
            const y = height * 0.3 + Math.random() * height * 0.4;
            
            // Blood drip shape
            bloodGraphics.beginFill(0x8B0000, 0.8);
            bloodGraphics.drawCircle(x, y, 2 + Math.random() * 3);
            
            // Drip trail
            const dripHeight = 10 + Math.random() * 20;
            bloodGraphics.drawRect(x - 1, y, 2, dripHeight);
            
            // Drip end
            bloodGraphics.drawCircle(x, y + dripHeight, 1 + Math.random() * 2);
            bloodGraphics.endFill();
        }
        
        container.addChild(bloodGraphics);
    }
    
    private static addLetterBloodDrips(container: Container, fontSize: number): void {
        const bloodGraphics = new Graphics();
        
        // Small blood drips for individual letters
        for (let i = 0; i < 2; i++) {
            const x = (Math.random() - 0.5) * fontSize * 0.6;
            const y = fontSize * 0.2 + Math.random() * fontSize * 0.3;
            
            bloodGraphics.beginFill(0x660000, 0.7);
            bloodGraphics.drawCircle(x, y, 1 + Math.random() * 2);
            
            // Small drip
            const dripHeight = 5 + Math.random() * 10;
            bloodGraphics.drawRect(x - 0.5, y, 1, dripHeight);
            bloodGraphics.endFill();
        }
        
        container.addChild(bloodGraphics);
    }
    
    private static addHorrorEffects(container: Container, fontSize: number): void {
        const effectsGraphics = new Graphics();
        
        // Add scratches and cracks
        effectsGraphics.lineStyle(1, 0x440000, 0.6);
        
        for (let i = 0; i < 3; i++) {
            const startX = (Math.random() - 0.5) * fontSize * 0.8;
            const startY = (Math.random() - 0.5) * fontSize * 0.8;
            const endX = startX + (Math.random() - 0.5) * fontSize * 0.4;
            const endY = startY + (Math.random() - 0.5) * fontSize * 0.4;
            
            effectsGraphics.moveTo(startX, startY);
            effectsGraphics.lineTo(endX, endY);
        }
        
        container.addChild(effectsGraphics);
    }
}