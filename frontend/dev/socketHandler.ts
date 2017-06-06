/// <reference path="socket.d.ts" />

class SocketHandler{
    public socket:Socket;
    
    constructor(){
        this.init();
    }

    init(){
        this.socket = io();
        // this.socket = io.connect("localhost", function(){
        //     console.log("READY")
        // });
        console.log("Initing");
    }

    emit(tag:string, data:Object){
        this.socket.emit(tag,"hello");
    }

    receiver(tag:string){
        this.socket.on(tag, function(data){
            return data;
        });
    }
}