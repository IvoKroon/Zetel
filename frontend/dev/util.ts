class Util{
    public static getXYPostion(x:number,y:number, blockSize:number):Pos{
        let xPos = Math.floor(x / blockSize);
        let yPos = Math.floor(y / blockSize);

        return new Pos(xPos,yPos);
    }
}