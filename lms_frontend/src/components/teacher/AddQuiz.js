// import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState} from 'react';
import axios from "axios";
// import {useParams} from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function AddQuiz() {
    const [QuizData, setQuizData] = useState({
        'title': '',
        'detail': '',
    });

    const handleChange = (event) => {
        setQuizData({
            ...QuizData,
            [event.target.name]:event.target.value
        })
    };

    // const {pk} = useParams();
    const submitForm = (e) => {
        e.preventDefault();
        const teacherId = localStorage.getItem('teacherId')
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('title', QuizData.title);
        _formData.append('detail', QuizData.detail);

        try{
            axios.post(baseUrl + '/quiz/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                // console.log(res.data)
                window.location.href = '/add-quiz'
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
                        <h5 className="card-header">Add Quiz</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input id="title" value={QuizData.title}  type='text' name='title' onChange={handleChange} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label">Details</label>
                                    <textarea name="detail" value={QuizData.detail}  id="detail" onChange={handleChange} className="form-control"></textarea>
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

export default AddQuiz;