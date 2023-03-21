import { Link } from "react-router-dom";
import TeacherSidebar from "./teachersidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl = 'http://127.0.0.1:8000/apiview';

function AddCourses() {
    const [Cates, setCates] = useState([]);
    const [courseData, setcourseData] = useState({
        // category: '',
        // title: '',
        // description: '',
        // f_img: '',
        // techs: ''
        'category': '',
        'title': '',
        'description': '',
        'f_img': '',
        'techs': '',
    });

    useEffect(() => {
        try{
            axios.get(baseUrl + '/category')
            .then((res) => {
                setCates(res.data)
            });
        }catch(error){
            console.log(error);
        }
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

    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', 1);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        _formData.append('techs', courseData.techs);

        try{
            axios.post(baseUrl + '/course/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                console.log(res.data)
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
                        <h5 className="card-header">Add Course</h5>
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
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Technologies</label>
                                    <textarea id="techs" value={courseData.techs} onChange={handleChange} name="techs" placeholder="Python, Django, JavaScripts, PHP, HTML, CSS..." className="form-control"></textarea>
                                </div>
                                <button onClick={submitForm} type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCourses;