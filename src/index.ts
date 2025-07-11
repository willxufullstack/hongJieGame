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

        // Wait for fonts to load before starting game
        this.loadFontsAndStartGame();

        document.body.appendChild(this.renderer.view);
    }
    public onLoad(): void {
        AtlasKeys.update(PIXI.utils.TextureCache);
    }
    
    private async loadFontsAndStartGame(): Promise<void> {
        try {
            // Load Creepster font using FontFace API
            const creepsterFont = new FontFace('Creepster', 'url(https://fonts.gstatic.com/s/creepster/v13/dg4g_p78rroaKl8kRKo1r7wHTwonmyw.woff2)');
            await creepsterFont.load();
            document.fonts.add(creepsterFont);
            
            console.log('Creepster font loaded successfully for Canvas');
            
            // Now load game assets
            const loader = PIXI.loader
                .add(AtlasKeys.ATLAS_PNG)
                .add(AtlasKeys.ATLAS_XML)
                .add(AtlasKeys.FONT_FNT)
                .add(AtlasKeys.BG_HUD_IMAGE)
                .add(AtlasKeys.BG_IMAGE)
                .add(AtlasKeys.BG_POPUP_IMAGE)
                .load(this.onLoad);
                
        } catch (error) {
            console.warn('Creepster font failed to load, using fallback:', error);
            
            // Fallback: load game without custom font
            const loader = PIXI.loader
                .add(AtlasKeys.ATLAS_PNG)
                .add(AtlasKeys.ATLAS_XML)
                .add(AtlasKeys.FONT_FNT)
                .add(AtlasKeys.BG_HUD_IMAGE)
                .add(AtlasKeys.BG_IMAGE)
                .add(AtlasKeys.BG_POPUP_IMAGE)
                .load(this.onLoad);
        }
    }
    public render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}
const main = new Main();
main.render();
