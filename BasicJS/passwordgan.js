const genPass = () => {
    let pass = "";
    let smallChar = "abcdefghijklmnopqrstuvwxyz";
    let bigChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "0123456789";
    let special = "#@$!%^&*~";
    // console.log(smallChar);

    for (let i = 1; i <= 12; i++) {
        if(i == 2 || i == 6){
            pass += bigChar.charAt(Math.floor(Math.random() * bigChar.length + 1));
        }else if(i ==3 || i ==7){
            pass += num.charAt(Math.floor(Math.random() * num.length + 1));
        }else if(i==4 || i ==8){
            pass += special.charAt(Math.floor(Math.random() * special.length + 1));
        }else{
            pass += smallChar.charAt(Math.floor(Math.random() * smallChar.length + 1));
        }

    }
    console.log(pass);
}
genPass();