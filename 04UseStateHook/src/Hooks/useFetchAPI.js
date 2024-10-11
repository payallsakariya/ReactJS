import React, { useEffect, useState } from "react";

const useFetchAPI = (url,keys) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (url!=null) {
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data[keys]) {
                    setData(data.keys);
                }
                else
                {
                    setData(data);
                }
            });
        }
    }, [url]);

    return [data];
};

export default useFetchAPI;