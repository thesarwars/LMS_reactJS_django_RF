// import { Link } from "react-router-dom";
// import MyStudents from './teacher/MyStudents'
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';


function TeacherChangePassword(){
    const [TeacherPass, setTeacherPass] = useState({
        'password': '',
    })
    const teacherId = localStorage.getItem('teacherId')

    // change element value
    const handleChange=(event) =>{
        setTeacherPass({
            ...TeacherPass,
            [event.target.name]:event.target.value
        });
    }

    //Submit Form
    const submitForm=(event)=>{
        event.preventDefault();
        const teacherFormData = new FormData();
        teacherFormData.append('password', TeacherPass.password)

        try{
            axios.post(baseUrl + '/teacher/change-pass/'+teacherId+'/', teacherFormData,{
                
            }).then((response)=>{
                if(response.status==200){
                    // alert('changed!!')
                    window.location.href='/teacher-logout'
                }else{
                    alert('Oops..Something went wrong!!')
                }
            })

        }catch(error){
            console.log(error)
            setTeacherPass({'status': error})
        }
    }

    useEffect(()=>{
        document.title="Teacher change password"
    })

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus !== 'true'){
        window.location.href = '/teacher-login'
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" name="password" id="inputPassword6" value={TeacherPass.password} onChange={handleChange} className="form-control" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                            Must be 8-20 characters long.
                            </span>
                        </div>
                    </div>
                    <hr></hr>
                    <button type="submit" onClick={submitForm} className="btn btn-primary">Update</button>
                </section>
            </div>
        </div>
    );
}

export default TeacherChangePassword;