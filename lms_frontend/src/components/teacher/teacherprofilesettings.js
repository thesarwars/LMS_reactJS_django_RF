// import { Link } from "react-router-dom";
// import MyStudents from './mystudents';
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function TeacherProfileSettings(){
    const teacherId = localStorage.getItem('teacherId')
    const [TeacherData, setTeacherData] = useState({
        full_name: '',
        bio: '',
        email: '',
        qualification: '',
        p_img: '',
        skills: '',
    });

    useEffect(() => {
        // Fetch currect course data
        try{
            axios.get(baseUrl + '/teacher/' + teacherId)
            .then((res) => {
                setTeacherData({
                    full_name: res.data.full_name,
                    bio: res.data.bio,
                    email: res.data.email,
                    qualification: res.data.qualification,
                    profile_img: res.data.profile_img,
                    p_img: '',
                    skills: res.data.skills,
                })
            });
        }catch(error){
            console.log(error);
        }
        //End fetch course data
    },[]);

    const handleChange = (event) => {
        setTeacherData({
            ...TeacherData,
            [event.target.name]:event.target.value
        })
    };

    const handleFileChange = (event) => {
        setTeacherData({
            ...TeacherData,
            [event.target.name]:event.target.files[0]
        })
    };

    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('full_name', TeacherData.full_name);
        _formData.append('bio', TeacherData.bio)
        _formData.append('email', TeacherData.email);
        _formData.append('qualification', TeacherData.qualification);
        if (TeacherData.p_img !== ''){
            _formData.append('profile_img', TeacherData.p_img, TeacherData.p_img.name);
        }
        _formData.append('techs', TeacherData.skills);

        try{
            axios.put(baseUrl + '/teacher/' + teacherId +'/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status === 200){
                    Swal.fire({
                        title: 'Course has been updated',
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
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" value={TeacherData.full_name} onChange={handleChange} name="full_name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Bio</label>
                            <input type="text" value={TeacherData.bio} onChange={handleChange} name="bio" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" value={TeacherData.email} onChange={handleChange} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Qualification</label>
                            <input type="text" value={TeacherData.qualification} onChange={handleChange} name="qualification" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="video" className="form-label">Featured Image</label>
                            <input type="file" onChange={handleFileChange}  id="video" name="p_img" className="form-control"/>
                            {TeacherData.profile_img &&
                                <img src={TeacherData.profile_img} width='300' className="mt-3" alt=''/>
                            }
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Skills</label>
                            <input type="text" value={TeacherData.skills} onChange={handleChange} name="skills" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <hr></hr>
                        <button type="submit" onClick={submitForm} className="btn btn-primary">Update</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default TeacherProfileSettings;