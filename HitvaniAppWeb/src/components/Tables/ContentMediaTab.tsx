import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import Loader from '../../common/Loader';

const languageOptions = [
  { value: 'H', label: 'Hindi' },
  { value: 'E', label: 'English' },
  { value: 'G', label: 'Gujarati' },
];

const ContentMediaTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMedia, setcurrentMedia] = useState(null);
  const [formData, setFormData] = useState({
    cm_id: '',
    menu_id: '',
    type: '',
    media_link: '',
    photo_link: '',
    media_desc: '',
    status: 0,
    detail: '',
    album: '',
  });

  const [showAdd, setshowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mediaContentData, setmediaContentData] = useState([]);

  //search button and search paramiters
  const [searchIdVal, setSearchID] = useState([]);
  const [showsearch, setshowsearch] = useState(false);
  const [MenuName, setMenuName] = useState(null);

  // dropdown set option start
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [l1Options, setL1Options] = useState([]);
  const [isL1Disabled, setIsL1Disabled] = useState(true);
  const [selectedL1, setSelectedL1] = useState(null);

  const [l2Options, setL2Options] = useState([]);
  const [isL2Disabled, setIsL2Disabled] = useState(true);
  const [selectedL2, setSelectedL2] = useState(null);

  const [l3Options, setL3Options] = useState([]);
  const [isL3Disabled, setIsL3Disabled] = useState(true);
  const [selectedL3, setSelectedL3] = useState(null);

  const [l4Options, setL4Options] = useState([]);
  const [isL4Disabled, setIsL4Disabled] = useState(true);
  const [selectedL4, setSelectedL4] = useState(null);

  const [isSearchMode, setisSearchMode] = useState(true);
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

  // Base URL from .env file
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const resetSelections = () => {
    setSelectedL1(null);
    setL1Options([]);
    setSelectedL2(null);
    setL2Options([]);
    setIsL2Disabled(true);
    setSelectedL3(null);
    setL3Options([]);
    setIsL3Disabled(true);
    setSelectedL4(null);
    setL4Options([]);
    setIsL4Disabled(true);
    // setSearchID(null);
  };

  // Handle language selection
  const handleLanguageChange = (selectedOption) => {
    setMenuName(null);
    setSelectedLanguage(selectedOption);
    setisSearchMode(true);
    setSelectedL1(null); // Reset L1 selection when language changes
    resetSelections();
    if (selectedOption) {
      setIsL1Disabled(false); // Enable L1 dropdown when a language is selected
      fetchL1Options(selectedOption.value); // Fetch L1 options from API
    } else {
      setshowAdd(false);
      setIsL1Disabled(true); // Disable L1 dropdown if no language is selected
      setL1Options([]); // Clear L1 options
    }
  };

  // Example fetch usage
  const fetchL1Options = async (language) => {
    try {
      // const response = await fetch(`${API_BASE_URL}${language}`);
      const response = await fetch(`${API_BASE_URL}/languageget/${language}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const options = data.map((option) => ({
        value: option.menu_id,
        label: option.name,
      }));
      setL1Options(options);
    } catch (error) {
      console.error('Error fetching L1 options:', error);
    }
  };

  const handleL1Change = (selectedOption) => {
    setMenuName(null);
    setSelectedL1(selectedOption);
    // setSearchID(selectedOption);
    setisSearchMode(true);
    setSelectedL2(null); // Reset L2 selection when language changes
    setSelectedL3(null);
    setSelectedL4(null);
    setIsL3Disabled(true);
    setIsL4Disabled(true);
    setshowAdd(false);

    if (selectedOption) {
      setshowsearch(true);
      setIsL2Disabled(false); // Enable L2 dropdown when a language is selected
      // setrememberID(selectedOption.value);
      fetchL2Options(selectedOption.value); // Fetch L2 options from API
    } else {
      setshowsearch(false);
      setshowAdd(false);
      setIsL2Disabled(true); // Disable L2 dropdown if no language is selected
      setL2Options([]); // Clear L2 options
    }
  };

  const fetchL2Options = async (l1Options) => {
    try {
      const response = await fetch(`${API_BASE_URL}/L1get/${l1Options}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const options = data.map((option) => ({
        value: option.menu_id,
        label: option.name,
      }));
      setL2Options(options);
    } catch (error) {
      console.error('Error fetching L2 options:', error);
    }
  };

  const handleL2Change = (selectedOption) => {
    setMenuName(null);
    setSelectedL2(selectedOption);
    setisSearchMode(true);
    setSelectedL3(null); // Reset L2 selection when language changes
    setSelectedL4(null);
    setIsL4Disabled(true);
    setshowAdd(false);
    if (selectedOption) {
      // setSearchID(selectedOption.value);
      setIsL3Disabled(false); // Enable L2 dropdown when a language is selected
      fetchL3Options(selectedOption.value); // Fetch L2 options from API
    } else {
      // Set the search ID to the L1 value if L3 is cleared
      setIsL3Disabled(true); // Disable L2 dropdown if no language is selected
      setL3Options([]); // Clear L2 options
    }
  };

  const fetchL3Options = async (l2Options) => {
    try {
      const response = await fetch(`${API_BASE_URL}/L1get/${l2Options}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const options = data.map((option) => ({
        value: option.menu_id,
        label: option.name,
      }));
      setL3Options(options);
    } catch (error) {
      console.error('Error fetching L3 options:', error);
    }
  };

  const handleL3Change = (selectedOption) => {
    setMenuName(null);
    setSelectedL3(selectedOption);
    setisSearchMode(true);
    setshowAdd(false);
    // setrememberID(null);
    setSelectedL4(null); // Reset L4 selection when L3 changes

    if (selectedOption) {
      setIsL4Disabled(false); // Enable L4 dropdown when L3 is selected
      fetchL4Options(selectedOption.value); // Fetch L4 options using selectedOption.value
    } else {
      setIsL4Disabled(true); // Disable L4 dropdown if no L3 is selected
      setL4Options([]); // Clear L4 options
    }
  };

  const handleL4Change = (selectedOption) => {
    // setSearchID(selectedOption);
    setMenuName(null);
    setisSearchMode(true);
    setshowAdd(false);
  };

  const fetchL4Options = async (l3Options) => {
    try {
      const response = await fetch(`${API_BASE_URL}/L1get/${l3Options}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const options = data.map((option) => ({
        value: option.menu_id,
        label: option.name,
      }));
      setL4Options(options);
    } catch (error) {
      console.error('Error fetching L4 options:', error);
    }
  };

  // dropdown set option End

  //get Menu name for add and edit media
  const fetchMenuname = async (menu_ID) => {
    if (!menu_ID) {
      console.warn('menu_ID is required to fetch menu name.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/selAddMedia/${menu_ID}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.result && data.result.length > 0) {
        const menuName = data.result[0].name;
        setMenuName(menuName);
      } else {
        console.warn('No menu item found in the response.');
      }
    } catch (error) {
      console.error('Error fetching menu name:', error);
    }
  };

  // Search Handle
  const handleSearch = () => {
    let searchIdValue = null;

    // Determine which selection should set the search ID
    if (selectedL4) {
      searchIdValue = selectedL4.value;
    } else if (selectedL3) {
      searchIdValue = selectedL3.value;
    } else if (selectedL2) {
      searchIdValue = selectedL2.value;
    } else if (selectedL1) {
      searchIdValue = selectedL1.value;
    }

    // Set the search ID based on the priority of selections
    if (searchIdValue) {
      setSearchID(searchIdValue);
    }
    setshowAdd(true);
    setisSearchMode(false);

    // Construct the search parameters
    const searchParams = {
      cm_id: '',
      menu_id: searchIdValue ?? '', // Use the final searchIdValue
    };
    // Call fetchMenuContent with the search parameters
    fetchMediaContent(searchParams);
  };

  // Claer  hendle
  const handleclaer = () => {
    setMenuName(null);
    setSelectedLanguage(null);
    setshowAdd(false);
    setshowsearch(false);

    setisSearchMode(true);
    resetSelections();
    resetSelections();
    // fetchMenuContent();
  };

  // Handle form submit (Add or Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      menu_id: searchIdVal,
      cm_id: formData.cm_id,
      type: formData.type,
      media_link: formData.media_link,
      media_desc: formData.media_desc,
      status: formData.status,
      detail: formData.detail,
      album: formData.album,
      photo_link: formData.photo_link,
    };

    if (isEditing && currentMedia) {
      // Update existing record (PUT)
      try {
        const response = await fetch(
          `${API_BASE_URL}/mediacontent/${currentMedia.cm_id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cm_id: currentMedia.cm_id,
              menu_id: formData.menu_id,
              type: formData.type,
              media_link: formData.media_link,
              media_desc: formData.media_desc,
              status: formData.status.toString(),
              detail: formData.detail,
              album: formData.album,
              photo_link: formData.photo_link,
            }),
          },
        );

        if (response.ok) {
          displayMessage('Record updated successfully.');
          handleSearch();
        } else {
          displayMessage('Failed to update the media content.');
          console.error('Failed to update the media content.');
        }
      } catch (error) {
        console.error('Error updating media content:', error);
      }
    } else {
      // Add new record (POST)
      try {
        const response = await fetch(`${API_BASE_URL}/addmedia`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          displayMessage('New record added successfully.');
          handleSearch();
        } else {
          displayMessage('Failed to add new media content.');
          console.error('Failed to add new media content.');
        }
      } catch (error) {
        displayMessage('Error in media content operation.');
        console.error('Error adding new media content:', error);
      }
    }

    setShowModal(false);
    setFormData({
      menu_id: '',
      cm_id: '',
      type: '',
      media_link: '',
      media_desc: '',
      status: '',
      detail: '',
      album: '',
      photo_link: '',
    });
  };

  const handleEdit = (cm_id) => {
    const menuToEdit = mediaContentData.find((item) => item.cm_id === cm_id);

    if (menuToEdit) {
      setIsEditing(true);
      setcurrentMedia(menuToEdit);

      setFormData({
        menu_id: menuToEdit.menu_id,
        cm_id: menuToEdit.cm_id,
        type: menuToEdit.type || '',
        media_link: menuToEdit.media_link || '',
        media_desc: menuToEdit.media_desc || '',
        status: Number(menuToEdit.status),
        detail: menuToEdit.detail || '',
        album: menuToEdit.album || '',
        photo_link: menuToEdit.photo_link || '', // Set empty string as fallback
      });

      setShowModal(true);
    } else {
      console.warn('menuToEdit not found for cm_id:', cm_id);
    }
  };

  // Handle delete operation
  const confirmDelete = async (cm_id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/mediacontent/${cm_id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          displayMessage('Record deleted successfully.');
          displayMessage('');
          handleSearch();
        } else {
          displayMessage('Failed to delete the calendar content.');
          console.error('Failed to delete the media content.');
        }
      } catch (error) {
        displayMessage('Error deleting calendar content.');
        console.error('Error deleting media content:', error);
      }
    }
  };

  // Fetch menu content data with search parameters
  const fetchMediaContent = async (
    searchParams = { cm_id: '', menu_id: '' },
  ) => {
    try {
      setLoading(true); // Show loader while fetching

      const { cm_id = '', menu_id = '' } = searchParams;

      // Build the query string with the search parameters
      const response = await fetch(
        `${API_BASE_URL}/mediacontent?cm_id=${cm_id}&menu_id=${menu_id}`,
      );
      if (!response.ok) {
        setmediaContentData([]);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setmediaContentData(data.result); // Set the fetched data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Trigger fetchMenuContent with blank defaults when the component mounts
  useEffect(() => {
    fetchMediaContent(); // Pass blank values as default
  }, []); // Empty dependency array ensures it runs only once

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
            onClick={() => {
              setMenuName(null);
              fetchMenuname(row.menu_id);
              handleEdit(row.cm_id);
            }}
            className="rounded bg-primary px-2 py-1 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => confirmDelete(row.cm_id)}
            className="rounded bg-red-500 px-2 py-1 text-white ml-2"
          >
            Delete
          </button>
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
      width: '140px',
    },
    {
      name: 'Media Link',
      selector: (row: any) => row.media_link,
      sortable: true,
      width: '130px',
    },
    {
      name: 'Type',
      selector: (row: any) => row.type,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Status',
      // selector: (row: any) => row.status,
      // datatable status 0,1 view A ,UA
      selector: (row: any) => (row.status == 1 ? 'A' : 'UA'),
      sortable: true,
      width: '100px',
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
      width: '130px',
    },
  ];

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Media Content Data Manager
          </h4>
        </div>
        <div className="py-4 flex gap-5">
          <div>
            {/* Language Select */}
            <div className="font-medium mb-1">Language</div>
            <div>
              <Select
                options={languageOptions}
                placeholder="Select"
                className="react-select-container w-[135px] z-50"
                classNamePrefix="react-select"
                onChange={handleLanguageChange} // Set the selected language
                value={selectedLanguage} // Bind selected language
                isClearable
              />
            </div>
          </div>
          <div>
            {/* L1 Select */}
            <div className="font-medium mb-1">L1</div>
            <div>
              <Select
                placeholder="Select"
                className="react-select-container w-[135px] z-40"
                classNamePrefix="react-select"
                isDisabled={isL1Disabled} // Disable until language is selected
                options={l1Options} // Set L1 options dynamically
                onChange={handleL1Change} // Handle L1 selection
                value={selectedL1} // Bind selected L1
                isClearable
                // isClearable={false} // Disable the clear button
              />
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">L2</div>
            <div>
              <Select
                placeholder="Select"
                className="react-select-container w-[135px] z-40"
                classNamePrefix="react-select"
                isDisabled={isL2Disabled}
                options={l2Options}
                onChange={handleL2Change}
                value={selectedL2}
                isClearable
              />
            </div>
          </div>
          <div>
            <div className="font-medium mb-1.5">L3</div>
            <div>
              <Select
                placeholder="Select"
                className="react-select-container w-[135px] z-40"
                classNamePrefix="react-select"
                isDisabled={isL3Disabled}
                options={l3Options}
                onChange={handleL3Change}
                value={selectedL3}
                isClearable
              />
            </div>
          </div>
          <div>
            <div className="font-medium mb-1.5">L4</div>
            <div>
              <Select
                placeholder="Select"
                className="react-select-container w-[135px] z-40"
                classNamePrefix="react-select"
                isDisabled={isL4Disabled}
                options={l4Options}
                onChange={handleL4Change}
                value={selectedL4}
                isClearable
              />
            </div>
          </div>
          {showsearch && (
            <button
              className={
                isSearchMode
                  ? 'w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3 bg-primary text-white px-4 py-2 rounded'
                  : 'w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3 bg-red-500 px-2 py-1 text-white ml-2'
              }
              onClick={isSearchMode ? handleSearch : handleclaer}
            >
              {/* <span>Search</span> */}
              <span>{isSearchMode ? 'Search' : 'Clear'}</span>
            </button>
          )}
          {showAdd && (
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  menu_id: '',
                  cm_id: '',
                  type: '',
                  media_link: '',
                  media_desc: '',
                  status: '',
                  detail: '',
                  album: '',
                  photo_link: '',
                });
                setShowModal(true);
                if (searchIdVal) {
                  fetchMenuname(searchIdVal);
                } else {
                  console.warn('menu_ID is missing or undefined.');
                }
              }}
              className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded "
            >
              <span>Add New</span>
            </button>
          )}
        </div>
        {/* API Message */}
        {displayDiv && (
          <div>
            {apiMessage && (
              <div
                className={`mb-4 p-4 text-center text-white bg-green-500 rounded-md transition-opacity duration-1000 ${
                  showMessage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {apiMessage}
              </div>
            )}
          </div>
        )}
        {loading ? (
          <Loader /> // Your defined loader component
        ) : (
          <div className="flex flex-col overflow-x-auto">
            {/* Data Table */}
            <div className="mt-4">
              <DataTable
                style={{ width: '100%', fontSize: '20px' }}
                columns={columns}
                data={mediaContentData}
                customStyles={customStyles}
                pagination
                highlightOnHover
              />
            </div>

            {/* Modal for Adding a New Record */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-lg">
                  <h3 className="text-xl mb-4">
                    {isEditing ? 'Edit' : 'Add New'} Media Record
                  </h3>
                  <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          hidden
                          className="w-full border px-3 py-2 rounded-md"
                          value={formData.cm_id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cm_id: e.target.value,
                            })
                          }
                        />
                        <label className="block mb-2">MenuId</label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={searchIdVal}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Menu Name</label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={MenuName}
                          readOnly // Add readOnly to prevent editing and resolve the warning
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Media Link</label>
                        <textarea
                          className="w-full border px-3 py-2 rounded-md"
                          rows={3}
                          value={formData.media_link}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              media_link: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Photo Link</label>
                        <textarea
                          className="w-full border px-3 py-2 rounded-md"
                          rows={3}
                          value={formData.photo_link || ''} // Ensure value is an empty string if undefined or null
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              photo_link: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Media Desc</label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          placeholder="Enter Description"
                          value={formData.media_desc}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              media_desc: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Detail</label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          placeholder="Enter Detail"
                          value={formData.detail}
                          onChange={(e) =>
                            setFormData({ ...formData, detail: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Album</label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          placeholder="Enter Album Name"
                          value={formData.album}
                          onChange={(e) =>
                            setFormData({ ...formData, album: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Type</label>
                        <select
                          id="type"
                          name="type"
                          className="w-full border px-3 py-2 rounded-md"
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                        >
                          <option value="" disabled>
                            Select Type
                          </option>
                          <option value="a">Audio</option>
                          <option value="v">Video</option>
                          <option value="p">PDF</option>
                          <option value="t">Text</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2">Status</label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="status"
                            name="status"
                            className="w-4 h-4 border-gray-300 rounded"
                            checked={formData.status === 1}
                            onChange={(e) => {
                              const newStatus = e.target.checked ? 1 : 0;
                              setFormData({
                                ...formData,
                                status: newStatus,
                              });
                            }}
                          />

                          <label
                            htmlFor="status"
                            className="ml-2 text-gray-700"
                          >
                            Active
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md"
                      >
                        {isEditing ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ContentMediaTab;
