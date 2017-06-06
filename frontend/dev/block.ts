class Block{
    private size:number;
    private x:number;
    private y:number;
    private game:Game;
    private invisible:boolean;

    constructor(game:Game,size:number, x:number, y:number){
        this.size = size;
        this.x = x;
        this.y = y;
        this.game = game;
    }

    draw(){
        this.game.context.beginPath();
        this.game.context.rect(this.x,this.y,this.size,this.size);
        this.game.context.fillStyle = 'red';
        this.game.context.fill();
        this.game.context.closePath();
    }
}