import React, { useState } from 'react';

const CalenderMasterTab = () => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Day Options Based on Selected Language
  const dayOptions: { [key: string]: string[] } = {
    Hindi: ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार'],
    Gujarati: ['સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર', 'રવિવાર'],
    English: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  };

  // Mock Data for initial design visualization
  const mockData = [
    { id: 1, lang: 'English', month: 'January', tithi: '4', flag: 'DA', ndate: '2024-01-15', day: 'Monday', desc: 'New Year Celebration' },
    
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">Calendar Master</h4>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => setShowModal(true)}
        >
          Add New Record
        </button>
      </div>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Language</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Month</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Tithi</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Flag</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5>
          </div>
          <div className="p-2.5 hidden text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Day</h5>
          </div>
          <div className="p-2.5 hidden text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Description</h5>
          </div>
        </div>

        {/* Data Rows */}
        {mockData.map((item, index) => (
          <div
            className={`grid grid-cols-8 ${
              index === mockData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={item.id}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button className="rounded bg-primary px-2 py-1 text-white">Edit</button>
              <button className="rounded bg-red-500 px-2 py-1 text-white ml-2">Delete</button>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.lang}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.month}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.tithi}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.flag}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.ndate}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.day}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding a New Record */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Add New Calendar Record</h3>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Language</label>
                  <select
                    className="w-full border px-3 py-2 rounded-md"
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="English">English</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Month</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Month" />
                </div>
                <div>
                  <label className="block mb-2">Tithi</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Tithi" />
                </div>
                <div>
                  <label className="block mb-2">Flag</label>
                  <select className="w-full border px-3 py-2 rounded-md">
                    <option value="">Select Flag</option>
                    <option value="DA">DA</option>
                    <option value="P">P</option>
                    <option value="AM">AM</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Date</label>
                  <input type="date" className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block mb-2">Day</label>
                  <select className="w-full border px-3 py-2 rounded-md">
                    <option value="">Select Day</option>
                    {dayOptions[selectedLanguage]?.map((day, index) => (
                      <option key={index} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block mb-2">Description</label>
                  <textarea className="w-full border px-3 py-2 rounded-md" rows={3}></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderMasterTab;
