class Game {
    canvas:HTMLCanvasElement;
    context:CanvasRenderingContext2D;
    private board:Board;
    public aStar:AStar;
    // public path:Array<Array<number>>;
    public matrix:Array<Array<number>>;
    // private car:Car;
    private blockSize:number;
    
    private carList:Array<Car> = [];
    private socketHandler:SocketHandler;

    private car:Car;

    //loader
    constructor(){
        console.log("testing");
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        this.matrix = [[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,1,1,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,1,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,0,1,1,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,1,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
        
        this.blockSize = 20;
        let startPos = new Pos(7,28);
        let endPos = new Pos(7,27);

        this.board = new Board(this,this.matrix,this.blockSize,true, true);
        //load the image

        this.car = new Car(this,startPos,endPos, this.blockSize);

        this.carList.push(
            new Car(this, new Pos(8,4), new Pos(8,1), this.blockSize),
            new Car(this, new Pos(9,4), new Pos(6,24), this.blockSize),
            new Car(this, new Pos(25,2), new Pos(14,9), this.blockSize),
            new Car(this, new Pos(36,1), new Pos(15,16), this.blockSize),
            new Car(this, new Pos(7,4), new Pos(23,18), this.blockSize),
            new Car(this, new Pos(30,5), new Pos(6,8), this.blockSize),
            new Car(this, new Pos(29,10), new Pos(12,20), this.blockSize)
            );
        this.load();
        //load the socket
        this.socketHandler = new SocketHandler();
        this.socketHandler.emit("hello","test");
        this.socketHandler.socket.on("move", (msg)=> {
            if(msg == 'mac'){
                console.log("MOVE");
                this.car.setEndPos(new Pos(7,1));
            }
        });
        // if(var data = this.socketHandler.receiver("move")){
        //
        // }

        window.addEventListener("mousedown", (e) => this.getLocation(e));

        requestAnimationFrame(() => this.gameLoop());
    }

    private load(){
        // this.drawObstacle()
        this.drawObstacle(Util.getXYPostion(this.car.getX(), this.car.getY(), this.blockSize));
        for(let car of this.carList){
            //drawing the first obstacle
            this.drawObstacle(Util.getXYPostion(car.getX(), car.getY(), this.blockSize));
        }
    }

    private getLocation(e){
        let pos = Util.getXYPostion(e.clientX, e.clientY, this.blockSize);
        console.log(pos);
    }

    // private goToLocation(e){
    //     this.car.reset();
    //         let pos = this.getXYPostion(e.clientX, e.clientY, this.blockSize);
    //         this.aStar = new AStar(this.matrix, this.getXYPostion(this.car.getX(), this.car.getY(), this.blockSize), pos);
    //         this.path = this.aStar.findPath();

    //         if(this.path.length <= 0 ){
    //             let currentPos = this.getXYPostion(this.car.getX(),this.car.getY(), this.blockSize);
    //             this.path = [[currentPos.x,currentPos.y]];
    //         }
    // }

    private drawBlockOnBoard(e){
         let pos = Util.getXYPostion(e.clientX, e.clientY, this.blockSize);
         this.drawObstacle(pos);
    }

    public drawObstacle(pos:Pos){
        // console.log(pos);
        this.matrix[pos.y][pos.x] = this.matrix[pos.y][pos.x] == 1 ?0 :1; 
        this.board.update(this.matrix);
    }

    //get the location on the grid
   

    drawMatrix(width:number,height:number):Array<Array<number>>{
        var matrix = [];
        for(var i = 0; i < height; i++){
            var row = [];
            for(var j = 0; j < width; j++){
                row.push(0);
            }
            matrix.push(row);
        }
        return matrix;
    }

    arrayToString(matrix:Array<Array<number>>){
        var string = "[";
        for(var i = 0; i < matrix.length; i++){
            var row = "[";
            row += matrix[i].join(',');
        
            if(i != matrix.length - 1){
                row += "],";
            }else{
                row += "]";
            }
            string += row;
        }
        string += "];";
        return string;
    }

    gameLoop(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.board.draw();
        this.car.move();
        // this.car.move();
        // this.update();
        for(let car of this.carList){
            car.move();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
   new Game();
});