import { Link } from "react-router-dom";
import TeacherSidebar from "./teachersidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";


const baseUrl = 'http://127.0.0.1:8000/apiview';

function AddChapter() {
    const [ChapterData, setChapterData] = useState({
        // category: '',
        // title: '',
        // description: '',
        // f_img: '',
        // techs: ''
        'title': '',
        'description': '',
        'video': '',
        'remarks': '',
    });

    const handleChange = (event) => {
        setChapterData({
            ...ChapterData,
            [event.target.name]:event.target.value
        })
    };

    const handleFileChange = (event) => {
        setChapterData({
            ...ChapterData,
            [event.target.name]:event.target.files[0]
        })
    };

    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('category', ChapterData.category);
        _formData.append('teacher', 1);
        _formData.append('title', ChapterData.title);
        _formData.append('description', ChapterData.description);
        _formData.append('featured_img', ChapterData.f_img, ChapterData.f_img.name);
        _formData.append('techs', ChapterData.techs);

        try{
            axios.post(baseUrl + '/course/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                // console.log(res.data)
                window.location.href = '/add-courses'
            });
        }catch(error){
            console.log(error);
        }

    };

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Course Title</label>
                                    <input id="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label" htmlFor="email">Description</label>
                                    <textarea id="description" className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="video" className="form-label">Video</label>
                                    <input type="file" id="video" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Remarks</label>
                                    <textarea id="techs" placeholder="This video is focus on basic." className="form-control"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddChapter;