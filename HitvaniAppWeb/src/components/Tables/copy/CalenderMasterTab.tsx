import React, { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import DataTable from 'react-data-table-component';

const CalenderMasterTab = () => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Day Options Based on Language Code
const dayOptions = {
  H: ['सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार'],
  G: ['સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર', 'રવિવાર'],
  E: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

  // Function to handle language and reset day options if needed
  const handleLanguageChange = (langCode) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      lang: langCode,
      day: '', // Reset day when language changes
    }));
  };

  const [isEditing, setIsEditing] = useState(false);
  const [currentMedia, setcurrentMedia] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    lang: '',
    month: '',
    tithi: '',
    flag: '',
    ndate: '',
    day: '',
    desc: '',
  });

  const [loading, setLoading] = useState(true);
  const [calenderContentData, setCalenderContentData] = useState([]);

  // Base URL from .env file
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle form submit (Add or Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      lang: formData.lang,
      month: formData.month,
      tithi: formData.tithi,
      flag: formData.flag,
      ndate: formData.ndate,
      day: formData.day,
      desc: formData.desc,
    };

    try {
      if (isEditing && currentMedia) {
        // Update existing record (PUT)
        const response = await fetch(
          `${API_BASE_URL}/calender/${currentMedia.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          },
        );

        if (response.ok) {
          fetchCalenderContent();
        } else {
          console.error('Failed to update the calendar content.');
        }
      } else {
        // Add new record (POST)
        const response = await fetch(`${API_BASE_URL}/calender`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          fetchCalenderContent();
        } else {
          console.error('Failed to add new calendar content.');
        }
      }
    } catch (error) {
      console.error('Error in calendar content operation:', error);
    }

    setShowModal(false);
    setIsEditing(false);
    setFormData({
      id: '',
      lang: '',
      month: '',
      tithi: '',
      flag: '',
      ndate: '',
      day: '',
      desc: '',
    });
  };

  // Handle Edit
  const handleEdit = (id) => {
    const menuToEdit = calenderContentData.find((item) => item.id === id);

    if (menuToEdit) {
      setIsEditing(true);
      setcurrentMedia(menuToEdit);

      setFormData({
        id: menuToEdit.id,
        lang: menuToEdit.lang,
        month: menuToEdit.month || '',
        tithi: menuToEdit.tithi || '',
        flag: menuToEdit.flag || '',
        ndate: menuToEdit.ndate,
        day: menuToEdit.day || '',
        desc: menuToEdit.desc || '',
      });

      setShowModal(true);
    } else {
      console.warn('menuToEdit not found for id:', id);
    }
  };

  // Handle delete operation
  const confirmDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/calender/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchCalenderContent();
        } else {
          console.error('Failed to delete the Calender content.');
        }
      } catch (error) {
        console.error('Error deleting Calender content:', error);
      }
    }
  };

  // Fetch menu content data with search parameters
  const fetchCalenderContent = async () => {
    try {
      setLoading(true); // Show loader while fetching

      // Build the query string with the search parameters
      const response = await fetch(`${API_BASE_URL}/calender`);
      if (!response.ok) {
        setCalenderContentData([]);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCalenderContentData(data.result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalenderContent();
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
            onClick={() => handleEdit(row.id)}
            className="rounded bg-primary px-2 py-1 text-white"
          >
            Edit
          </button>
          <button
            onClick={() => confirmDelete(row.id)}
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
      selector: (row: any) => row.lang,
      sortable: true,
      width: '130px',
      textAlign: 'center',
    },
    {
      name: 'Month',
      selector: (row: any) => row.month,
      sortable: true,
      width: '10px',
    },
    {
      name: 'Tithi',
      selector: (row: any) => row.tithi,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Flag',
      selector: (row: any) => row.flag,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Date',
      selector: (row: any) => row.ndate,
      // selector: (row: any) => (row.status == 1 ? 'A' : 'UA'),
      sortable: true,
      width: '100px',
    },
    {
      name: 'Day',
      selector: (row: any) => row.day,
      width: '90px',
    },
    {
      name: 'Description',
      selector: (row: any) => row.desc,
      width: '500px',
    },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Calendar Master
        </h4>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => {
            setIsEditing(false);
            setFormData({
              id: '',
              lang: '',
              month: '',
              tithi: '',
              flag: '',
              ndate: '',
              day: '',
              desc: '',
            });
            setShowModal(true);
          }}
        >
          Add New Record
        </button>
      </div>

      {loading ? (
        <Loader /> // Your defined loader component
      ) : (
        <div className="flex flex-col overflow-x-auto">
          {/* Data Table */}
          <div className="mt-4">
            <DataTable
              style={{ width: '100%', fontSize: '20px' }}
              columns={columns}
              data={calenderContentData}
              customStyles={customStyles}
              pagination
              highlightOnHover
            />
          </div>

          {/* Modal for Adding a New Record */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg">
                <h3 className="text-xl mb-4">
                  {isEditing ? 'Edit' : 'Add New'} Calendar Record
                </h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">Language</label>
                      <select
                        className="w-full border px-3 py-2 rounded-md"
                        value={formData.lang}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                      >
                        <option value="">Select Language</option>
                        <option value="H">Hindi</option>
                        <option value="G">Gujarati</option>
                        <option value="E">English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2">Month</label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Enter Month"
                        value={formData.month}
                        onChange={(e) =>
                          setFormData({ ...formData, month: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Tithi</label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Enter Tithi"
                        value={formData.tithi}
                        onChange={(e) =>
                          setFormData({ ...formData, tithi: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Flag</label>
                      <select
                        className="w-full border px-3 py-2 rounded-md"
                        value={formData.flag}
                        onChange={(e) =>
                          setFormData({ ...formData, flag: e.target.value })
                        }
                      >
                        <option value="">Select Flag</option>
                        <option value="DA">DA</option>
                        <option value="P">P</option>
                        <option value="AM">AM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2">Date</label>
                      <input
                        type="date"
                        className="w-full border px-3 py-2 rounded-md"
                        value={formData.ndate}
                        onChange={(e) =>
                          setFormData({ ...formData, ndate: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Day</label>
                      <select
                        className="w-full border px-3 py-2 rounded-md"
                        value={formData.day}
                        onChange={(e) =>
                          setFormData({ ...formData, day: e.target.value })
                        }
                      >
                        <option value="">Select Day</option>
                        {dayOptions[formData.lang]?.map((day, index) => (
                          <option key={index} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-2">Description</label>
                      <textarea
                        className="w-full border px-3 py-2 rounded-md"
                        rows={3}
                        value={formData.desc}
                        onChange={(e) =>
                          setFormData({ ...formData, desc: e.target.value })
                        }
                      ></textarea>
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
  );
};

export default CalenderMasterTab;
