import React, { useState } from 'react';

const CalenderMasterTab = () => {
  // State to control modal visibility and form actions
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [editMode, setEditMode] = useState(false); // To track whether we are editing or adding a record
  const [currentItem, setCurrentItem] = useState({ id: null, lang: '', month: '', tithi: '', flag: '', ndate: '', day: '', desc: '' });

  // State for the data
  const [mockData, setMockData] = useState([
    { id: 1, lang: 'English', month: 'January', tithi: '4', flag: 'DA', ndate: '2024-01-15', day: 'Monday', desc: 'New Year Celebration' },
    { id: 2, lang: 'Hindi', month: 'February', tithi: '8', flag: 'P', ndate: '2024-02-20', day: 'मंगलवार', desc: 'Winter Break' },
    { id: 3, lang: 'Gujarati', month: 'March', tithi: '1', flag: 'AM', ndate: '2024-03-10', day: 'બુધવાર', desc: 'Spring Festival' },
  ]);

  // Day options based on selected language
  const dayOptions = {
    Hindi: ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार'],
    Gujarati: ['સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર', 'રવિવાર'],
    English: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  };

  // Handle form submission for Add and Update operations
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      // Update existing record
      setMockData(mockData.map(item => (item.id === currentItem.id ? currentItem : item)));
    } else {
      // Add new record
      setMockData([...mockData, { ...currentItem, id: mockData.length + 1 }]);
    }

    // Reset form and close modal
    setShowModal(false);
    setEditMode(false);
    setCurrentItem({ id: null, lang: '', month: '', tithi: '', flag: '', ndate: '', day: '', desc: '' });
  };

  // Handle editing an item
  const handleEdit = (item) => {
    setCurrentItem(item);
    setSelectedLanguage(item.lang);
    setEditMode(true);
    setShowModal(true);
  };

  // Handle deleting an item
  const handleDelete = (id) => {
    setMockData(mockData.filter(item => item.id !== id));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">Calendar Master</h4>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => {
            setShowModal(true);
            setEditMode(false); // Ensure we're in "add" mode
            setCurrentItem({ id: null, lang: '', month: '', tithi: '', flag: '', ndate: '', day: '', desc: '' }); // Reset form
          }}
        >
          Add New Record
        </button>
      </div>

      {/* Table */}
      <div className="flex flex-col">
        <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
          {/* Table Headers */}
          {['Action', 'Language', 'Month', 'Tithi', 'Flag', 'Date', 'Day', 'Description'].map(header => (
            <div key={header} className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">{header}</h5>
            </div>
          ))}
        </div>

        {/* Table Rows */}
        {mockData.map((item) => (
          <div className="grid grid-cols-8 border-b border-stroke dark:border-strokedark" key={item.id}>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button className="rounded bg-primary px-2 py-1 text-white" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button className="rounded bg-red-500 px-2 py-1 text-white ml-2" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
            {['lang', 'month', 'tithi', 'flag', 'ndate', 'day', 'desc'].map((field) => (
              <div key={field} className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{item[field]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Record */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">{editMode ? 'Edit Calendar Record' : 'Add New Calendar Record'}</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Language</label>
                  <select className="w-full border px-3 py-2 rounded-md" value={currentItem.lang} onChange={(e) => {
                    setCurrentItem({ ...currentItem, lang: e.target.value });
                    setSelectedLanguage(e.target.value);
                  }}>
                    <option value="">Select Language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="English">English</option>
                  </select>
                </div>
                {/* Other fields... */}
              </div>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderMasterTab;
