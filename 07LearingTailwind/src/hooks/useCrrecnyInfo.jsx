import { useEffect,useState } from "react";

function useCrrecnyInfo(currecny){
    const[data,setData] = useState({})
    useEffect(()=>{

        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        .then((res)=>res.json())
        .then((res)=> setData(res[currecny]))
        console.log(data);
    },[currecny])
    console.log(data);
    return data
}
export default useCrrecnyInfo;