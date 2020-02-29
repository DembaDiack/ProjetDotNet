import Cookies from "universal-cookie";
import crypto from 'crypto-js';

class Auth{
    constructor(){
        this.pass = "iscae";
        this.cookies = new Cookies();
        this.email = this.cookies.get("email");
        this.connected = false;
        this.checkConnection();
        return this;
    }
    checkConnection(callback){
        if(this.email !== undefined){
            this.email = crypto.AES.decrypt(this.email,this.pass).toString(crypto.enc.Utf8);
            this.connected = true;
        }
        else{
            this.connected = false;
        }
        console.log("call back msg : ",callback);
    }
    connect(email){
        this.email = crypto.AES.encrypt(email,this.pass).toString();
        this.cookies.set("email",this.email);
        return this;
    }
    disconnect(){
        this.cookies.remove("email");
        return this;
    }
    getEmail(){
        return this.email;
    }
    isConnected()
    {
        return this.connected;
    }
}


export default Auth;