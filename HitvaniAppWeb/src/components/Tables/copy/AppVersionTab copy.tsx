import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const AppVersionTab = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [appVersionData, setAppVersionData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item data for update
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
        backgroundColor: '#f4f4f4',
        fontSize: '18px',
        color: '#333',
      },
    },
    rows: {
      style: {
        minHeight: '72px', // override the row height
        backgroundColor: '#fff',
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
    headCells: {
      style: {
        color: '#4a4a4a',
        fontSize: '15px',
        fontWeight: 'bold',
        justifyContent: 'center', // Center-align table headers
        textAlign: 'center',
      },
    },
    cells: {
      style: {
        color: '#333',
        padding: '10px',
        fontSize: '14px',
        justifyContent: 'center', // Center-align table data cells
        textAlign: 'center',
        display: 'flex', // Make the cells flex containers
        alignItems: 'center', // Vertically center the cell content
      },
    },
  };

  // Define columns for DataTable
  const columns = [
    {
      name: 'Action',
      cell: (row) => (
        <div>
          <button
            onClick={() => handleEdit(row.versionid)}
            className="rounded bg-primary px-2 py-1 text-white"
          >
            Edit
          </button>
        </div>
      ),
      width: '150px',
    },
    {
      name: 'Version Name',
      selector: (row: any) => row.version_name,
      sortable: true,
      width: '250px',
      textAlign: 'center',
    },
    {
      name: 'Version',
      selector: (row: any) => row.version,
      sortable: true,
      width: '250px',
    },
    {
      name: 'Created Time',
      selector: (row: any) => row.createdtime,
      sortable: true,
      width: '250px',
    },
    {
      name: 'Modified Time',
      selector: (row: any) => row.modifiedtime,
      sortable: true,
      width: '250px',
    },
  ];
  
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
      if (result.success) {
        console.log("Data updated successfully");
        setShowUpdateModal(false); // This should close the modal
        fetchData(); // Refresh data
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
  

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">App Version Master</h4>

      <div className="flex flex-col">
        {/* Data Table */}
        <div className="mt-4">
            <DataTable
              style={{ width: '100%', fontSize: '20px' }}
              columns={columns}
              data={appVersionData}
              customStyles={customStyles}
              highlightOnHover
            />
          </div>

        {/* Modal for Updating a Record */}
        {showUpdateModal && (
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
                    <input type="text" value={selectedItem.deleted} disabled className="w-full border px-3 py-2 rounded-md" />
                  </div>
                  <div>
                    <label className="block mb-2">Created Time</label>
                    <input type="text" value={selectedItem.createdtime} disabled className="w-full border px-3 py-2 rounded-md" />
                  </div>
                  <div>
                    <label className="block mb-2">Modified Time</label>
                    <input type="text" value={selectedItem.modifiedtime} disabled className="w-full border px-3 py-2 rounded-md" />
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
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Update</button>
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
