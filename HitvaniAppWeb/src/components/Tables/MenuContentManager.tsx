import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import Loader from '../../common/Loader';

const languageOptions = [
  { value: 'H', label: 'Hindi' },
  { value: 'E', label: 'English' },
  { value: 'G', label: 'Gujarati' },
];

const MenuContentManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [formData, setFormData] = useState({ name: '', data_content: '' });
  const [contentData, setContentData] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [menuContentData, setmenuContentData] = useState([]);
  const [showAdd, setshowAdd] = useState(false);
  const [loading, setLoading] = useState(true);

  //search button and search paramiters
  const [searchLVal, setsearchLVal] = useState([]);
  const [searchIdVal, setSearchID] = useState([]);
  const [MenuName, setMenuName] = useState(null);
  const [searchParams, setsearchparams] = useState('');

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

  const [isSearchMode, setisSearchMode] = useState(true);

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
    setSelectedLanguage(selectedOption);
    setsearchLVal(selectedOption);
    setisSearchMode(true);
    setshowAdd(false);
    setSelectedL1(null); // Reset L1 selection when language changes
    resetSelections();
    setMenuName(null);
    if (selectedOption) {
      setIsL1Disabled(false); // Enable L1 dropdown when a language is selected
      fetchL1Options(selectedOption.value); // Fetch L1 options from API
      console.log(selectedOption.value);
    } else {
      setshowAdd(false);
      setIsL1Disabled(true); // Disable L1 dropdown if no language is selected
      setL1Options([]); // Clear L1 options
    }
  };

  // Fetch L1 options using fetch() based on the selected language
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
    setSelectedL1(selectedOption);
    // setSearchID(selectedOption);
    setisSearchMode(true);
    setSelectedL2(null); // Reset L2 selection when language changes
    setSelectedL3(null);
    setSelectedL4(null);
    setIsL3Disabled(true);
    setIsL4Disabled(true);
    setMenuName(null);
    setshowAdd(false);

    if (selectedOption) {
      setIsL2Disabled(false); // Enable L2 dropdown when a language is selected
      // setrememberID(selectedOption.value);
      fetchL2Options(selectedOption.value); // Fetch L2 options from API
      // console.log(selectedOption.value);
    } else {
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
    setSelectedL2(selectedOption);
    setshowAdd(false);
    // console.log('rememberID', rememberID);
    // setrememberID(rememberID);
    setisSearchMode(true);
    setSelectedL3(null); // Reset L2 selection when language changes
    setSelectedL4(null);
    setIsL4Disabled(true);
    setMenuName(null);
    if (selectedOption) {
      // setSearchID(selectedOption.value);
      setIsL3Disabled(false); // Enable L2 dropdown when a language is selected
      // console.log(selectedOption.value);
      fetchL3Options(selectedOption.value); // Fetch L2 options from API
    } else {
      // Set the search ID to the L1 value if L3 is cleared
      setIsL3Disabled(true); // Disable L2 dropdown if no language is selected
      setL3Options([]); // Clear L2 options
    }
  };

  const fetchL3Options = async (l1Options) => {
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
      setL3Options(options);
    } catch (error) {
      console.error('Error fetching L3 options:', error);
    }
  };

  const handleL3Change = (selectedOption) => {
    setSelectedL3(selectedOption);
    setisSearchMode(true);
    setshowAdd(false);
    // setrememberID(null);
    setSelectedL4(null); // Reset L4 selection when L3 changes
    setMenuName(null);
    if (selectedOption) {
      setIsL4Disabled(false); // Enable L4 dropdown when L3 is selected
      // setSearchID(selectedOption); // Set the search value
      // setrememberID(selectedOption.value); // This will take effect after the render cycle
      console.log('Using selectedOption directly:', selectedOption.value); // Use selectedOption.value directly
      fetchL4Options(selectedOption.value); // Fetch L4 options using selectedOption.value
    } else {
      setIsL4Disabled(true); // Disable L4 dropdown if no L3 is selected
      setL4Options([]); // Clear L4 options
    }
    // console.log('set', rememberID);
  };

  const handleL4Change = (selectedOption) => {
    // setSearchID(selectedOption);
    setshowAdd(false);
    setisSearchMode(true);
    setMenuName(null);
  };

  const fetchL4Options = async (l1Options) => {
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
      console.log(searchIdVal);
    }
    setshowAdd(true);
    setisSearchMode(false);

    // Construct the search parameters
    const searchParams = {
      lang: searchLVal?.value ?? '', // Use optional chaining to safely access value
      menuid: searchIdValue ?? '', // Use the final searchIdValue
    };

    // Call fetchMenuContent with the search parameters
    fetchMenuContent(searchParams);
  };

  // Claer  hendle
  const handleclaer = () => {
    setSelectedLanguage(null);
    setshowAdd(false);

    setisSearchMode(true);
    resetSelections();
    resetSelections();
    fetchMenuContent();
  };

  // Fetch menu content data with search parameters
  const fetchMenuContent = async (searchParams = { lang: '', menuid: '' }) => {
    try {
      setLoading(true); // Show loader while fetching

      const { lang = '', menuid = '' } = searchParams;

      // Build the query string with the search parameters
      const response = await fetch(
        `${API_BASE_URL}/menucontent?language=${lang}&menuid=${menuid}`,
      );
      if (!response.ok) {
        setmenuContentData([]);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setmenuContentData(data.result); // Set the fetched data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Trigger fetchMenuContent with blank defaults when the component mounts
  useEffect(() => {
    fetchMenuContent({ lang: '', menuid: '' }); // Pass blank values as default
  }, []); // Empty dependency array ensures it runs only once

  // Handle edit operation
  const handleEdit = (child_id) => {
    console.log('handl');
    const menuToEdit = menuContentData.find(
      (item) => item.child_id === child_id,
    );
    if (menuToEdit) {
      setIsEditing(true);
      setCurrentMenu(menuToEdit);
      setFormData({
        name: menuToEdit.child_name,
        data_content: menuToEdit.data_content,
      });

      setEditorValue(menuToEdit.data_content);
      setShowModal(true);
    }
  };

  // Handle form submit (Add or Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      language: searchLVal?.value,
      name: formData.name,
      data_content: contentData,
      ParentID: searchIdVal,
      category: '',
      seq: '',
      stauts: '',
      content_description: '',
      content_creator: '',
    };

    if (isEditing && currentMenu) {
      // Update existing record (PUT)
      try {
        const response = await fetch(
          `${API_BASE_URL}/menucontent/${currentMenu.child_id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              data_content: contentData,
            }),
          },
        );

        if (response.ok) {
          displayMessage('Record updated successfully.');
          handleSearch();
        } else {
          displayMessage('Failed to update the nemu content.');
          console.error('Failed to update the menu content.');
        }
      } catch (error) {
        console.error('Error updating menu content:', error);
      }
    } else {
      // Add new record (POST)
      try {
        // console.log(payload);
        const response = await fetch(`${API_BASE_URL}/addMenuContent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          displayMessage('New record added successfully.');
          handleSearch();
          // const newMenu = await response.json();
          // setmenuContentData([...menuContentData, newMenu]);
        } else {
          displayMessage('Failed to add new nemu content.');
          console.error('Failed to add new menu content.');
        }
      } catch (error) {
        displayMessage('Error in nemu content operation.');
        console.error('Error adding new menu content:', error);
      }
    }

    setShowModal(false);
    setFormData({ name: '', data_content: '' });
    setEditorValue('');
    setContentData('');
  };

  // Handle delete operation
  const confirmDelete = async (child_id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/menucontent/${child_id}`,
          {
            method: 'DELETE',
          },
        );

        if (response.ok) {
          displayMessage('Record deleted successfully.');
          // const updatedData = menuContentData.filter(
          //   (item) => item.child_id !== child_id,
          // );
          // setmenuContentData(updatedData);
          handleSearch();
        } else {
          displayMessage('Failed to delete the menu content.');
          console.error('Failed to delete the menu content.');
        }
      } catch (error) {
        displayMessage('Error deleting menu content.');
        console.error('Error deleting menu content:', error);
      }
    }
  };

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
              handleEdit(row.child_id);
              setMenuName(null);
              if (row.parentid == 0) {
                fetchMenuname(row.child_id);
              } else {
                fetchMenuname(row.parentid);
              }
            }}
            className="rounded bg-primary px-2 py-1 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => confirmDelete(row.child_id)}
            className="rounded bg-red-500 px-2 py-1 text-white ml-2"
          >
            Delete
          </button>
        </div>
      ),
      width: '150px',
    },
    {
      name: 'Language',
      selector: (row) => row.language,
      sortable: true,
      width: '150px',
      textAlign: 'center',
    },
    {
      name: 'P ID',
      selector: (row) => row.parentid,
      sortable: true,
      width: '90px',
    },
    {
      name: 'C ID',
      selector: (row) => row.child_id,
      sortable: true,
      width: '90px',
    },
    {
      name: 'P Name',
      selector: (row) => row.parnt_name,
      sortable: true,
      width: '150px',
    },
    {
      name: 'C Name',
      selector: (row) => row.child_name,
      sortable: true,
      width: '150px',
    },
    {
      name: 'Status',
      selector: (row) => row.stauts,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Last M_Time',
      selector: (row) => row.last_modified_time,
      sortable: true,
      width: '149px',
    },
    {
      name: 'C Creater',
      selector: (row) => row.content_creator,
      sortable: true,
      width: '120px',
    },
    {
      name: 'C Description',
      selector: (row) => row.content_description,
      sortable: true,
      width: '150px',
    },
  ];

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Menu Content Data Manager
          </h4>
        </div>
        <div className="py-4 flex gap-5 flex-wrap">
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
          {showAdd && (
            <button
              onClick={() => {
                setMenuName(null);
                setIsEditing(false);
                setEditorValue('');
                setFormData({ name: '', data_content: '' });
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

          {/* <button onClick={() => setShowModal(true)} className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded ">AddNewRecord</button> */}
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
                data={menuContentData}
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
                    <b>{isEditing ? 'Edit' : 'Add New'} Menu Content Record</b>
                  </h3>
                  <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      <div>
                        <label className="block mb-2">
                          <b>Parant Name</b>
                        </label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={MenuName}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block mb-2">
                          <b>Child Name</b>
                        </label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={formData.name || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Enter New Child Name"
                        />
                      </div>
                      {loading ? (
                        <Loader /> // Your defined loader component
                      ) : (
                        <div>
                          <label className="block mb-2">
                            <b>Data Content</b>
                          </label>

                          <Editor
                            value={editorValue}
                            onEditorChange={(newValue, editor) => {
                              setEditorValue(newValue);
                              setContentData(editor.getContent());
                            }}
                            apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
                            init={{
                              plugins: [
                                'advlist',
                                'autolink',
                                'lists',
                                'link',
                                'image',
                                'charmap',
                                'preview',
                                'anchor',
                                'searchreplace',
                                'visualblocks',
                                'code',
                                'fullscreen',
                                'insertdatetime',
                                'media',
                                'table',
                                'help',
                                'wordcount',
                              ],
                              toolbar:
                                'undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                              tinycomments_mode: 'embedded',
                            }}
                          />
                        </div>
                      )}
                      ;
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

            {/* {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-lg">
                <h3 className="text-xl mb-4">
                  <b>{isEditing ? 'Edit' : 'Add New'} Menu Content Record</b>
                </h3>
                  <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                      <label className="block mb-2">
                          <b>Language</b>
                        </label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={formData.language}
                          onChange={(e) =>
                            setFormData({ ...formData, language: e.target.value })
                          }
                          placeholder="Enter Language"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">
                          <b>Parent Name</b>
                        </label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Enter Parent Name"
                        />
                      </div>
                      <div>
                          <label className="block mb-2">
                            <b>Parent ID</b>
                          </label>
                          <input
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            value={formData.ParentID}
                            onChange={(e) =>
                              setFormData({ ...formData, ParentID: e.target.value })
                            }
                            placeholder="Enter Parent ID"
                          />
                      </div>
                      <div>
                        <label className="block mb-2">
                          <b>Category</b>
                        </label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          placeholder="Enter Category"
                        />
                      </div>
                      <div>
                          <label className="block mb-2">
                            <b>Sequence</b>
                          </label>
                          <input
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            value={formData.seq}
                            onChange={(e) =>
                              setFormData({ ...formData, seq: e.target.value })
                            }
                            placeholder="Enter Sequence"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">
                            <b>Status</b>
                          </label>
                          <input
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            value={formData.stauts}
                            onChange={(e) =>
                              setFormData({ ...formData, stauts: e.target.value })
                            }
                            placeholder="Enter Status"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">
                            <b>Content Description</b>
                          </label>
                          <input
                            type="text"
                            className="w-full border px-3 py-2 rounded-md"
                            value={formData.content_description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content_description: e.target.value,
                              })
                            }
                            placeholder="Enter Content Description"
                          />
                      </div>
                      <div>
                        <label className="block mb-2">
                          <b>Content Creator</b>
                        </label>
                        <input
                          type="text"
                          className="w-full border px-3 py-2 rounded-md"
                          value={formData.content_creator}
                          onChange={(e) =>
                            setFormData({ ...formData, content_creator: e.target.value })
                          }
                          placeholder="Enter Content Creator"
                        />
                      </div>
                      <div>
                      <label className="block mb-2">
                          <b>Data Content</b>
                        </label>

                        <Editor
                          value={editorValue}
                          onEditorChange={(newValue, editor) => {
                            setEditorValue(newValue);
                            setContentData(editor.getContent());
                          }}
                          apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
                          init={{
                            plugins: [
                              'advlist',
                              'autolink',
                              'lists',
                              'link',
                              'image',
                              'charmap',
                              'preview',
                              'anchor',
                              'searchreplace',
                              'visualblocks',
                              'code',
                              'fullscreen',
                              'insertdatetime',
                              'media',
                              'table',
                              'help',
                              'wordcount',
                            ],
                            toolbar:
                              'undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            tinycomments_mode: 'embedded',
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                      <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
    </>
  );
};

export default MenuContentManager;
