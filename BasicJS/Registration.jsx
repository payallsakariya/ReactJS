import React from 'react'

function Registration() {
  return (
    <div class="page-wrapper">
    <div class="content">
        <div class="flex justify-center py-8">
            <h4 class="text-2xl font-semibold">ADD Patient</h4>
        </div>
        <div class="flex justify-center">
            <div class="w-full max-w-lg">
                <form method="post">
                    <div class="flex flex-wrap -mx-2 mb-4">
                        <div class="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                            <label for="fname" class="block text-sm font-medium text-gray-700">First Name <span class="text-red-500">*</span></label>
                            <input class="form-input mt-1 block w-full" type="text" id="fname" name="fname" pattern="[A-Za-z]{1,32}" required />
                        </div>
                        <div class="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                            <label for="mname" class="block text-sm font-medium text-gray-700">Middle Name <span class="text-red-500">*</span></label>
                            <input class="form-input mt-1 block w-full" type="text" id="mname" name="mname" pattern="[a-z A-Z]{1,32}" required />
                        </div>
                        <div class="w-full sm:w-1/3 px-2">
                            <label for="lname" class="block text-sm font-medium text-gray-700">Last Name <span class="text-red-500">*</span></label>
                            <input class="form-input mt-1 block w-full" type="text" id="lname" name="lname" pattern="[a-z A-Z]{1,32}" required />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-2 mb-4">
                        <div class="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                            <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input type="text" class="form-input mt-1 block w-full" id="dob" name="dob" onchange="mydatepicker()" />
                        </div>
                        <div class="w-full sm:w-1/6 px-2 mb-4 sm:mb-0">
                            <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
                            <input class="form-input mt-1 block w-full" type="number" id="age" name="age" />
                        </div>
                        <div class="w-full sm:w-1/6 px-2">
                            <label for="ym" class="block text-sm font-medium text-gray-700">Year/Month</label>
                            <select class="form-select mt-1 block w-full" id="ym" name="ym">
                                <option value="Year">Year</option>
                                <option value="Month">Month</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-2 mb-4">
                        <div class="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                            <label for="phone" class="block text-sm font-medium text-gray-700">Phone <span class="text-red-500">*</span></label>
                            <input class="form-input mt-1 block w-full" type="text" id="phone" name="phone" pattern="[1-9]{1}[0-9]{9}" required />
                        </div>
                        <div class="w-full sm:w-1/2 px-2">
                            <label for="bloodgroup" class="block text-sm font-medium text-gray-700">Blood Group</label>
                            <select class="form-select mt-1 block w-full" id="bloodgroup" name="bloodgroup">
                                <option value="">Please Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-2 mb-4">
                        <div class="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                            <label for="gender" class="block text-sm font-medium text-gray-700">Gender <span class="text-red-500">*</span></label>
                            <div class="flex items-center mt-1">
                                <label class="inline-flex items-center mr-4">
                                    <input type="radio" class="form-radio" name="gender" id="gender" value="male" required />
                                    <span class="ml-2">Male</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" class="form-radio" name="gender" id="gender" value="female" />
                                    <span class="ml-2">Female</span>
                                </label>
                            </div>
                        </div>
                        <div class="w-full sm:w-1/2 px-2">
                            <label for="religion" class="block text-sm font-medium text-gray-700">Religion</label>
                            <input class="form-input mt-1 block w-full" type="text" id="religion" name="religion" pattern="[a-z A-Z]{1,32}" />
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-2 mb-4">
                        <div class="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                            <label for="postalcode" class="block text-sm font-medium text-gray-700">Postal Code</label>
                            <input class="form-input mt-1 block w-full" type="text" id="postalcode" name="postalcode" pattern="[0-9]{6}" />
                        </div>
                        <div class="w-full px-2">
                            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                            <textarea class="form-textarea mt-1 block w-full" id="address" name="address" pattern="[a-z A-Z]{1,50}" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-2 mb-4">
                        <div class="w-full px-2">
                            <label for="mhistory" class="block text-sm font-medium text-gray-700">Medical History</label>
                            <textarea class="form-textarea mt-1 block w-full" id="mhistory" name="mhistory" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="text-center mt-6">
                        <input type="submit" name="Submit" id="Submit" value="Create Patient" class="btn btn-primary submit-btn mx-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

  )
}

export default Registration