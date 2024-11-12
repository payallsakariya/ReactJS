import React, { useState, useEffect } from 'react';

const AppVersionTab = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [appVersionData, setAppVersionData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item data for update

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [apiMessage, setApiMessage] = useState(''); // State for API messages
  const [showMessage, setShowMessage] = useState(false); // Control visibility for fade-out
  const [displayDiv, setDisplayDiv] = useState(false);

  // Display and fade out message
  const displayMessage = (message) => {
    setApiMessage(message);
    setShowMessage(true);
    setDisplayDiv(true);

    // Hide message text after 5 seconds
    setTimeout(() => setShowMessage(false), 35000);

    // Completely remove div after fade-out completes
    setTimeout(() => setDisplayDiv(false), 4000);
  };

  async function fetchData() {
    try {
      const response = await fetch(`${API_BASE_URL}/selectapp`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (data && data.data) {
        setAppVersionData(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const openUpdateModal = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/updateapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedItem),
      });

      const result = await response.json();
      if (result.message == 'AppVersion Updated Successfully.') {
        setShowUpdateModal(false);
        setSelectedItem(null);
        fetchData(); // Refresh data
        console.error(result.message);
        displayMessage(result.message);
      } else {
        console.error(result.message);
        displayMessage(result.message);
      }
    } catch (error) {
      displayMessage(error);
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        App Version Master
      </h4>

        {/* API Message */}
        {displayDiv && (
        <div>
          {apiMessage && (
            <div
              className={`mb-4 p-4 text-center text-white bg-green-500 rounded-md transition-opacity duration-1000 ${
                showMessage ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transition: 'opacity 1s ease-out',
                zIndex: 1000,
              }}
            >
              {apiMessage}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Update
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Version ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Version Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Version
            </h5>
          </div>
          <div className="p-2.5 hidden text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Created Time
            </h5>
          </div>
          <div className="p-2.5 hidden text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Modified Time
            </h5>
          </div>
        </div>

        {/* Data Rows */}
        {appVersionData.map((item, index) => (
          <div
            className={`grid grid-cols-6 ${
              index === appVersionData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={item.versionid}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button
                className="rounded bg-primary px-2 py-1 text-white"
                onClick={() => openUpdateModal(item)}
              >
                Update
              </button>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.versionid}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.version_name}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.version}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.createdtime}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.modifiedtime}</p>
            </div>
          </div>
        ))}

        {/* Modal for Updating a Record */}
        {showUpdateModal && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg">
              <h3 className="text-xl mb-4">Update App Version</h3>
              <form onSubmit={handleUpdateSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Version Name</label>
                    <input
                      type="text"
                      name="version_name"
                      value={selectedItem.version_name}
                      onChange={handleUpdateChange}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Version</label>
                    <input
                      type="text"
                      name="version"
                      value={selectedItem.version}
                      onChange={handleUpdateChange}
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Deleted</label>
                    <input
                      type="text"
                      value={selectedItem.deleted}
                      disabled
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Created Time</label>
                    <input
                      type="text"
                      value={selectedItem.createdtime}
                      disabled
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Modified Time</label>
                    <input
                      type="text"
                      value={selectedItem.modifiedtime}
                      disabled
                      className="w-full border px-3 py-2 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppVersionTab;
