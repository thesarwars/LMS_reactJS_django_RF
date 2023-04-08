// import { Link } from "react-router-dom";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl = "http://127.0.0.1:8000/apiview";


function Login() {
    const [StudentLoginData, setStudentLoginData] = useState({
            'email': '',
            'password': '',
    })

    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = ((event) => {
        setStudentLoginData({
            ...StudentLoginData,
            [event.target.name]:event.target.value
        });
    });

    const submitForm = (event) =>{
        event.preventDefault();
        const studentFormData = new FormData();
        studentFormData.append('email', StudentLoginData.email)
        studentFormData.append('password', StudentLoginData.password)

        try{
            axios.post(baseUrl + '/student-login', studentFormData)
            .then((res) => {
                if(res.data.bool === true){
                    localStorage.setItem('studentLoginStatus', true);
                    localStorage.setItem('studentId', res.data.student_id);
                    window.location.href = '/user-dashboard'
                }
                else{
                    seterrorMsg("Email or Password wrong!!")
                }

        });
        }catch(error){
            console.log(error);
        }
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus === 'true'){
        window.location.href = '/user-dashboard'
    }

    useEffect(() => {
        document.title = 'Student Login'
    });


    return(
        <div className="container mt-4">
            <div className="col-6 offset-3">
                <div className="card">
                    <h5 className="card-header">User Login</h5>
                    <div className="card-body">
                    {errorMsg && <p className="text-danger">{errorMsg}</p>}
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" name="email" value={StudentLoginData.email} onChange={handleChange} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name="password" value={StudentLoginData.password} onChange={handleChange} className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                        </div>
                        <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;