import React, { useEffect, useRef, useState } from "react";

const UseRefExample = () => {
    const [inputValue, setInputValue] = useState();
    const count = useRef(0);
    let ref = useRef();

    useEffect(() => {
        count.current = count.current + 1;
    });

    return (
        <>
            <input type="text" ref={ref} />
            <button
                onClick={() => {
                    ref.current.disabled='disabled'
                }}
            >
                click focus
            </button>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <h1>Render Count: {count.current}</h1>
        </>
    );
};

export default UseRefExample;