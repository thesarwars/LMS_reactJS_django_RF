// import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function EditCourses() {
    const [Cates, setCates] = useState([]);
    const [courseData, setcourseData] = useState({
        category: '',
        title: '',
        description: '',
        f_img: '',
        techs: '',
    });

    useEffect(() => {
        // Fetch category Data
        try{
            axios.get(baseUrl + '/category')
            .then((res) => {
                setCates(res.data)
            });
        }catch(error){
            console.log(error);
        }
        // Fetch currect course data
        try{
            axios.get(baseUrl + '/course/' + course_id)
            .then((res) => {
                setcourseData({
                    category: res.data.category,
                    title: res.data.title,
                    description: res.data.description,
                    prev_img: res.data.featured_img,
                    f_img: '',
                    techs: res.data.techs,
                })
            });
        }catch(error){
            console.log(error);
        }
        //End fetch course data
    },[]);

    const handleChange = (event) => {
        setcourseData({
            ...courseData,
            [event.target.name]:event.target.value
        })
    };

    const handleFileChange = (event) => {
        setcourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        })
    };


    const {course_id} = useParams();
    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', 1)
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        if (courseData.f_img !== ''){
            _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        }
        _formData.append('techs', courseData.techs);

        try{
            axios.put(baseUrl + '/course/' + course_id, _formData, {
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

    // console.log(Cates);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Edit Course</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Category</label>
                                    <select name='category' value={courseData.category} onChange={handleChange} className="form-control">
                                        {Cates.map((category, index) => {return <option key={index} value={category.id}>{category.title}</option>})}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input id="title" value={courseData.title}  type='text' name='title' onChange={handleChange} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Description</label>
                                    <textarea name="description" value={courseData.description}  id="description" onChange={handleChange} className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="video" className="form-label">Featured Image</label>
                                    <input type="file" onChange={handleFileChange}  id="video" name="f_img" className="form-control"/>
                                    {courseData.prev_img &&
                                        <img src={courseData.prev_img} width='300' className="mt-3" alt=''/>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Technologies</label>
                                    <textarea id="techs" value={courseData.techs} onChange={handleChange} name="techs" placeholder="Python, Django, JavaScripts, PHP, HTML, CSS..." className="form-control"></textarea>
                                </div>
                                <button onClick={submitForm} type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCourses;