class Board{
    private width:number;
    private height:number;
    private amount:number;
    private game:Game;
    private padding:number;
    private matrix:Array<Array<number>>;
    private blockSize:number;
    private car:Car;
    private showGrid:Boolean;

    private drawBlocks:boolean;


    constructor(game:Game, matrix:Array<Array<number>>, blockSize:number,showGrid:Boolean, drawBlocks:boolean){
        this.game = game;
        
        this.matrix = matrix;
        this.blockSize = blockSize;

        var rows = matrix.length;
        var column = matrix[0].length;

        this.width = column*this.blockSize;
        this.height = rows*this.blockSize;
        this.padding = 0;
 
        this.showGrid = showGrid;
        // this.drawCar();
        this.drawBlocks = drawBlocks;
        
    }

    calcGridLoc(){
        
    }
    update(matrix:Array<Array<number>>){
        this.matrix = matrix;
    }

    public draw(){
        this.drawObstacle();
        if(this.showGrid){
            this.drawBoard();
        }
    }

    private drawBoard(){
        this.game.context.save();
        this.game.context.beginPath();
        for (let x = 0; x <= this.width; x += this.blockSize) {
            this.game.context.moveTo(0.5 + x + this.padding, this.padding);
            this.game.context.lineTo(0.5 + x + this.padding, this.height + this.padding);
        }


        for (var y = 0; y <= this.height; y += this.blockSize) {
            this.game.context.moveTo(this.padding, 0.5 + y + this.padding);
            this.game.context.lineTo(this.width + this.padding, 0.5 + y + this.padding);
        }

        this.game.context.strokeStyle = "rgba(0, 0, 0, 0.3)";
        this.game.context.stroke();
        // this.game.context.globalAlpha = 0.4;
        this.game.context.closePath();
        this.game.context.restore();
    }
    private drawObstacle(){
        for(var i  = 0; i < this.matrix.length; i++){
            for(var j = 0; j < this.matrix[i].length; j++){
                if(this.matrix[i][j] == 1){
                    let block = new Block(this.game,this.blockSize, j*this.blockSize + this.padding, i*this.blockSize + this.padding);
                    if(this.drawBlocks){
                         block.draw(); 
                    }
                }
            }
        }
    }
}