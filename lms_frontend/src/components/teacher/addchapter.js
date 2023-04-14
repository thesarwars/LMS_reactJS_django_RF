// import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';


const baseUrl = 'http://127.0.0.1:8000/apiview';

function AddChapter() {
    const [ChapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: '',
        remarks: '',
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

    const {course_id} = useParams();
    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('title', ChapterData.title);
        _formData.append('description', ChapterData.description);
        _formData.append('video', ChapterData.video, ChapterData.video.name);
        _formData.append('remarks', ChapterData.remarks);

        try{
            axios.post(baseUrl + '/chapter/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                // console.log(res.data)
                window.location.href = '/add-chapter/' + course_id
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
                                    <label for="title" className="form-label">Chapter Title</label>
                                    <input id="title" onChange={handleChange} name="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label" htmlFor="email">Description</label>
                                    <textarea id="description" onChange={handleChange} name="description" className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="video" className="form-label">Video</label>
                                    <input type="file" onChange={handleFileChange} name="video" id="video" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Remarks</label>
                                    <textarea id="techs" onChange={handleChange} name="remarks" placeholder="This video is focus on basic." className="form-control"></textarea>
                                </div>
                                <button type="button" onClick={submitForm} className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddChapter;