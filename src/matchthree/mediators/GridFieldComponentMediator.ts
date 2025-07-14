import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";
import { TweenLite } from "gsap";
import { Sprite } from "pixi.js";

import { PixiSpritePool } from "../game/utils/PieceDisplayPool";
import { PieceUtils } from "../game/utils/PieceUtils";
import { GameEvent } from "./../events/GameEvent";
import { GameManager } from "./../game/managers/GameManager";
import { LevelModel } from "./../game/models/LevelModel";
import { PieceData } from "./../game/models/PieceData";
import { Tile } from "./../game/models/Tile";
import { TouchPhase } from "./../game/models/TouchPhase";
import { AnimationUtils } from "./../game/utils/AnimationUtils";
import { GameService } from "./../services/GameService";
import { GridFieldComponent } from "./../views/components/GridFieldComponent";

@injectable()
export class GridFieldComponentMediator extends Mediator<GridFieldComponent> {
    @inject(LevelModel) private levelModel: LevelModel;
    @inject(GameManager) private gameManager: GameManager;
    @inject(GameService) private gameService: GameService;

    private _displays: Map<PieceData, Sprite>;

    public initialize(): void {
        this._displays = new Map<PieceData, Sprite>();
        this.view.generateGrid(this.levelModel.maxCols, this.levelModel.maxRows);

        this.view.interactive = true;

        this.eventMap.mapListener(this.eventDispatcher, GameEvent.CLEAR_GRID, this.game_onClearGridHandler, this);
        this.eventMap.mapListener(this.eventDispatcher, GameEvent.UPDATE_GRID, this.game_onUpdateGridHandler, this);

        this.eventMap.mapListener(this.view, "mousedown", this.view_onSelectPiecesHandler, this);
        this.eventMap.mapListener(this.view, "mouseup", this.view_onSelectPiecesHandler, this);
        
        // Add mobile touch support for game grid
        this.eventMap.mapListener(this.view, "touchstart", this.view_onSelectPiecesHandler, this);
        this.eventMap.mapListener(this.view, "touchend", this.view_onSelectPiecesHandler, this);
        
        // Add pointer events for modern browsers
        this.eventMap.mapListener(this.view, "pointerdown", this.view_onSelectPiecesHandler, this);
        this.eventMap.mapListener(this.view, "pointerup", this.view_onSelectPiecesHandler, this);

        this.gameManager.nextStep();
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    public updateDisplays(): void {
        if (this.levelModel.toRemove.length > 0) {
            this.removeDisplays();
        } else if (this.levelModel.toAdd.length > 0) {
            this.addDisplays();
        } else if (this.levelModel.toMove.length > 0) {
            this.moveDisplays();
        }
    }
    public addDisplays(): void {
        let piece: PieceData;
        while (this.levelModel.toAdd.length > 0) {
            piece = this.levelModel.toAdd.pop();
            if (this._displays.get(piece)) {
                continue;
            }
            const assetId: string = PieceUtils.getAssetId(piece.pieceId, piece.pieceType);
            piece.display = PixiSpritePool.getImage(assetId);
            piece.updateDisplayPosition();
            this.addDisplayToStage(piece);
        }
        this.gameManager.nextStep();
    }
    public removeDisplays(): void {
        let piece: PieceData;
        const animationList: TweenLite[] = [];

        while (this.levelModel.toRemove.length > 0) {
            piece = this.levelModel.toRemove.pop();

            this.levelModel.removePiece(piece);
            this._displays.delete(piece);

            animationList.push(AnimationUtils.createRemoveTween(piece, this.destroyDisplay));
        }
        AnimationUtils.applyAnimation(animationList, this.gameManager.nextStep);
    }
    public destroyDisplay(display: Sprite): void {
        PixiSpritePool.back(display);
        display.parent.removeChild(display);
    }
    public moveDisplays(): void {
        const animationList: TweenLite[] = [];

        while (this.levelModel.toMove.length > 0) {
            animationList.push(AnimationUtils.createMoveTween(this.levelModel.toMove.pop()));
        }
        AnimationUtils.applyAnimation(animationList, this.onComplete);
    }
    public onComplete = (ob: any = this) => {
        ob.gameManager.nextStep();
    };
    public addDisplayToStage(piece: PieceData): void {
        this.view.addChild(piece.display);
        this._displays.set(piece, piece.display);
    }
    public removeDisplayFromStage(piece: PieceData): void {
        piece.display.parent.removeChild(piece.display);
        this._displays.delete(piece);
    }
    private view_onSelectPiecesHandler(e: any): void {
        if (this.levelModel.toMove.length || this.levelModel.toRemove.length || this.levelModel.toAdd.length) {
            return;
        }

        // Map different event types to touch phases
        let touchPhase;
        if (e.type === "mousedown" || e.type === "touchstart" || e.type === "pointerdown") {
            touchPhase = TouchPhase.BEGAN;
        } else if (e.type === "mouseup" || e.type === "touchend" || e.type === "pointerup") {
            touchPhase = TouchPhase.ENDED;
        } else if (e.type === TouchPhase.BEGAN || e.type === TouchPhase.ENDED) {
            touchPhase = e.type;
        } else {
            return;
        }
        
        if (touchPhase === TouchPhase.BEGAN || touchPhase === TouchPhase.ENDED) {
            let col;
            let row;
            if (touchPhase === TouchPhase.BEGAN) {
                col = Math.floor((e.data.global.x - (this.view.x - Tile.TILE_WIDTH * 0.5)) / Tile.TILE_WIDTH);
                row = Math.floor((e.data.global.y - (this.view.y - Tile.TILE_HEIGHT * 0.5)) / Tile.TILE_HEIGHT);

                this.gameService.swapPiecesCommand(TouchPhase.BEGAN, col, row);
            } else if (touchPhase === TouchPhase.ENDED) {
                col = Math.floor((e.data.global.x - (this.view.x - Tile.TILE_WIDTH * 0.5)) / Tile.TILE_WIDTH);
                row = Math.floor((e.data.global.y - (this.view.y - Tile.TILE_HEIGHT * 0.5)) / Tile.TILE_HEIGHT);

                this.gameService.swapPiecesCommand(TouchPhase.ENDED, col, row);
            }
        }
    }
    private game_onClearGridHandler(e: any): void {
        const keys = this._displays.values();
        this._displays.forEach((display: Sprite, piece: PieceData, map: Map<PieceData, Sprite>) => {
            this.removeDisplayFromStage(piece);
        }, this);
    }
    private game_onUpdateGridHandler(e: any): void {
        this.updateDisplays();
    }
}
