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
        // Don't anchor here, let the parent handle centering
        container.addChild(textElement);
        
        // Add blood drip effects around Chinese text
        this.addBloodDrips(container, textElement.width, textElement.height);
        
        return container;
    }
    
    private static createEnglishHorrorText(text: string, fontSize: number, container: Container): Container {
        // Create each letter with custom horror effects
        const letters = text.split('');
        let totalWidth = 0;
        const letterSpacing = fontSize * 0.6; // Reduced spacing for better fit
        
        letters.forEach((letter, index) => {
            if (letter === ' ') {
                totalWidth += letterSpacing * 0.4; // Smaller space width
                return;
            }
            
            const letterContainer = this.createHorrorLetter(letter, fontSize);
            letterContainer.x = totalWidth;
            container.addChild(letterContainer);
            
            totalWidth += letterSpacing;
        });
        
        // Don't set pivot here, let the parent handle centering
        
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
        
        // Add random distortion but keep it subtle for readability
        const distortion = Math.random() * 0.1 - 0.05; // Reduced distortion
        textElement.skew.x = distortion;
        textElement.scale.y = 1 + (Math.random() * 0.2 - 0.1); // Reduced scale variation
        
        letterContainer.addChild(textElement);
        
        // Add blood drips for each letter (reduced for smaller text)
        this.addLetterBloodDrips(letterContainer, fontSize);
        
        // Add cracks and scratches (reduced for smaller text)
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
        
        // Fewer, smaller blood drips for compact text
        const dripCount = fontSize > 20 ? 2 : 1; // Less drips for smaller fonts
        
        for (let i = 0; i < dripCount; i++) {
            const x = (Math.random() - 0.5) * fontSize * 0.4; // Smaller spread
            const y = fontSize * 0.1 + Math.random() * fontSize * 0.2; // Higher position
            
            bloodGraphics.beginFill(0x660000, 0.6);
            const dripSize = Math.max(0.5, fontSize * 0.05); // Scale with font size
            bloodGraphics.drawCircle(x, y, dripSize);
            
            // Smaller drip trail
            const dripHeight = Math.max(2, fontSize * 0.2);
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