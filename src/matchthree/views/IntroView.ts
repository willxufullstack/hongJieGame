import { Container, Sprite, Text, Graphics } from "pixi.js";

import { AtlasKeys } from "./../utils/AtlasKeys";
import { PixiFactory } from "./../utils/PixiFactory";
import { Texts } from "./../utils/Texts";
import { ViewPortSize } from "./../utils/ViewPortSize";
import { HorrorTextRenderer } from "./../utils/HorrorTextRenderer";

export class IntroView extends Container {
    private bloodParticles: Graphics[] = [];
    
    constructor() {
        super();

        this.setupBackground();
        this.setupHorrorEffects();
        this.setupText();
        this.startBloodAnimation();
    }
    
    private setupBackground(): void {
        // Dark horror background
        this.addChild(PixiFactory.getColorBackground(0x0a0000));
        
        // Add dark overlay with gradient effect
        const overlay = new Graphics();
        overlay.beginFill(0x000000, 0.7);
        overlay.drawRect(0, 0, ViewPortSize.MAX_WIDTH, ViewPortSize.MAX_HEIGHT);
        overlay.endFill();
        this.addChild(overlay);
    }
    
    private setupHorrorEffects(): void {
        // Add some atmospheric horror elements
        this.createBloodSplatters();
        this.createShadowEffects();
    }
    
    private createBloodSplatters(): void {
        const bloodGraphics = new Graphics();
        
        // Create random blood splatters
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * ViewPortSize.MAX_WIDTH;
            const y = Math.random() * ViewPortSize.MAX_HEIGHT;
            const size = 5 + Math.random() * 15;
            
            bloodGraphics.beginFill(0x660000, 0.6);
            bloodGraphics.drawCircle(x, y, size);
            
            // Add irregular splatter shape
            for (let j = 0; j < 5; j++) {
                const offsetX = (Math.random() - 0.5) * size * 2;
                const offsetY = (Math.random() - 0.5) * size * 2;
                const splatterSize = Math.random() * size * 0.5;
                bloodGraphics.drawCircle(x + offsetX, y + offsetY, splatterSize);
            }
            bloodGraphics.endFill();
        }
        
        this.addChild(bloodGraphics);
    }
    
    private createShadowEffects(): void {
        // Add creepy shadow effects around the edges
        const shadowGraphics = new Graphics();
        
        // Top shadow
        shadowGraphics.beginFill(0x000000, 0.8);
        shadowGraphics.drawRect(0, 0, ViewPortSize.MAX_WIDTH, 50);
        
        // Bottom shadow
        shadowGraphics.drawRect(0, ViewPortSize.MAX_HEIGHT - 50, ViewPortSize.MAX_WIDTH, 50);
        
        // Left shadow
        shadowGraphics.drawRect(0, 0, 30, ViewPortSize.MAX_HEIGHT);
        
        // Right shadow
        shadowGraphics.drawRect(ViewPortSize.MAX_WIDTH - 30, 0, 30, ViewPortSize.MAX_HEIGHT);
        
        shadowGraphics.endFill();
        this.addChild(shadowGraphics);
    }
    
    private setupText(): void {
        // Use HorrorTextRenderer for the main title
        const horrorTitle = HorrorTextRenderer.createHorrorText("红姐工作室", 36);
        horrorTitle.x = ViewPortSize.HALF_WIDTH;
        horrorTitle.y = ViewPortSize.HALF_HEIGHT - 30;
        this.addChild(horrorTitle);
        
        // Add subtitle with horror styling
        const subtitle = HorrorTextRenderer.createHorrorText("恐怖游戏制作", 20);
        subtitle.x = ViewPortSize.HALF_WIDTH;
        subtitle.y = ViewPortSize.HALF_HEIGHT + 30;
        this.addChild(subtitle);
        
        // Add a pulsing "Enter if you dare" text
        const warningText = HorrorTextRenderer.createHorrorText("胆小者勿入", 16);
        warningText.x = ViewPortSize.HALF_WIDTH;
        warningText.y = ViewPortSize.HALF_HEIGHT + 80;
        warningText.alpha = 0.7;
        this.addChild(warningText);
        
        // Add pulsing animation to warning text
        this.animateWarningText(warningText);
    }
    
    private animateWarningText(text: Container): void {
        const animate = () => {
            text.alpha = 0.3 + Math.sin(Date.now() * 0.003) * 0.4;
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    private startBloodAnimation(): void {
        // Create falling blood drops
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createBloodDrop();
            }, i * 1000);
        }
    }
    
    private createBloodDrop(): void {
        const bloodDrop = new Graphics();
        bloodDrop.beginFill(0x8B0000, 0.8);
        bloodDrop.drawCircle(0, 0, 3);
        bloodDrop.endFill();
        
        bloodDrop.x = Math.random() * ViewPortSize.MAX_WIDTH;
        bloodDrop.y = -10;
        
        this.addChild(bloodDrop);
        this.bloodParticles.push(bloodDrop);
        
        // Animate blood drop falling
        const animateDrop = () => {
            bloodDrop.y += 2;
            if (bloodDrop.y > ViewPortSize.MAX_HEIGHT + 10) {
                this.removeChild(bloodDrop);
                const index = this.bloodParticles.indexOf(bloodDrop);
                if (index > -1) {
                    this.bloodParticles.splice(index, 1);
                }
                
                // Create new blood drop
                setTimeout(() => {
                    this.createBloodDrop();
                }, 2000 + Math.random() * 3000);
                return;
            }
            requestAnimationFrame(animateDrop);
        };
        animateDrop();
    }
}