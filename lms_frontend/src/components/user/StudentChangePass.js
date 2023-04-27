// import { Link } from "react-router-dom";
// import MyCourses from './StudentCourses'
import StudentSidebar from "./StudentSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentChangePassword(){
    const [StudentPass, setStudentPass] = ({
        'password': '',
    })
    const studentId = localStorage.getItem('studentId')

    // change element value
    const handleChange=(event) =>{
        setStudentPass({
            ...StudentPass,
            [event.target.name]:event.target.value
        });
    }

    //Submit Form
    const submitForm=()=>{
        const studentFormData = new FormData();
        studentFormData.append('password', StudentPass.password)

        try{

        }catch(error){
            
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <StudentSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                            Must be 8-20 characters long.
                            </span>
                        </div>
                    </div>
                    <hr></hr>
                    <button type="submit" className="btn btn-primary">Update</button>
                </section>
            </div>
        </div>
    );
}

export default StudentChangePassword;