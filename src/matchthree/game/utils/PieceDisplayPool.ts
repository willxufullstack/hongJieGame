import { Sprite } from "pixi.js";

import { AtlasKeys } from "./../../utils/AtlasKeys";

export class PixiSpritePool {
    public static spriteList: Map<string, Sprite[]>;
    public static init(): void {
        this.spriteList = new Map<string, Sprite[]>();
    }
    public static getImage(assetId: string): Sprite {
        if (this.spriteList.get(assetId) === undefined) {
            this.spriteList.set(assetId, new Array<Sprite>());
        }

        const list: Sprite[] = this.spriteList.get(assetId);
        let piece: Sprite;
        if (list.length === 0) {
            const texture = AtlasKeys.getTexture(assetId);
            piece = new Sprite(texture);
            piece.anchor.set(0.5);
            
            // Scale down new avatar images to fit tile size
            if (this.isNewGamePiece(assetId)) {
                // Calculate scale to fit within tile dimensions
                const targetSize = 45; // Target size for game pieces
                const scaleX = targetSize / texture.width;
                const scaleY = targetSize / texture.height;
                const scale = Math.min(scaleX, scaleY); // Use smaller scale to maintain aspect ratio
                piece.scale.set(scale);
            }
        } else {
            piece = list.shift();
        }
        piece.visible = true;
        piece.alpha = 1;
        
        // Don't reset scale for new pieces as it's already set above
        if (!this.isNewGamePiece(assetId)) {
            piece.scale.set(1);
        }

        return piece;
    }
    
    private static isNewGamePiece(assetId: string): boolean {
        return assetId.startsWith("piece_normal_") || 
               assetId.startsWith("piece_row_") || 
               assetId.startsWith("piece_col_") || 
               assetId === "piece_rainbow";
    }
    public static back(piece: Sprite): void {
        const assetId = (<any>piece.texture).textureCacheIds[0];
        const list: Sprite[] = this.spriteList.get(assetId);
        piece.visible = false;

        if (list.indexOf(piece) === -1) {
            list.push(piece);
        }
    }
}
