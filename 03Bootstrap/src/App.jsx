import React from 'react'

const shoot = ()=>{
    return ("heloo")
}

const App = () => {
  return (
    
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-12 text-center mb-4">
            <h4 className="display-6">ADD Patient</h4>
        </div>
        <div className="col-lg-8">
            <form method="post" action=''>
                <div className="row g-3 mb-3">
                    <div className="col-sm-4">
                        <label className="form-label">First Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="fname" name="fname" pattern="[A-Za-z]{1,32}" required />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Middle Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="mname" name="mname" pattern="[a-zA-Z]{1,32}" required />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Last Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="lname" name="lname" pattern="[a-zA-Z]{1,32}" required />
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-sm-4">
                        <label className="form-label">Date of Birth</label>
                        <input type="text" className="form-control" id="dob" name="dob"  />
                    </div>
                    <div className="col-sm-2">
                        <label className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" name="age" />
                    </div>
                    <div className="col-sm-2">
                        <label className="form-label">Year/Month</label>
                        <select className="form-select" id="ym" name="ym">
                            <option value="Year">Year</option>
                            <option value="Month">Month</option>
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Phone <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="phone" name="phone" pattern="[1-9]{1}[0-9]{9}" required />
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-sm-4">
                        <label className="form-label">Blood Group</label>
                        <select className="form-select" id="bloodgroup" name="bloodgroup">
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
                    <div className="col-sm-4">
                        <label className="form-label">Religion</label>
                        <input type="text" className="form-control" id="religion" name="religion" pattern="[a-zA-Z]{1,32}" />
                    </div>
                    <div className="col-sm-4">
                        <label className="form-label">Postal Code</label>
                        <input type="text" className="form-control" id="postalcode" name="postalcode" pattern="[0-9]{6}" />
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-sm-6">
                        <label className="form-label">Gender <span className="text-danger">*</span></label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="gender-male" value="male" required />
                            <label className="form-check-label" for="gender-male">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="gender-female" value="female" />
                            <label className="form-check-label" for="gender-female">
                                Female
                            </label>
                        </div>
                    </div>
                   
                </div>
                <div className="row g-3 mb-3">
                    
                    <div className="col-sm-12">
                        <label className="form-label">Address</label>
                        <textarea className="form-control" id="address" name="address" pattern="[a-zA-Z]{1,50}" rows="3"></textarea>
                    </div>
                </div>
                <div className="row g-3 mb-3">
                    <div className="col-sm-12">
                        <label className="form-label">Medical History</label>
                        <textarea className="form-control" id="mhistory" name="mhistory" rows="3"></textarea>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <input type="submit" name="Submit" id="Submit" value="Create Patient" className="btn btn-primary" />
                </div>
            </form>
        </div>
    </div>
</div>

  )
}

export default App