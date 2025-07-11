import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { FlowService } from "./../services/FlowService";
import { GameService } from "./../services/GameService";
import { StartingPopup } from "./../views/StartingPopup";

@injectable()
export class StartingPopupMediator extends Mediator<StartingPopup> {
    @inject(GameService) private gameService: GameService;
    @inject(FlowService) private flowService: FlowService;

    private _count: number;

    public initialize(): void {
        try {
            this._count = 4;
            
            // Check if view is properly initialized
            if (!this.view) {
                console.error("StartingPopup view not available");
                return;
            }
            
            // Use setTimeout to ensure view is fully constructed before accessing methods
            setTimeout(() => {
                if (this.view && typeof this.view.changeNumber === 'function') {
                    this.tick(this);
                } else {
                    console.error("StartingPopup.changeNumber method not available after initialization delay");
                    // Try again with a longer delay
                    setTimeout(() => {
                        if (this.view && typeof this.view.changeNumber === 'function') {
                            this.tick(this);
                        } else {
                            console.error("StartingPopup.changeNumber method still not available - skipping countdown");
                            this.tick_onComplete();
                        }
                    }, 50);
                }
            }, 10);
        } catch (error) {
            console.error("Error in StartingPopupMediator.initialize:", error);
        }
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private tick(obThis: any = this) {
        try {
            obThis._count -= 1;
            if (obThis._count > 0) {
                // Check if view and method are still available
                if (obThis.view && typeof obThis.view.changeNumber === 'function') {
                    obThis.view.changeNumber(obThis._count);
                    setTimeout(obThis.tick, 300, obThis);
                } else {
                    console.error("StartingPopup view or changeNumber method not available during tick");
                    obThis.tick_onComplete();
                }
            } else {
                obThis.tick_onComplete();
            }
        } catch (error) {
            console.error("Error in StartingPopupMediator.tick:", error);
            obThis.tick_onComplete();
        }
    }
    private tick_onComplete(): void {
        this.gameService.resume();
        this.flowService.closePopup();
    }
}
