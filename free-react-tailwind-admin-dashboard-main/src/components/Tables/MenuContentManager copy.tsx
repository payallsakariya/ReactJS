import React, { useState } from 'react';

interface MenuContent {
  menu_id: number;
  name: string;
  data_content: string;
}

const MenuContentManager = () => {
  const [menuContentData, setMenuContentData] = useState<MenuContent[]>([
    { menu_id: 1, name: 'Sample Menu 1', data_content: 'Sample content 1' },
    { menu_id: 2, name: 'Sample Menu 2', data_content: 'Sample content 2' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuContent | null>(null);
  const [formData, setFormData] = useState({ name: '', data_content: '' });

  // Function to handle add or edit form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && currentMenu) {
      // Handle Edit
      const updatedData = menuContentData.map(item =>
        item.menu_id === currentMenu.menu_id
          ? { ...item, name: formData.name, data_content: formData.data_content }
          : item
      );
      setMenuContentData(updatedData);
    } else {
      // Handle Add
      const newMenu: MenuContent = {
        menu_id: menuContentData.length + 1, // Auto-increment ID for demo purpose
        name: formData.name,
        data_content: formData.data_content,
      };
      setMenuContentData([...menuContentData, newMenu]);
    }
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
      setMenuContentData(updatedData);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Menu Content Manager</h2>

      {/* Button to Add a New Record */}
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          setIsEditing(false);
          setFormData({ name: '', data_content: '' });
          setShowModal(true);
        }}
      >
        Add New Record
      </button>

      {/* Table Display */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">Menu ID</th>
            <th className="px-4 py-2 text-center">Name</th>
            <th className="px-4 py-2 text-center">Content</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuContentData.map(item => (
            <tr key={item.menu_id}>
              <td className="border px-4 py-2 text-center">{item.menu_id}</td>
              <td className="border px-4 py-2 text-center">{item.name}</td>
              <td className="border px-4 py-2 text-center">{item.data_content}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(item.menu_id)}
                  className="rounded bg-yellow-500 px-2 py-1 text-white mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(item.menu_id)}
                  className="rounded bg-red-500 px-2 py-1 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding or Editing a Record */}
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
                    placeholder="Enter Menu Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    <b>Data Content</b>
                  </label>
                  <textarea
                    className="w-full border px-3 py-2 rounded-md"
                    rows={10}
                    placeholder="Enter Content"
                    value={formData.data_content}
                    onChange={e => setFormData({ ...formData, data_content: e.target.value })}
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
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuContentManager;
