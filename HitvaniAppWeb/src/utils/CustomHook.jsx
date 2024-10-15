import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import useFetchAPI from "./useFetchAPI";

const CustomHook = () => {
    const [url, setUrl] = useState(null);
    const [keys, setKeys] = useState("");
    let [fetchData] = useFetchAPI(url, keys);

    return (
        <>
            <button
                onClick={() =>
                    setUrl("https://jsonplaceholder.typicode.com/todos")
                }
            >
                Data1
            </button>
            <button
                onClick={() => {
                    setUrl("https://dummyjson.com/products");
                    setKeys("products");
                }}
            >
                Data2
            </button>
            <br />
            <br />
            {fetchData == null && url == null && (
                <p>No Data Found... Click Button for that.</p>
            )}
            {fetchData &&
                fetchData.map((item) => {
                    return <p key={item.id}>{item.title}</p>;
                })}
        </>
    );
};

export default CustomHook;