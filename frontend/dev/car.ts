class Car{
    private x:number;
    private y:number;

    // for precious location for removing old loaction.
    private previousX:number;
    private previousY:number;

    private nextX:number;
    private nextY:number;

    //end point
    private endPos:Pos;
    
    private radius:number;
    private game:Game;
    private step:number = 1;
    private blockSize:number;
    private speed:number;

    private path:Array<Array<number>>;
    private aStar:AStar;

    private image:any;

    public done:Boolean = false;
    private rotate:number;

    constructor(game:Game, startPos:Pos, endPos:Pos, blockSize:number){
        this.radius = 10;
        this.game = game;

        this.blockSize = blockSize;

        this.x = blockSize / 2 + blockSize * startPos.x;
        this.y = blockSize / 2 + blockSize * startPos.y;
        this.previousX = this.x;
        this.previousY = this.y;
        this.endPos = endPos;
        this.rotate = 0;
        
        //speed
        this.speed = 1;
        // always first calc the path
        // We need to know where we need to go.
        this.calcPath();
        this.loadImage();
               
    }

    loadImage(){
        this.image = <any> new Image();

        //drawing of the test image - img1
        this.image.onload = () => {
            //draw background image
            this.moveImage();
        };

        this.image.src = 'images/car.png';
    }

    private moveImage(){
            let width = 20;
            let height = 20;

            //
            // this.game.context.rotate(this.convertToRadians(30));
            this.game.context.save();
            this.game.context.translate(this.x,this.y);
            this.game.context.rotate(this.convertToRadians(this.rotate));
            this.game.context.drawImage(this.image, -width/2,-height/2,width,height);
            // this.game.context.fillStyle = 'yellow';
            // this.game.context.fillRect(-w/2,-h/2,w,h);
            this.game.context.restore();
    }

    //get the location.
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    //get the previous location.
    getPreviousX(){
        return this.previousX;
    }

    getPreviousY(){
        return this.previousY;
    }

    getEndPos():Pos{
        return this.endPos;
    }

    setEndPos(pos:Pos){
        this.endPos = pos;
        this.done = false;
    }

    setPath(path:Array<Array<number>>){
        this.path = path;
    }

    // drawRect(){
    //     let rotate = this.incrementAngle();
    //     let w = 20;
    //     let h = 20;
    //     this.game.context.save();                
    //     this.game.context.translate(w*4,h*4);
    //     this.game.context.rotate(this.convertToRadians(rotate));
    //     this.game.context.fillStyle = 'yellow';
    //     this.game.context.fillRect(-w/2,-h/2,w,h);         
    //     this.game.context.restore();
    // }
    // //needed for rotating
    // private incrementAngle():number{
    //     let rotate++;
    //     if(this.rotate > 360) {
    //         this.rotate = 0;
    //     }
    //     return rotate;
    // }
    //needed for rotating 
    // defrees to radians
    private convertToRadians(degree:number) {
            return degree*(Math.PI/180);
    }


    draw(){
        this.game.context.beginPath();
        this.game.context.arc(this.x , this.y , this.radius, 0, 2 * Math.PI, false);
        this.game.context.fillStyle = 'green';
        this.game.context.fill();
        this.game.context.closePath();
    }
    drawImage(){
         
    }

    //move to an point
    private moveToPoint(){
        let xDone = false;
        let yDone = false;

        if(this.y == this.nextY){
            yDone = true;
        }else{
            if(this.y - this.nextY > 0){
                this.y -= this.speed;
                this.rotate = 0;
            }else{
                this.y += this.speed;
                this.rotate = 180;
            }
        }

        if(this.x == this.nextX){
            xDone = true;
        }else{
            if(this.x  - this.nextX > 0){
                this.x -= this.speed;
                this.rotate = 270;
            }else{
                this.x += this.speed;
                this.rotate = 90;
            }
        }

        if(yDone && xDone){
            return true;
        }
        return false;
    }

    public reset(){
        this.step = 1;
    }

    //calc the path
    private calcPath(){
        //cal a new path
        this.aStar = new AStar(
                            this.game.matrix, 
                            Util.getXYPostion(this.x,this.y,this.blockSize),
                            this.getEndPos());
        this.path = this.aStar.findPath();

        //We are there.
        if(this.path.length <= 1){
            if(this.path.length == 0){
                //TODO : remove this crash.
                // See notes
                console.log("CRASH");
            }
            this.done = true;
        }else{

            //get the position
            let pos:Pos = new Pos(this.path[1][0], this.path[1][1]);
            //save the next direction
            this.nextX = pos.x * this.blockSize + this.blockSize / 2;
            this.nextY = pos.y * this.blockSize + this.blockSize / 2;
            
            this.game.drawObstacle(Util.getXYPostion(this.previousX, this.previousY, this.blockSize));
            this.game.drawObstacle(Util.getXYPostion(this.nextX,this.nextY, this.blockSize));
        }
        
    }

    //move to an point
    public move(){
        
        this.previousX = this.x;
        this.previousY = this.y;

        if(this.moveToPoint()){
            
            if(!this.done){
                this.calcPath();
            }
        }

        this.moveImage();
        

    }
}