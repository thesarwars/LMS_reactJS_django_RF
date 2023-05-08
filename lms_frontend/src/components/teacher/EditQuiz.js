// import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';


function EditQuiz(){
    const [QuizData, setQuizData] = useState({
        title: '',
        detail: '',
    });

    const handleChange = (event) => {
        setQuizData({
            ...QuizData,
            [event.target.name]:event.target.value
        })
    };

    const {quiz_id} = useParams();
    const submitForm = (event) => {
        event.preventDefault();
        const teacherId = localStorage.getItem('teacherId')
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('title', QuizData.title);
        _formData.append('detail', QuizData.detail);


        try{
            axios.put(baseUrl + '/quiz/'+ quiz_id, _formData, {
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
            axios.get(baseUrl + '/quiz/' + quiz_id)
            .then((res) => {
                setQuizData({
                    title: res.data.title,
                    detail: res.data.detail,
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
                        <h5 className="card-header">Modify Quiz</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Quiz Title</label>
                                    <input id="title" value={QuizData.title} onChange={handleChange} name="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label" htmlFor="email">Details</label>
                                    <textarea id="detail" value={QuizData.detail} onChange={handleChange} name="detail" className="form-control"></textarea>
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

export default EditQuiz;