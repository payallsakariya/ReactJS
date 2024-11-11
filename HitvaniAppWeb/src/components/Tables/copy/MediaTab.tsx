import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const ContentMediaTab: React.FC = () => {
  // Define the mock data first
  const ContentMediadata = [
    { cm_id: 1, menu_id: '10', type: 'v', media_link: 'http://google.com', media_desc: 'Sample 1', status: 'A', detail: 'detail 1', album: 'album 1', photo_link: 'photo_link_1' },
    { cm_id: 2, menu_id: '20', type: 'v', media_link: 'http://example.com', media_desc: 'Sample 2', status: 'A', detail: 'detail 2', album: 'album 2', photo_link: 'photo_link_2' },
    { cm_id: 3, menu_id: '30', type: 'v', media_link: 'http://test.com', media_desc: 'Sample 3', status: 'A', detail: 'detail 3', album: 'album 3', photo_link: 'photo_link_3' },
  ];

  // Initialize the state variables
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(ContentMediadata); // Store filtered data

  // Define table columns
  const columns = [
    {
      name: 'Action',
      cell: (row: any) => (
        <div>
          <button className="rounded bg-primary px-2 py-1 text-white">Edit</button>
          <button className="rounded bg-red-500 px-2 py-1 text-white ml-2">Delete</button>
        </div>
      ),
      width: '150px',
    },
    {
      name: 'Menu Id',
      selector: (row: any) => row.menu_id,
      sortable: true,
      width: '150px',
      textAlign: 'center',
    },
    {
      name: 'Media Desc',
      selector: (row: any) => row.media_desc,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Media Link',
      selector: (row: any) => row.media_link,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Type',
      selector: (row: any) => row.type,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Detail',
      selector: (row: any) => row.detail,
      width: '90px',
    },
    {
      name: 'Album',
      selector: (row: any) => row.album,
      width: '90px',
    },
    {
      name: 'Photo Link',
      selector: (row: any) => row.photo_link,
      width: '90px',
    },
  ];

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

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    // Filter data based on search text
    const filtered = ContentMediadata.filter((item) =>
      item.menu_id.toLowerCase().includes(value) ||
      item.media_desc.toLowerCase().includes(value) ||
      item.media_link.toLowerCase().includes(value) ||
      item.type.toLowerCase().includes(value) ||
      item.status.toLowerCase().includes(value) ||
      item.detail.toLowerCase().includes(value) ||
      item.album.toLowerCase().includes(value) ||
      item.photo_link.toLowerCase().includes(value)
    );
    setFilteredData(filtered); // Update filtered data
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">Content Media Manager</h4>
        <button onClick={() => setShowModal(true)} className="rounded bg-primary px-4 py-2 text-white">
          Add New
        </button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* DataTable component */}
      <DataTable
        columns={columns}
        data={filteredData} // Use filtered data
        customStyles={customStyles}
        pagination
        highlightOnHover
        striped
        responsive
      />

      {/* Modal for Adding a New Record */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Add New Media Record</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">MenuId</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Media Link" />
                </div>
                <div>
                  <label className="block mb-2">Menu Name</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Description" />
                </div>
                <div>
                  <label className="block mb-2">Media Link</label>
                  <textarea className="w-full border px-3 py-2 rounded-md" rows={3}></textarea>
                </div>
                <div>
                  <label className="block mb-2">Photo Link</label>
                  <textarea className="w-full border px-3 py-2 rounded-md" rows={3}></textarea>
                </div>
                <div>
                  <label className="block mb-2">Media Desc</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Description" />
                </div>
                <div>
                  <label className="block mb-2">Detail</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Detail" />
                </div>
                <div>
                  <label className="block mb-2">Album</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Album Name" />
                </div>
                <div>
                  <label className="block mb-2">Type</label>
                  <select id="type" name="type" className="w-full border px-3 py-2 rounded-md">
                    <option value="" disabled>Select Type</option>
                    <option value="a">Audio</option>
                    <option value="v">Video</option>
                    <option value="p">PDF</option>
                    <option value="t">Text</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Status</label>
                  <div className="flex items-center">
                    <input type="checkbox" id="status" name="status" className="w-4 h-4 border-gray-300 rounded" />
                    <label htmlFor="status" className="ml-2 text-gray-700">Active</label>
                  </div>
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

export default ContentMediaTab;
