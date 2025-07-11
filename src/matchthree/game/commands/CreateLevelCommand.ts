import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "./../../events/GameEvent";
import { FlowService } from "./../../services/FlowService";
import { GameService } from "./../../services/GameService";
import { GameManager } from "./../managers/GameManager";
import { LevelModel } from "./../models/LevelModel";
import { LevelsRepository } from "./../utils/LevelRepository";

@injectable()
export class CreateLevelCommand implements ICommand {
    @inject(LevelModel) private levelModel: LevelModel;
    @inject(GameManager) private gameManager: GameManager;
    @inject(GameService) private gameService: GameService;
    @inject(FlowService) private flowService: FlowService;
    @inject(GameEvent) private gameEvent: GameEvent;
    @inject(LevelsRepository) private levelsRepository: LevelsRepository;

    public execute(): void {
        try {
            console.log("CreateLevelCommand.execute() called");
            console.log("Game event extra:", this.gameEvent.extra);
            
            this.levelModel.levelId = this.gameEvent.extra.levelId;
            console.log("Set levelModel.levelId to:", this.levelModel.levelId);
            
            this.levelModel.levelInfo = this.levelsRepository.getLevelInfoById(this.levelModel.levelId);
            console.log("Got levelInfo:", this.levelModel.levelInfo);
            
            this.levelModel.reset();
            this.levelModel.numMoves = this.levelModel.levelInfo.numMoves;

            console.log("Generating grid with cols:", this.levelModel.maxCols, "rows:", this.levelModel.maxRows);
            this.gameManager.generateGrid(this.levelModel.maxCols, this.levelModel.maxRows);

            this.gameService.updateHUDData();
            this.gameService.start();

            console.log("Setting game view...");
            this.flowService.setGameView();
            console.log("Showing starting popup...");
            this.flowService.showStartingPopup();
            console.log("CreateLevelCommand.execute() completed");
        } catch (error) {
            console.error("Error in CreateLevelCommand.execute():", error);
        }
    }
}
