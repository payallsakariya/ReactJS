import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const languageOptions = [
  { value: 'H', label: 'Hindi' },
  { value: 'E', label: 'English' },
  { value: 'G', label: 'Gujarati' },
];

const MenuContentManager = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [l1Options, setL1Options] = useState([]);
  const [isL1Disabled, setIsL1Disabled] = useState(true);
  const [selectedL1, setSelectedL1] = useState(null);

  // Handle language selection
  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setSelectedL1(null); // Reset L1 selection when language changes
    if (selectedOption) {
      setIsL1Disabled(false); // Enable L1 dropdown when a language is selected
      fetchL1Options(selectedOption.value); // Fetch L1 options from API
    } else {
      setIsL1Disabled(true); // Disable L1 dropdown if no language is selected
      setL1Options([]); // Clear L1 options
    }
  };

  // Fetch L1 options using fetch() based on the selected language
  const fetchL1Options = async (language) => {
    try {
      const response = await fetch(
        `https://hitvaniapp.excellcons.com/api/languageget/${language}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        const options = data.map((option) => ({
          value: option.menu_id,
          label: option.name,
        }));
        console.log(options); // Ensure options is correctly formatted
        setL1Options(options); // This should update the state
      } else {
        throw new Error('Expected JSON response but received something else');
      }
    } catch (error) {
      console.error('Error fetching L1 options:', error);
    }
  };

  // Handle L1 selection (if needed for further logic)
  const handleL1Change = (selectedOption) => {
    setSelectedL1(selectedOption);
  };

  const [contentData, setContentData] = useState('');
  const [editorValue, setEditorValue] = useState('');

  const [menuContentData, setmenuContentData] = useState([
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
      data_content: 'This is sample data content',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [formData, setFormData] = useState({ name: '', data_content: '' });
  // Function to handle add or edit form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(contentData);

    if (isEditing && currentMenu) {
      // Handle Edit
      const updatedData = menuContentData.map((item) =>
        item.menu_id === currentMenu.menu_id
          ? {
              ...item,
              language: 'H',
              parent_menu_id: 2,
              child_menu_id: 12,
              parent_name: 'acb',
              name: formData.name,
              status: 'A',
              category: 'dsad',
              content_creator: 'dsad',
              data_content: contentData,
            }
          : item,
      );
      setmenuContentData(updatedData);
    } else {
      // Handle Add
      const newMenu = {
        menu_id: menuContentData.length + 1, // Auto-increment ID for demo purpose
        language: 'H',
        parent_menu_id: 2,
        child_menu_id: 12,
        parent_name: 'abc',
        name: formData.name,
        status: 'A',
        category: 'NULL',
        content_creator: 'abc',
        data_content: contentData,
      };
      setmenuContentData([...menuContentData, newMenu]);
    }

    setEditorValue('');
    setContentData('');
    setShowModal(false); // Close modal
  };

  useEffect(() => {
    console.log(menuContentData);
  }, [menuContentData]);

  // Function to handle edit operation
  const handleEdit = (menu_id) => {
    const menuToEdit = menuContentData.find((item) => item.menu_id === menu_id);
    if (menuToEdit) {
      setIsEditing(true);
      setCurrentMenu(menuToEdit);
      setFormData({
        name: menuToEdit.name,
        data_content: menuToEdit.data_content,
      });
      setShowModal(true);
      setEditorValue(menuToEdit.data_content);
    }
  };

  // Function to handle delete operation
  const confirmDelete = (menu_id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = menuContentData.filter(
        (item) => item.menu_id !== menu_id,
      );
      setmenuContentData(updatedData);
    }
  };

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
              placeholder="All"
              className="react-select-container w-[135px] z-50"
              classNamePrefix="react-select"
              onChange={handleLanguageChange} // Set the selected language
              value={selectedLanguage} // Bind selected language
            />
          </div>

          {/* L1 Select */}
          <div className="font-medium mb-1">L1</div>
          <div>
            <Select
              placeholder="All"
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

        <button className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded">
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
          <span>AddNewRecord</span>
          {/* <span>{isSearchMode ? 'Search' : 'Clear'}</span> */}
        </button>

        {/* <button onClick={() => setShowModal(true)} className="w-32 h-9.5 mt-7 font-semibold flex items-center justify-center space-x-2 gap-3  bg-primary text-white px-4 py-2 rounded ">AddNewRecord</button> */}
      </div>

      <div className="flex flex-col overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 rounded-sm bg-gray-200 dark:bg-meta-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Language
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              P ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              C ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              P Name
            </h5>
          </div>
          <div className="hidden sm:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              C Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden lg:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="hidden lg:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ContentCreater
            </h5>
          </div>
        </div>

        {/* Data Rows */}
        {menuContentData.map((item, index) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 ${
              index === menuContentData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={item.menu_id}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button
                onClick={() => handleEdit(item.menu_id)}
                className="rounded bg-primary px-2 py-1 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(item.menu_id)}
                className="rounded bg-red-500 px-2 py-1 text-white ml-2"
              >
                Delete
              </button>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.language}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {item.parent_menu_id}
              </p>
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
              <p className="text-black dark:text-white">
                {item.content_creator}
              </p>
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
                    {/* <textarea className="w-full border px-3 py-2 rounded-md" 
                           rows={1}
                           value={formData.data_content}
                           onChange={e => setFormData({ ...formData, data_content: e.target.value })}       
                           ></textarea> */}
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
