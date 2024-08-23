const tour = () => {
    return new Promise((res,rej) => {
        setTimeout(() => {
            let notvail= false;
            if(notvail){
              console.log("they are will going");
              res();
            }else{
                console.log("they aer not will going");
                rej();
            }
        },3000)
    })
}

tour().then(()=>{
    console.log("Ok")
}).catch(()=>{
    console.log("Are You Sure?");
}).finally(()=>{
    console.log("Thanks");
})