import { inject, injectable } from "@robotlegsjs/core";
import { Mediator } from "@robotlegsjs/pixi";

import { IntroView } from "../views/IntroView";
import { FlowService } from "./../services/FlowService";

@injectable()
export class IntroViewMediator extends Mediator<IntroView> {
    @inject(FlowService) private flowService: FlowService;

    public initialize(): void {
        // Longer intro time for horror atmosphere
        setTimeout(this.onTimerOut.bind(this), 4000);
    }
    public destroy(): void {
        this.eventMap.unmapListeners();
    }
    private onTimerOut() {
        this.flowService.setHomeView();
    }
}
