import React, { useState } from 'react';

const ContentMediaTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const ContentMediadata = [
    { cm_id: 1, menu_id: '10', type: 'v', media_link: 'http://google.com', media_desc: '', status: 'A', detail: 'detail', album: 'album', photo_link: 'photo_link' },
    { cm_id: 2, menu_id: '10', type: 'v', media_link: 'http://google.com', media_desc: '', status: 'A', detail: 'detail', album: 'album', photo_link: 'photo_link' },
    { cm_id: 3, menu_id: '10', type: 'v', media_link: 'http://google.com', media_desc: '', status: 'A', detail: 'detail', album: 'album', photo_link: 'photo_link' },
  ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold text-black dark:text-white">Content Media Manager</h4>
        <button onClick={() => setShowModal(true)} className="rounded bg-primary px-4 py-2 text-white">
          Add New
        </button>
      </div>

      <div className="flex flex-col overflow-x-auto">
        {/* Table Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 rounded-sm bg-gray-200 dark:bg-meta-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Menu Id</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Media Desc</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Media Link</h5>
          </div>
          <div className="hidden sm:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Type</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
          </div>
          <div className="hidden lg:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Detail</h5>
          </div>
          <div className="hidden lg:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Album</h5>
          </div>
          <div className="hidden xl:block p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Photo Link</h5>
          </div>
        </div>

        {/* Data Rows */}
        {ContentMediadata.map((item, index) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 ${
              index === ContentMediadata.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={item.cm_id}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button className="rounded bg-primary px-2 py-1 text-white">Edit</button>
              <button className="rounded bg-red-500 px-2 py-1 text-white ml-2">Delete</button>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.menu_id}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.media_desc}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.media_link}</p>
            </div>
            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.type}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.status}</p>
            </div>
            <div className="hidden lg:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.detail}</p>
            </div>
            <div className="hidden lg:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.album}</p>
            </div>
            <div className="hidden xl:flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.photo_link}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding a New Record */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Add New Media Record</h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Media Link</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" placeholder="Enter Media Link" />
                </div>
                <div>
                  <label className="block mb-2">Media Description</label>
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
