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
    checkConnection(){
        if(this.email !== undefined){
            this.email = crypto.AES.decrypt(this.email,this.pass).toString();
            this.connected = true;
        }
        else{
            this.connected = false;
        }
        return {
            email : this.email,
            connected : this.connected
        };
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
}


export default Auth;