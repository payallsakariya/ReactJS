import React from "react";
import "./App.css";
import ChangeColor from "./ChangeColor";
import NewApp from "./NewApp";
import UseEffectHook from "./UseEffectHook";
import UseReducerEx from "./UseReducerEx";
import UseRefExample from "./UseRefExample";
import CustomHook from "./Components/CustomHook";


const App = () => {
   
    return (
        <>
       {/* <ChangeColor />
       <NewApp />
       <UseEffectHook /> */}
       {/* <UseReducerEx />
       <UseRefExample /> */}
       <CustomHook />
       </>
       
    );
};

export default App;