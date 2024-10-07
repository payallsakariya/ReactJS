import React, { useState } from 'react';

const AppVersionTab = () => {

  const [showUpdateModal, setshowUpdateModal] = useState(false);

  // Mock Data for design visualization
  const mockData = [
    { versionid: 1, version_name: 'Version 1', version: '1.0.0', createdtime: '2024-09-01', modifiedtime: '2024-09-10', deleted: 0 },
   ];

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">App Version Master</h4>

      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Update</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Version ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Version Name</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Version</h5>
          </div>
          <div className="p-2.5 hidden text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Created Time</h5>
          </div>
          <div className="p-2.5 hidden text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Modified Time</h5>
          </div>
        </div>

        {/* Mock Data Rows */}
        {mockData.map((item, index) => (
          <div
            className={`grid grid-cols-6 ${
              index === mockData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={item.versionid}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <button className="rounded bg-primary px-2 py-1 text-white" onClick={() => setshowUpdateModal(true)}>
                Update
              </button>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.versionid}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.version_name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.version}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.createdtime}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.modifiedtime}</p>
            </div>
          </div>
        ))}

          {/* Modal for Adding a New Record */}
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">Update App Version </h3>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Version Name</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block mb-2">Version</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block mb-2">Deleted</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" disabled />
                </div>
                <div>
                  <label className="block mb-2">Createdtime</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" disabled />
                </div>
                <div>
                  <label className="block mb-2">Modifiedtime</label>
                  <input type="text" className="w-full border px-3 py-2 rounded-md" disabled />
                </div>
                <div>
                  <input type="hidden" className="w-full border px-3 py-2 rounded-md" name='versionid' value={2} />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => setshowUpdateModal(false)}>Cancel</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md">Save</button>
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
