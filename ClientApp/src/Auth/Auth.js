class Auth{
    static email = null;
    static connected = false;
    
    Connect(email){
        this.email = email;
        this.Authenticate();
        return this;
    }

    Authenticate(){
        window.alert(this.connected);
        this.connected = true;
    }
    deAuthenticate(){
        this.connected = false;
    }
    isConnected(){
        return this.connected;
    }
}
export default Auth;