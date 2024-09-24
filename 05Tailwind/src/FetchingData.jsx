import React, { useEffect, useState } from 'react';

const FetchingData = () => {
  // State to store the response data
  const [data, setData] = useState([]);

  // Simulate fetching data from API
  useEffect(() => {
    // const response = {
    //   data: [
    //     {
    //       parnt_name: "नित्य वाणी पाठ",
    //       child_name: "|| श्रीहित मंगला गान ||",
    //       parentid: 2,
    //       child_id: 31,
    //       language: "H",
    //       stauts: null,
    //       category: null,
    //       content_creator: null,
    //     },
    //     {
    //       parnt_name: "नित्य वाणी पाठ",
    //       child_name: "|| बधाई गान ||",
    //       parentid: 2,
    //       child_id: 32,
    //       language: "H",
    //       stauts: null,
    //       category: null,
    //       content_creator: null,
    //     },
    //     {
    //       parnt_name: "नित्य वाणी पाठ",
    //       child_name: "|| श्री सेवकचरन वंदना ||",
    //       parentid: 2,
    //       child_id: 33,
    //       language: "H",
    //       stauts: null,
    //       category: null,
    //       content_creator: null,
    //     },
    //   ],
    // };

    // Set the fetched data into state
     fetch('https://hitvaniapp.excellcons.com/api/menucontent')
          .then(response=>response.json())
          .then(data=>{ console.log(data); })

    setData(data);
    console.log(data);
  }, []);

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

export default FetchingData;
