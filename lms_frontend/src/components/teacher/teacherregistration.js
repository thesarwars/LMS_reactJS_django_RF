import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/apiview/teacher/";

function TeacherRegistration() {
    const [teacherData, setteacherData] = useState({
        "full_name": "",
        "email": "",
        "password": "",
        "qualification": "",
        "phone_no": "",
        "skills": "",
        "status": "",
    });

    // change element value
    const handleChange = (event) => {
        // console.log(event.target.name, event.target.value)
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
    }
    // end

    // submit form

    const submitForm=(event)=>{
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("phone_no", teacherData.phone_no)
        teacherFormData.append("skills", teacherData.skills)


        try{
            axios.post(baseUrl, teacherFormData).then((response)=>{
                console.log(response);
            });
        }catch(error){
            console.log(error);
        }
    };
    // End

    // useEffect(() => {
    //     document.title = "Teacher Registrations"

    // });

    return(
        <div className="container mt-4">
            <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">Teacher Registration</h5>
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Full Name</label>
                                <input onChange={handleChange} name="full_name" type="text" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                <input onChange={handleChange} name="email" type="email" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Password</label>
                                <input onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Qualification</label>
                                <input onChange={handleChange} name="qualification" type="text" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Phone no</label>
                                <input onChange={handleChange} name="phone_no" type="number" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Skills</label>
                                <textarea onChange={handleChange} name="skills" className="form-control"></textarea>
                                <div id="emailHelp" className="form-text">Ex: Python, Django, JavaScript</div>
                            </div>
                            <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegistration;