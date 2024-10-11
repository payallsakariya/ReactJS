import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import useFetchAPI from "../Hooks/useFetchAPI";

const CustomHook = () => {
    const [url, setUrl] = useState(null);
    const [keys, setKeys] = useState("");
    let [fetchData] = useFetchAPI(url, keys);

    return (
        <>
            <button
                onClick={() =>
                    setUrl("https://hitvaniapp.excellcons.com/datalist")
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

            {/* {fetchData && console.log(fetchData)} Log the fetchData object */}

            {fetchData && Array.isArray(fetchData.data) && fetchData.data.map((item) => {
                console.log(item.parnt_name); // Access parnt_name directly from item
                return <p key={item.child_id}>{item.parnt_name}</p>; // Use child_id as the unique key
            })}
        </>
    );
};

export default CustomHook;