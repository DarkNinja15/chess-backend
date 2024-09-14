import { Chess } from 'chess.js'

export class GameManager{
    blackPlayerUserID:string;
    whitePlayerUserID:string;
    result:Result;
    game:Chess;

    constructor(blackPlayerUserID:string, whitePlayerUserID:string){
        this.blackPlayerUserID = blackPlayerUserID;
        this.whitePlayerUserID = whitePlayerUserID;
        this.game = new Chess();
        this.result = Result.IN_PROGRESS;
    }  
    
    getDetails(){
        console.log("Black Player: ",this.blackPlayerUserID);
        console.log("White Player: ",this.whitePlayerUserID);
        console.log("Result: ",this.result.toString());
        console.log("Game: ",this.game.ascii());
    }

    move(userID:string, move:string){
        console.log(this.blackPlayerUserID);
        if(this.blackPlayerUserID===userID && this.game.turn()==='b'){
            this.game.move(move);
        }else if(this.whitePlayerUserID===userID && this.game.turn()==='w'){
            this.game.move(move);
        }else{
            console.log("Invalid Move");
        }
    }
}

export enum Result{
    BLACK_WIN,
    WHITE_WIN,
    DRAW,
    IN_PROGRESS
}
