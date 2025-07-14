import { injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { AlertPopup } from "./../views/AlertPopup";

@injectable()
export class AlertPopupMediator extends Mediator<AlertPopup> {
    public initialize(): void {
        // Use only one event type to avoid conflicts
        // Try touchend first for mobile, fallback to click
        if ('ontouchstart' in window) {
            // Mobile device - use touch events
            this.eventMap.mapListener(this.view.confirmButton, "touchend", this.confirmButton_onTriggeredHandler, this);
            this.eventMap.mapListener(this.view.cancelButton, "touchend", this.cancelButton_onTriggeredHandler, this);
        } else {
            // Desktop device - use click events
            this.eventMap.mapListener(this.view.confirmButton, "click", this.confirmButton_onTriggeredHandler, this);
            this.eventMap.mapListener(this.view.cancelButton, "click", this.cancelButton_onTriggeredHandler, this);
        }
        
        // Add pointer events as universal fallback
        this.eventMap.mapListener(this.view.confirmButton, "pointerup", this.confirmButton_onTriggeredHandler, this);
        this.eventMap.mapListener(this.view.cancelButton, "pointerup", this.cancelButton_onTriggeredHandler, this);
    }

    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private _isProcessing: boolean = false;
    
    private confirmButton_onTriggeredHandler(e: any): void {
        if (this._isProcessing) return;
        this._isProcessing = true;
        
        this.view.parent.removeChild(this.view);
        
        // Reset flag after a short delay
        setTimeout(() => this._isProcessing = false, 300);
    }
    
    private cancelButton_onTriggeredHandler(e: any): void {
        if (this._isProcessing) return;
        this._isProcessing = true;
        
        this.view.parent.removeChild(this.view);
        
        // Reset flag after a short delay
        setTimeout(() => this._isProcessing = false, 300);
    }
}
