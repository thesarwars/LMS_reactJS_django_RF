// import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';


function EditChapter(){
    const [ChapterData, setChapterData] = useState({
        course: '',
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

    const {chapter_id} = useParams();
    const submitForm = (e) => {
        e.preventDefault();
        const _formData = new FormData();
        _formData.append('course', ChapterData.course);
        _formData.append('title', ChapterData.title);
        _formData.append('description', ChapterData.description);
        if (ChapterData.video !== ''){
            _formData.append('video', ChapterData.video, ChapterData.video.name);
        }
        _formData.append('remarks', ChapterData.remarks);


        try{
            axios.put(baseUrl + '/chapter/'+ chapter_id, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status === 200){
                    Swal.fire({
                        title: 'Data has been updated',
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
    }

    useEffect(() => {
        try{
            axios.get(baseUrl + '/chapter/' + chapter_id)
            .then((res) => {
                setChapterData({
                    course: res.data.course,
                    title: res.data.title,
                    description: res.data.description,
                    prev_video: res.data.video,
                    remarks: res.data.remarks,
                    video: ''
                })
            });
        }catch(error){
            console.log(error);
        }
    },[]);


    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Modify Chapter</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Chapter Title</label>
                                    <input id="title" value={ChapterData.title} onChange={handleChange} name="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label" htmlFor="email">Description</label>
                                    <textarea id="description" value={ChapterData.description} onChange={handleChange} name="description" className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="video" className="form-label">Video</label>
                                    <input type="file" onChange={handleFileChange} name="video" id="video" className="form-control"/>
                                    {ChapterData.prev_video &&
                                    <video width="100%" controls className='mt-2'>
                                            <source src={ChapterData.prev_video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                    </video>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Remarks</label>
                                    <textarea id="techs" value={ChapterData.remarks} onChange={handleChange} name="remarks" placeholder="This video is focus on basic." className="form-control"></textarea>
                                </div>
                                <button type="button" onClick={submitForm} className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditChapter;