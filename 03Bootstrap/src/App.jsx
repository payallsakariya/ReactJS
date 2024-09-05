import React from 'react'

const App = () => {
  return (
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-12 text-center mb-4">
            <h4 class="display-6">ADD Patient</h4>
        </div>
        <div class="col-lg-8">
            <form method="post">
                <div class="row g-3 mb-3">
                    <div class="col-sm-4">
                        <label for="fname" class="form-label">First Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="fname" name="fname" pattern="[A-Za-z]{1,32}" required />
                    </div>
                    <div class="col-sm-4">
                        <label for="mname" class="form-label">Middle Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="mname" name="mname" pattern="[a-zA-Z]{1,32}" required />
                    </div>
                    <div class="col-sm-4">
                        <label for="lname" class="form-label">Last Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="lname" name="lname" pattern="[a-zA-Z]{1,32}" required />
                    </div>
                </div>
                <div class="row g-3 mb-3">
                    <div class="col-sm-4">
                        <label for="dob" class="form-label">Date of Birth</label>
                        <input type="text" class="form-control" id="dob" name="dob" onchange="mydatepicker()" />
                    </div>
                    <div class="col-sm-2">
                        <label for="age" class="form-label">Age</label>
                        <input type="number" class="form-control" id="age" name="age" />
                    </div>
                    <div class="col-sm-2">
                        <label for="ym" class="form-label">Year/Month</label>
                        <select class="form-select" id="ym" name="ym">
                            <option value="Year">Year</option>
                            <option value="Month">Month</option>
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <label for="phone" class="form-label">Phone <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="phone" name="phone" pattern="[1-9]{1}[0-9]{9}" required />
                    </div>
                </div>
                <div class="row g-3 mb-3">
                    <div class="col-sm-4">
                        <label for="bloodgroup" class="form-label">Blood Group</label>
                        <select class="form-select" id="bloodgroup" name="bloodgroup">
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
                    <div class="col-sm-4">
                        <label for="religion" class="form-label">Religion</label>
                        <input type="text" class="form-control" id="religion" name="religion" pattern="[a-zA-Z]{1,32}" />
                    </div>
                    <div class="col-sm-4">
                        <label for="postalcode" class="form-label">Postal Code</label>
                        <input type="text" class="form-control" id="postalcode" name="postalcode" pattern="[0-9]{6}" />
                    </div>
                </div>
                <div class="row g-3 mb-3">
                    <div class="col-sm-6">
                        <label for="gender" class="form-label">Gender <span class="text-danger">*</span></label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gender" id="gender-male" value="male" required />
                            <label class="form-check-label" for="gender-male">
                                Male
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gender" id="gender-female" value="female" />
                            <label class="form-check-label" for="gender-female">
                                Female
                            </label>
                        </div>
                    </div>
                   
                </div>
                <div class="row g-3 mb-3">
                    
                    <div class="col-sm-12">
                        <label for="address" class="form-label">Address</label>
                        <textarea class="form-control" id="address" name="address" pattern="[a-zA-Z]{1,50}" rows="3"></textarea>
                    </div>
                </div>
                <div class="row g-3 mb-3">
                    <div class="col-sm-12">
                        <label for="mhistory" class="form-label">Medical History</label>
                        <textarea class="form-control" id="mhistory" name="mhistory" rows="3"></textarea>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <input type="submit" name="Submit" id="Submit" value="Create Patient" class="btn btn-primary" />
                </div>
            </form>
        </div>
    </div>
</div>

  )
}

export default App