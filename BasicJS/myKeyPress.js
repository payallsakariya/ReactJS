function myKeyPress(e){
    var keynum;
  
    if(window.event) { // IE                  
      keynum = e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera                 
      keynum = e.which;
    }
    var keyname = String.fromCharCode(keynum);
    if(keyname == 1){
      alert('Hiiii!');
    }else if (keyname == 2) {
      alert('Hellooo!');
    }
  
    alert('This key is '+String.fromCharCode(keynum));
  }
  myKeyPress(event);