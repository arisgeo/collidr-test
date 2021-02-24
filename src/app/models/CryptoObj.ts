
export class CryptoObj {
    Response:string;
    Message:string;
    HasWarning:boolean;
    Type:number;
    RateLimit:{};
    Data:{
        Aggregated:boolean;
        TimeFrom:number;
        TimeTo:number;
        Data: { time:number,
                high:number,
                low:number, 
                open:number, 
                volumefrom:number,
                volumeto:number,
                close:number, 
                conversionType:string,
                conversionSymbol:string}[]
    };


}