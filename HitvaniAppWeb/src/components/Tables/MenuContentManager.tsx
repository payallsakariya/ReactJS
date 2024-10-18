import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';

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
  
  //search button and search paramiters
  const [searchLVal, setsearchLVal] = useState('');
  const [searchIdVal, setsearchIdVal] = useState('');
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
  };

  // Handle language selection
  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setsearchLVal(selectedOption);
    setSelectedL1(null); // Reset L1 selection when language changes
    resetSelections();
    if (selectedOption) {
      setIsL1Disabled(false); // Enable L1 dropdown when a language is selected
      fetchL1Options(selectedOption.value); // Fetch L1 options from API
    } else {
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
    setsearchIdVal(selectedOption);
    setSelectedL2(null); // Reset L2 selection when language changes
    setSelectedL3(null);
    setSelectedL4(null)
    setIsL3Disabled(true);
    setIsL4Disabled(true);
    if (selectedOption) {
      setIsL2Disabled(false); // Enable L2 dropdown when a language is selected
      fetchL2Options(selectedOption.value); // Fetch L2 options from API
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
        setsearchIdVal(selectedOption);
        setSelectedL3(null); // Reset L2 selection when language changes
        setSelectedL4(null)
        setIsL4Disabled(true);
        if (selectedOption) {
          setIsL3Disabled(false); // Enable L2 dropdown when a language is selected
          fetchL3Options(selectedOption.value); // Fetch L2 options from API
        } else {
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
      setsearchIdVal(selectedOption);
      setSelectedL4(null); // Reset L2 selection when language changes
      if (selectedOption) {
        setIsL4Disabled(false); // Enable L2 dropdown when a language is selected
        fetchL4Options(selectedOption.value); // Fetch L2 options from API
      } else {
        setIsL4Disabled(true); // Disable L2 dropdown if no language is selected
        setL4Options([]); // Clear L2 options
      }
  };

  const handleL4Change = (selectedOption) => {
      setsearchIdVal(selectedOption);
  }

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
  
  // Search Hendle
  const handleSearch =() =>{
      const searchparm = { 
          'lang':searchLVal.value,
          'menuid':searchIdVal.value
      }
      setsearchparams(searchparm);
  }

  // Fetch menu content data
  const fetchMenuContent = async () => {
    try {
      console.log('search',searchParams);
      const response = await fetch(`${API_BASE_URL}/menucontent?language=&L1`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setmenuContentData(data.result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  useLayoutEffect(() => {
    fetchMenuContent();
  }, [searchParams,menuContentData]);

  // Handle form submit (Add or Edit)
  // const handleFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isEditing && currentMenu) {
  //     // Edit existing record
  //     console.log(formData);
  //     const updatedData = menuContentData.map((item) =>
  //       item.child_id === currentMenu.child_id
  //         ? {
  //             ...item,
  //             name: formData.name,
  //             data_content: contentData,
  //           }
  //         : item
  //     );
  //     saveMenuContent(updatedData)
  //   } else {
  //     // Add new record
  //     const newMenu = {
  //       child_id: menuContentData.length + 1,
  //       name: formData.name,
  //       data_content: contentData,
  //     };
  //     setmenuContentData([...menuContentData, newMenu]);
  //   }
  //   setShowModal(false);
  //   setFormData({ name: '', data_content: '' });
  //   setEditorValue('');
  //   setContentData('');
  // };

  // Handle edit operation
  const handleEdit = (child_id) => {
    const menuToEdit = menuContentData.find((item) => item.child_id === child_id);
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

  // // Handle delete operation
  // const confirmDelete = (child_id) => {
  //   if (window.confirm('Are you sure you want to delete this item?')) {
  //     const updatedData = menuContentData.filter((item) => item.child_id !== child_id);
  //     setmenuContentData(updatedData);
  //   }
  // };
  // Handle form submit (Add or Edit)
const handleFormSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  const payload = {
    language: searchLVal.value,
    name: formData.name,
    data_content: contentData,
    ParentID: searchIdVal.value,
    category: '',
    seq: '',
    stauts: '',
    content_description: '',
    content_creator: ''
  };

  if (isEditing && currentMenu) {
    // Update existing record (PUT)
    try {
      const response = await fetch(`${API_BASE_URL}/menucontent/${currentMenu.child_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          data_content: contentData
        })
      });

      if (response.ok) {
        const updatedData = menuContentData.map((item) =>
          item.child_id === currentMenu.child_id ? { ...item, ...payload } : item
        );
        setmenuContentData(updatedData);
      } else {
        console.error('Failed to update the menu content.');
      }
    } catch (error) {
      console.error('Error updating menu content:', error);
    }
  } else {
    // Add new record (POST)
    try {
      const response = await fetch(`${API_BASE_URL}/addMenuContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const newMenu = await response.json();
        setmenuContentData([...menuContentData, newMenu]);
      } else {
        console.error('Failed to add new menu content.');
      }
    } catch (error) {
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
      const response = await fetch(`${API_BASE_URL}/menucontent/${child_id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedData = menuContentData.filter((item) => item.child_id !== child_id);
        setmenuContentData(updatedData);
      } else {
        console.error('Failed to delete the menu content.');
      }
    } catch (error) {
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
          <button onClick={() => handleEdit(row.child_id)} className="rounded bg-primary px-2 py-1 text-white">
            Edit
          </button>
          <button onClick={() => confirmDelete(row.child_id)} className="rounded bg-red-500 px-2 py-1 text-white ml-2">
            Delete
          </button>
        </div>
      ),
      width:'150px'
    },
    { name: 'Language', selector: (row) => row.language, sortable: true,width:'150px',textAlign:'center'},
    { name: 'P ID', selector: (row) => row.parentid, sortable: true ,width:'90px'},
    { name: 'C ID', selector: (row) => row.child_id, sortable: true ,width:'90px'},
    { name: 'P Name', selector: (row) => row.parnt_name, sortable: true ,width:'150px'},
    { name: 'C Name', selector: (row) => row.child_name, sortable: true ,width:'150px'},
    { name: 'Status', selector: (row) => row.status, sortable: true ,width:'100px'},
    { name: 'Last M_Time', selector: (row) => row.last_modified_time, sortable: true ,width:'139px'},
    { name: 'C Creater', selector: (row) => row.content_creator, sortable: true ,width:'120px'},
    { name: 'C Description', selector: (row) => row.content_description, sortable: true ,width:'150px'},

  ];
  

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Menu Content Data Manager
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
            />
          </div>
        </div>

        <button className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded"
                onClick={handleSearch}
                >
          <span>Search</span>
          {/* <span>{isSearchMode ? 'Search' : 'Clear'}</span> */}
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setEditorValue('');
            setFormData({ name: '', data_content: '' });
            setShowModal(true);
          }}
          className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded"
        >
          <span>Add New</span>
          {/* <span>{isSearchMode ? 'Search' : 'Clear'}</span> */}
        </button>

        {/* <button onClick={() => setShowModal(true)} className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded ">AddNewRecord</button> */}
      </div>

      <div className="flex flex-col overflow-x-auto">
        {/* Data Table */}
      <div className="mt-4">
        <DataTable style={{width:'100%',fontSize:'20px'}}
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
                      <b>Menu Name</b>
                    </label>
                    <input
                      type="text"
                      className="w-full border px-3 py-2 rounded-md"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter Description"
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
    </div>
  );
};

export default MenuContentManager;