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
            console.log("StartingPopupMediator.initialize() called");
            this._count = 4;
            
            // Check if view is properly initialized
            if (!this.view) {
                console.error("StartingPopup view not available");
                return;
            }
            
            console.log("StartingPopup view available, waiting for view ready...");
            // Use requestAnimationFrame to ensure view is fully rendered
            this.waitForViewReady();
        } catch (error) {
            console.error("Error in StartingPopupMediator.initialize:", error);
        }
    }
    
    private waitForViewReady(attempts: number = 0): void {
        const maxAttempts = 20; // Increased attempts for better reliability
        
        try {
            // Check if view is properly initialized and has required methods
            if (this.view && 
                typeof this.view.changeNumber === 'function' &&
                this.view.parent) { // Ensure view is added to display list
                
                // View is ready, start the countdown
                this.tick(this);
                return;
            }
            
            if (attempts >= maxAttempts) {
                console.warn("StartingPopup view not ready after maximum attempts - skipping countdown");
                this.tick_onComplete();
                return;
            }
            
            // Use setTimeout with shorter delay for more responsive checking
            setTimeout(() => {
                this.waitForViewReady(attempts + 1);
            }, 50);
        } catch (error) {
            console.error("Error in StartingPopup waitForViewReady:", error);
            if (attempts < maxAttempts) {
                setTimeout(() => {
                    this.waitForViewReady(attempts + 1);
                }, 100);
            } else {
                // Fallback to complete the flow
                this.tick_onComplete();
            }
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
