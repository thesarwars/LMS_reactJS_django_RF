import { Link } from "react-router-dom";
import MyCourses from './StudentCourses'
import StudentSidebar from "./StudentSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';


function StudentProfileSettings(){
    const studentId = localStorage.getItem('studentId')
    const [StudentData, setStudentData] = useState({
        full_name: '',
        email: '',
        username: '',
        interested_cat: '',
        p_img: '',
    });

    useEffect(() => {
        // Fetch currect course data
        try{
            axios.get(baseUrl + '/student/' + studentId)
            .then((res) => {
                setStudentData({
                    full_name: res.data.full_name,
                    username: res.data.username,
                    email: res.data.email,
                    interested_cat: res.data.interested_cat,
                    profile_img: res.data.profile_img,
                    p_img: '',
                })
            });
        }catch(error){
            console.log(error);
        }
        //End fetch course data
    },[]);

    const handleChange = (event) => {
        setStudentData({
            ...StudentData,
            [event.target.name]:event.target.value
        })
    };

    const handleFileChange = (event) => {
        setStudentData({
            ...StudentData,
            [event.target.name]:event.target.files[0]
        })
    };

    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('full_name', StudentData.full_name);
        _formData.append('username', StudentData.username)
        _formData.append('email', StudentData.email);
        _formData.append('interested_cat', StudentData.interested_cat);
        if (StudentData.p_img !== ''){
            _formData.append('profile_img', StudentData.p_img, StudentData.p_img.name);
        }

        try{
            axios.put(baseUrl + '/student/' + studentId +'/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status === 200){
                    Swal.fire({
                        title: 'Your data has been updated',
                        icon: 'success',
                        toast: true,
                        timer: 3000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }
            });
        }catch(error){
            console.log(error);
        }

    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <StudentSidebar />
                </aside>
                <section className="col-md-9">
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" value={StudentData.full_name} onChange={handleChange} name="full_name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Username</label>
                            <input type="text" value={StudentData.username} onChange={handleChange} name="bio" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" value={StudentData.email} onChange={handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="video" className="form-label">Profile Image</label>
                            <input type="file" onChange={handleFileChange}  id="video" name="p_img" className="form-control"/>
                            {StudentData.profile_img &&
                                <img src={StudentData.profile_img} width='300' className="mt-3" alt=''/>
                            }
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Interested Category</label>
                            <input type="text" value={StudentData.interested_cat} onChange={handleChange} name="interested_cat" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div id="emailHelp" className="form-text">Ex: Python, Django, JavaScript</div>
                        
                        <hr></hr>
                        <button type="submit" onClick={submitForm} className="btn btn-primary">Update</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default StudentProfileSettings;