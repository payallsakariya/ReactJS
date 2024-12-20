import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react';
import Select from 'react-select';

interface MenuContent {
    menu_id: number;
    language: string;
    parent_menu_id: number; // Correct semicolon
    child_menu_id: number;  // Added this property
    parent_name: string;
    name: string;
    status: string;
    category: string;
    content_creator: string;
    data_content: string;
  }
  

const MenuContentManager = () => {

  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  
  const [menuContentData, setmenuContentData] = useState<MenuContent[]>([
    {
      menu_id: 1,
      language: 'E',
      parent_menu_id: 0,
      child_menu_id: 2,
      parent_name: 'Root',
      name: 'Sample Menu 1',
      status: 'A',
      category: 'Main',
      content_creator: 'Admin',
      data_content: 'This is sample data content'
    },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuContent | null>(null);
  const [formData, setFormData] = useState({ name: '', data_content: '' });
   // Function to handle add or edit form submission
   const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editorRef.current) {
      setContent(editorRef.current.getContent()); // Get editor content when button is clicked
      console.log(
          "Editor content on button click:",
          editorRef.current.getContent()
          
      ); // Log content
      setContent(editorRef.current.getContent());
  }
    if (isEditing && currentMenu) {
      // Handle Edit
      const updatedData = menuContentData.map(item =>
        item.menu_id === currentMenu.menu_id
          ? { ...item, language: 'H',
                       parent_menu_id: 2,
                       child_menu_id: 12,
                       parent_name: 'acb',
                       name: formData.name,
                       status: 'A',
                       category: 'dsad',
                       content_creator: 'dsad',
                       data_content: content }
          : item
      );
      setmenuContentData(updatedData);
    } else {
      // Handle Add
      const newMenu: MenuContent = {
        menu_id: menuContentData.length + 1, // Auto-increment ID for demo purpose
        language: 'H',
        parent_menu_id: 2,
        child_menu_id: 12,
        parent_name: 'abc',
        name: formData.name,
        status: 'A',
        category: 'NULL',
        content_creator: 'abc',
        data_content: content,
      };
      setmenuContentData([...menuContentData, newMenu]);
    }
    setContent("");
    setShowModal(false); // Close modal
  };

  // Function to handle edit operation
  const handleEdit = (menu_id: number) => {
    const menuToEdit = menuContentData.find(item => item.menu_id === menu_id);
    if (menuToEdit) {
      setIsEditing(true);
      setCurrentMenu(menuToEdit);
      setFormData({ name: menuToEdit.name, data_content: menuToEdit.data_content });
      setShowModal(true);
    }
  };

  // Function to handle delete operation
  const confirmDelete = (menu_id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = menuContentData.filter(item => item.menu_id !== menu_id);
      setmenuContentData(updatedData);
    }
  };


  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">Menu Content Data Manager</h4>
      </div>
       <div className="py-4 flex gap-5">
          <div>
              <div className="font-medium mb-1">Language</div>
              <div>
                  <Select

                      placeholder="All"
                      className="react-select-container w-[135px] z-50"
                      classNamePrefix="react-select"
                    
                  />
              </div>
          </div>
          <div>
              <div className="font-medium mb-1">L1</div>
              <div>
                  <Select
                      placeholder="All"
                      className="react-select-container w-[135px] z-40"
                      classNamePrefix="react-select" 
                  />
                  
              </div>
          </div>
          <div>
              <div className="font-medium mb-1">L2</div>
              <div>
                  <Select
                      placeholder="All"
                      className="react-select-container w-[135px] z-40"
                      classNamePrefix="react-select" 
                  />
                  
              </div>
          </div>
          <div>
              <div className="font-medium mb-1.5">L3</div>
              <div>
                  <Select
                      placeholder="All"
                      className="react-select-container w-[135px] z-40"
                      classNamePrefix="react-select" 
                  />
                  
              </div>
          </div>
          <div>
              <div className="font-medium mb-1.5">L4</div>
              <div>
                  <Select
                      placeholder="All"
                      className="react-select-container w-[135px] z-40"
                      classNamePrefix="react-select" 
                  />
                  
              </div>
          </div>
          
          <button
              className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded"
                  
          >
              
              <span>Search</span>
              {/* <span>{isSearchMode ? 'Search' : 'Clear'}</span> */}
          </button>
          <button
              onClick={() => {
                setIsEditing(false);
                setFormData({ name: '', data_content: '' });
                setShowModal(true);
                }}
              className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded"
                  
          >
              <span>AddNewRecord</span>
              {/* <span>{isSearchMode ? 'Search' : 'Clear'}</span> */}
          </button>

          {/* <button onClick={() => setShowModal(true)} className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded ">AddNewRecord</button> */}
        </div>

     

      <div className="flex flex-col overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 rounded-sm bg-gray-200 dark:bg-meta-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Language</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">P ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">C ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">P Name</h5>
          </div>
          <div className="hidden sm:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">C Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
          </div>
          <div className="hidden lg:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Category</h5>
          </div>
          <div className="hidden lg:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ContentCreater</h5>
          </div>
        </div>

        {/* Data Rows */}
        {menuContentData.map((item, index) => (
  <div
    className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 ${index === menuContentData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`}
    key={item.menu_id}
  >
    <div className="flex items-center justify-center p-2.5 xl:p-5">
      <button  onClick={() => handleEdit(item.menu_id)} 
              className="rounded bg-primary px-2 py-1 text-white">Edit</button>
      <button onClick={() => confirmDelete(item.menu_id)}
              className="rounded bg-red-500 px-2 py-1 text-white ml-2">Delete</button>
    </div>

    <div className="flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.language}</p>
    </div>
    <div className="flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.parent_menu_id}</p>
    </div>
    <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.child_menu_id}</p>
    </div>
    <div className="flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.parent_name}</p>
    </div>
    <div className="hidden lg:flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.name}</p>
    </div>
    <div className="hidden lg:flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.status}</p>
    </div>
    <div className="hidden lg:flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.category}</p>
    </div>
    <div className="hidden xl:flex items-center justify-center p-2.5 xl:p-5">
      <p className="text-black dark:text-white">{item.content_creator}</p>
    </div>
  </div>
))}





     {/* Modal for Adding a New Record */}
     {showModal && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
         <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-lg">
           <h3 className="text-xl mb-4">
           <b>{isEditing ? 'Edit' : 'Add New'} Menu Content Record</b>
           </h3>
           <form onSubmit={handleFormSubmit} >
             <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
               <div>
                 <label className="block mb-2"><b>Menu Name</b></label>
                 <input type="text" 
                        className="w-full border px-3 py-2 rounded-md" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter Description" />
               </div>
               <div>
                 <label className="block mb-2"><b>Data Content</b></label>
                 {/* <textarea className="w-full border px-3 py-2 rounded-md" 
                           rows={1}
                           value={formData.data_content}
                           onChange={e => setFormData({ ...formData, data_content: e.target.value })}       
                           ></textarea> */}
                    <Editor 
                    value={content}
                    //onChange={e => setFormData({ ...formData, data_content: e.target.value })}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
                    init={{
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                        tinycomments_mode: "embedded",
                    }}
                    />       
               </div>
               
             </div>
             <div className="flex justify-end mt-4">
               <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => setShowModal(false)}>Cancel</button>
               <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
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






import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Select from 'react-select';

const languageOptions = [
  { value: 'H', label: 'Hindi' },
  { value: 'E', label: 'English' },
  { value: 'G', label: 'Gujarati' },
];

const MenuContentManager = () => {
  
  // const [showModal, setShowModal] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [currentMenu, setCurrentMenu] = useState(null);
  // const [formData, setFormData] = useState({ name: '', data_content: '' });
  // const [contentData, setContentData] = useState('');
  // const [editorValue, setEditorValue] = useState('');

  const [searchLVal, setsearchLVal] = useState('');
  const [searchIdVal, setsearchIdVal] = useState('');

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
    console.log('shvdhva');
      console.log(searchLVal);
      console.log(searchIdVal);
  }

  // const [menuContentData, setmenuContentData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [formData, setFormData] = useState({ name: '', data_content: '' });
  const [contentData, setContentData] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [menuContentData, setmenuContentData] = useState([]);

  // Fetch menu content data
  const fetchMenuContent = async () => {
    try {
      const response = await fetch(
        'https://hitvaniapp.excellcons.com/api/menucontent?language=&L1='
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setmenuContentData(data.result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchMenuContent();
  }, []);

  // Handle form submit (Add or Edit)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentMenu) {
      // Edit existing record
      const updatedData = menuContentData.map((item) =>
        item.menu_id === currentMenu.menu_id
          ? {
              ...item,
              name: formData.name,
              data_content: contentData,
            }
          : item
      );
      setmenuContentData(updatedData);
    } else {
      // Add new record
      const newMenu = {
        menu_id: menuContentData.length + 1,
        name: formData.name,
        data_content: contentData,
      };
      setmenuContentData([...menuContentData, newMenu]);
    }
    setShowModal(false);
    setFormData({ name: '', data_content: '' });
    setEditorValue('');
    setContentData('');
  };

  // Handle edit operation
  const handleEdit = (child_id) => {
    const menuToEdit = menuContentData.find((item) => item.child_id === child_id);
    if (menuToEdit) {
      setIsEditing(true);
      setCurrentMenu(menuToEdit);
      setFormData({
        name: menuToEdit.name,
        data_content: menuToEdit.data_content,
      });
      setEditorValue(menuToEdit.data_content);
      setShowModal(true);
    }
  };

  // Handle delete operation
  const confirmDelete = (menu_id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = menuContentData.filter((item) => item.menu_id !== menu_id);
      setmenuContentData(updatedData);
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
          <button onClick={() => confirmDelete(row.menu_id)} className="rounded bg-red-500 px-2 py-1 text-white ml-2">
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
