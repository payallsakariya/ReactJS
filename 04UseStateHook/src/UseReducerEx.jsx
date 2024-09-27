import React, { useReducer, useState } from "react";

const UseReducerEx = () => {
    //let [val, setVal] = useState("Ashok");
    let [value, dispatch] = useReducer((value, action) => {
        if (action != null) return action;
        else return value;
    }, "Ashok");
    let changeValue = (vart) => {
        dispatch(vart);
    };
    return (
        <>
        {/* <input type="text" /> */}
            <h1>Hello : {value}</h1>
            <button
                onClick={() => {
                    changeValue();
                }}
            >
                Change Value
            </button>
        </>
    );
};

export default UseReducerEx;