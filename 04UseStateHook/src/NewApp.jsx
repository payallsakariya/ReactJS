// use user difrent Component2
import React, { createContext, useContext, useState } from "react";
const UserContext = createContext();

const NewApp = () => {
    const [user, setUser] = useState("Jesse Hall");
    return (
        <>
            <UserContext.Provider value={user}>
                <h1>MAIN NEWAPP</h1>
                <h1>{`Hello ${user}!`}</h1>
                <Component2/>
            </UserContext.Provider>
        </>
    );
};

function Component2() {
    
    return (
        <>
            <h1>Component 2</h1>
            <Component3/>
        </>
    );
}

function Component3() {
    const user = useContext(UserContext);
    return (
        <>
            <h1>Component 3 {user}</h1>
            <Component4/>
        </>
    );
}

function Component4() {
    return (
        <>
            <h1>Component 4</h1>
            <Component5/>
        </>
    );
}

function Component5() {
    const user = useContext(UserContext);
    return (
        <>
            <h1>Component 5</h1>
            <h2>{`Hello ${user} again!`}</h2>
        </>
    );
}

export default NewApp;