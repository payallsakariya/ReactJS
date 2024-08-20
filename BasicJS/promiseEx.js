const tour = () => {
    return new Promise((res,rej) => {
        setTimeout(() => {
            let notvail= true;
            if(notvail){
              console.log("they are not will going");
              res();
            }else{
                console.log("they aer will going");
                rej();
            }
        },3000)
    })
}