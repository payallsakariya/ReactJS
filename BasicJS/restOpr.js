//Spread Oprator, Rest Oprator, Three Dot(...)
let a = [4,5,6]
let k = [1,2,3,...a,7,8,9,10]
let fullname = "Payal sakariya"
function display(a,b,c) {
    console.log(k);
    console.log([...fullname]);
    
    console.log("A =",a,"B =",b,"C =",c);
}
function namelist(firstname,lastname,...other) {
    console.log("Welcome",firstname,lastname);
    console.log("Your Other name are =",other);
}
display(...a)
namelist("Priya","Deep","Rahi","Dev","Nishant")

const rlist = () => {
    console.log("hello",a);
}
rlist();
