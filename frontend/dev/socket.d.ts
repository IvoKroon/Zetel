declare var io : {
    connect(url: string): Socket;
    connect(url: string, func: Function): Socket;
    (url:string);
    ();
}
interface Socket {
    on(event: string, callback: (data: any) => void );
    emit(event: string, data: any);
}