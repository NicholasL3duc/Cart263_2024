class KeyPressListener {
    constructor(keyCode, callback) {
        // key prss = true and key released = flage false
      let keySafe = true;
      this.keydownFunction = function(event) {
        if (event.code === keyCode) {
           if (keySafe) {
              keySafe = false;
              callback();
           }  
        }
     };



     
    //  takes event and must match.... if true
     this.keyupFunction = function(event) {
        if (event.code === keyCode) {
           keySafe = true;
        }         
     };



    //  key codes 
     document.addEventListener("keydown", this.keydownFunction);
     document.addEventListener("keyup", this.keyupFunction);
    }
    unbind() { 
      document.removeEventListener("keydown", this.keydownFunction);
      document.removeEventListener("keyup", this.keyupFunction);
    }
  
  
  }