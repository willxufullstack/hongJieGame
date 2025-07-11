// tslint:disable-next-line:no-reference
/// <reference path="../node_modules/@robotlegsjs/pixi/definitions/pixi.d.ts" />
import "reflect-metadata";

import { Context, MVCSBundle } from "@robotlegsjs/core";
import { ContextView, PixiBundle } from "@robotlegsjs/pixi";
import { PalidorPixiExtension } from "@robotlegsjs/pixi-palidor";
import PIXI = require("pixi.js");
import { Container } from "pixi.js";

import { GameConfig } from "./matchthree/configs/GameConfig";
import { PalidorConfig } from "./matchthree/configs/PalidorConfig";
import { ViewsConfig } from "./matchthree/configs/ViewsConfig";
import { AtlasKeys } from "./matchthree/utils/AtlasKeys";

class Main {
    private stage: PIXI.Container;
    private renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private context: Context;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(340, 480, {});
        this.stage = new PIXI.Container();
        this.context = new Context();
        // this.context.logLevel = LogLevel.DEBUG;
        this.context
            .install(MVCSBundle, PixiBundle)
            .install(PalidorPixiExtension)
            .configure(new ContextView(this.stage))
            .configure(GameConfig, ViewsConfig, PalidorConfig)
            .initialize();

        const loader = PIXI.loader
            .add(AtlasKeys.ATLAS_PNG)
            .add(AtlasKeys.ATLAS_XML)
            .add(AtlasKeys.FONT_FNT)
            .add(AtlasKeys.BG_HUD_IMAGE)
            .add("bg_image", AtlasKeys.BG_IMAGE)
            .add(AtlasKeys.BG_POPUP_IMAGE)
            // Load new game piece images
            .add("piece_normal_1", AtlasKeys.GAME_PIECES_PATH + "piece_normal_1.png")
            .add("piece_normal_2", AtlasKeys.GAME_PIECES_PATH + "piece_normal_2.png")
            .add("piece_normal_3", AtlasKeys.GAME_PIECES_PATH + "piece_normal_3.png")
            .add("piece_normal_4", AtlasKeys.GAME_PIECES_PATH + "piece_normal_4.png")
            .add("piece_normal_5", AtlasKeys.GAME_PIECES_PATH + "piece_normal_5.png")
            .add("piece_normal_6", AtlasKeys.GAME_PIECES_PATH + "piece_normal_6.png")
            .add("piece_row_1", AtlasKeys.GAME_PIECES_PATH + "piece_row_1.png")
            .add("piece_row_2", AtlasKeys.GAME_PIECES_PATH + "piece_row_2.png")
            .add("piece_row_3", AtlasKeys.GAME_PIECES_PATH + "piece_row_3.png")
            .add("piece_row_4", AtlasKeys.GAME_PIECES_PATH + "piece_row_4.png")
            .add("piece_row_5", AtlasKeys.GAME_PIECES_PATH + "piece_row_5.png")
            .add("piece_row_6", AtlasKeys.GAME_PIECES_PATH + "piece_row_6.png")
            .add("piece_col_1", AtlasKeys.GAME_PIECES_PATH + "piece_col_1.png")
            .add("piece_col_2", AtlasKeys.GAME_PIECES_PATH + "piece_col_2.png")
            .add("piece_col_3", AtlasKeys.GAME_PIECES_PATH + "piece_col_3.png")
            .add("piece_col_4", AtlasKeys.GAME_PIECES_PATH + "piece_col_4.png")
            .add("piece_col_5", AtlasKeys.GAME_PIECES_PATH + "piece_col_5.png")
            .add("piece_col_6", AtlasKeys.GAME_PIECES_PATH + "piece_col_6.png")
            .add("piece_rainbow", AtlasKeys.GAME_PIECES_PATH + "piece_rainbow.png")
            .load(this.onLoad);

        // Center the canvas in the page
        const canvas = this.renderer.view;
        canvas.style.position = 'absolute';
        canvas.style.left = '50%';
        canvas.style.top = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
        
        // Ensure DOM is ready before appending canvas
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(canvas);
            });
        } else {
            document.body.appendChild(canvas);
        }
    }
    public onLoad(): void {
        AtlasKeys.update(PIXI.utils.TextureCache);
    }
    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}

// Ensure DOM is ready before initializing the game
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const main = new Main();
        main.render();
    });
} else {
    const main = new Main();
    main.render();
}
