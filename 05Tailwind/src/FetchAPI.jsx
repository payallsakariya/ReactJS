import React, { useEffect, useState } from "react";
const FetchAPI = ({ url }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/menucontent'); // Now proxying to avoid CORS issues
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setData(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, [url]); // Dependency array to re-fetch only when the URL changes
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
      <div>
      <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Parent Name</th>
                <th className="px-4 py-2 border border-gray-300">Child Name</th>
                <th className="px-4 py-2 border border-gray-300">Language</th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
                <th className="px-4 py-2 border border-gray-300">Content Creator</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.child_id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{item.parnt_name}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.child_name}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.language}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.stauts ? item.stauts : "N/A"}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.category ? item.category : "N/A"}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.content_creator ? item.content_creator : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

    </div>

    </div>
    );
};
export default FetchAPI;