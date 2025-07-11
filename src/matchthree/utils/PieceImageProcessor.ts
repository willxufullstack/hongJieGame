import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { PieceType } from "../game/utils/PieceType";

export class PieceImageProcessor {
    
    /**
     * 为棋子图片添加特殊效果边框和标识
     */
    public static createEnhancedPiece(baseTexture: Texture, pieceType: string): Container {
        const container = new Container();
        
        // 基础图片
        const baseSprite = new Sprite(baseTexture);
        baseSprite.anchor.set(0.5);
        container.addChild(baseSprite);
        
        // 根据类型添加特殊效果
        switch (pieceType) {
            case PieceType.ROW:
                this.addRowEffect(container, baseSprite.width, baseSprite.height);
                break;
            case PieceType.COL:
                this.addColEffect(container, baseSprite.width, baseSprite.height);
                break;
            case PieceType.RAINBOW:
                this.addRainbowEffect(container, baseSprite.width, baseSprite.height);
                break;
            default:
                // 普通棋子不添加特效
                break;
        }
        
        return container;
    }
    
    /**
     * 行消除棋子特效：水平箭头和发光边框
     */
    private static addRowEffect(container: Container, width: number, height: number): void {
        const graphics = new Graphics();
        
        // 水平发光边框
        graphics.lineStyle(3, 0xFF6600, 0.8); // 橙色发光边框
        graphics.drawRoundedRect(-width/2, -height/2, width, height, 8);
        
        // 水平箭头指示器
        const arrowY = 0;
        const arrowSize = Math.min(width, height) * 0.15;
        
        // 左箭头
        graphics.beginFill(0xFF6600, 0.9);
        graphics.moveTo(-width/2 - 5, arrowY);
        graphics.lineTo(-width/2 - 5 - arrowSize, arrowY - arrowSize/2);
        graphics.lineTo(-width/2 - 5 - arrowSize, arrowY + arrowSize/2);
        graphics.endFill();
        
        // 右箭头
        graphics.beginFill(0xFF6600, 0.9);
        graphics.moveTo(width/2 + 5, arrowY);
        graphics.lineTo(width/2 + 5 + arrowSize, arrowY - arrowSize/2);
        graphics.lineTo(width/2 + 5 + arrowSize, arrowY + arrowSize/2);
        graphics.endFill();
        
        // 水平线条
        graphics.lineStyle(2, 0xFF6600, 0.7);
        graphics.moveTo(-width/2, arrowY);
        graphics.lineTo(width/2, arrowY);
        
        container.addChild(graphics);
    }
    
    /**
     * 列消除棋子特效：垂直箭头和发光边框
     */
    private static addColEffect(container: Container, width: number, height: number): void {
        const graphics = new Graphics();
        
        // 垂直发光边框
        graphics.lineStyle(3, 0x00FF66, 0.8); // 绿色发光边框
        graphics.drawRoundedRect(-width/2, -height/2, width, height, 8);
        
        // 垂直箭头指示器
        const arrowX = 0;
        const arrowSize = Math.min(width, height) * 0.15;
        
        // 上箭头
        graphics.beginFill(0x00FF66, 0.9);
        graphics.moveTo(arrowX, -height/2 - 5);
        graphics.lineTo(arrowX - arrowSize/2, -height/2 - 5 - arrowSize);
        graphics.lineTo(arrowX + arrowSize/2, -height/2 - 5 - arrowSize);
        graphics.endFill();
        
        // 下箭头
        graphics.beginFill(0x00FF66, 0.9);
        graphics.moveTo(arrowX, height/2 + 5);
        graphics.lineTo(arrowX - arrowSize/2, height/2 + 5 + arrowSize);
        graphics.lineTo(arrowX + arrowSize/2, height/2 + 5 + arrowSize);
        graphics.endFill();
        
        // 垂直线条
        graphics.lineStyle(2, 0x00FF66, 0.7);
        graphics.moveTo(arrowX, -height/2);
        graphics.lineTo(arrowX, height/2);
        
        container.addChild(graphics);
    }
    
    /**
     * 彩虹万能棋子特效：彩虹边框和星星装饰
     */
    private static addRainbowEffect(container: Container, width: number, height: number): void {
        const graphics = new Graphics();
        
        // 彩虹渐变边框 (用多色线条模拟)
        const colors = [0xFF0000, 0xFF6600, 0xFFFF00, 0x00FF00, 0x0066FF, 0x6600FF];
        const borderWidth = 4;
        
        for (let i = 0; i < colors.length; i++) {
            graphics.lineStyle(borderWidth, colors[i], 0.8);
            const offset = i * 2;
            graphics.drawRoundedRect(-width/2 - offset, -height/2 - offset, width + offset*2, height + offset*2, 12);
        }
        
        // 中心星星装饰
        this.addStarDecoration(graphics, 0, 0, Math.min(width, height) * 0.2);
        
        // 四角小星星
        const cornerOffset = Math.min(width, height) * 0.3;
        const starSize = Math.min(width, height) * 0.08;
        this.addStarDecoration(graphics, -cornerOffset, -cornerOffset, starSize);
        this.addStarDecoration(graphics, cornerOffset, -cornerOffset, starSize);
        this.addStarDecoration(graphics, -cornerOffset, cornerOffset, starSize);
        this.addStarDecoration(graphics, cornerOffset, cornerOffset, starSize);
        
        container.addChild(graphics);
    }
    
    /**
     * 绘制星星装饰
     */
    private static addStarDecoration(graphics: Graphics, x: number, y: number, size: number): void {
        graphics.beginFill(0xFFFFFF, 0.9);
        
        const points = [];
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size * 0.4;
        
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes;
            points.push(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
        }
        
        graphics.drawPolygon(points);
        graphics.endFill();
    }
}