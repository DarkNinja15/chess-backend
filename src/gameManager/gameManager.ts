import { Chess } from 'chess.js'

export class GameManager{
    blackPlayerUserID:String;
    whitePlayerUserID:String;
    result:Result;
    game:Chess;

    constructor(blackPlayerUserID:String, whitePlayerUserID:String){
        this.blackPlayerUserID = blackPlayerUserID;
        this.whitePlayerUserID = whitePlayerUserID;
        this.game = new Chess();
        this.result = Result.IN_PROGRESS;

        console.log(this.game.ascii());
    }   
}

export enum Result{
    BLACK_WIN,
    WHITE_WIN,
    DRAW,
    IN_PROGRESS
}
