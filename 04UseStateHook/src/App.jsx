import React from "react";
import "./App.css";
import ChangeColor from "./ChangeColor";
import NewApp from "./NewApp";
import UseEffectHook from "./UseEffectHook";
import UseReducerEx from "./UseReducerEx";
import UseRefExample from "./UseRefExample";


const App = () => {
   
    return (
        <>
       {/* <ChangeColor />
       <NewApp />
       <UseEffectHook /> */}
       <UseReducerEx />
       <UseRefExample />
       </>
       
    );
};

export default App;