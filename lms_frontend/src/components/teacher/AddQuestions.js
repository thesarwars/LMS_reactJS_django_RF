// import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';


const baseUrl = 'http://127.0.0.1:8000/apiview';

function AddChapter() {
    const [QuestionData, setQuestionData] = useState({
        question_title: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correct_ans: ''
    });

    const handleChange = (event) => {
        setQuestionData({
            ...QuestionData,
            [event.target.name]:event.target.value
        })
    };

    const {quiz_id} = useParams();
    const submitForm = (event) => {
        event.preventDefault();
        const _formData = new FormData();
        _formData.append('quiz', quiz_id);
        _formData.append('question_title', QuestionData.question_title);
        _formData.append('option1', QuestionData.option1);
        _formData.append('option2', QuestionData.option2);
        _formData.append('option3', QuestionData.option3);
        _formData.append('option4', QuestionData.option4);
        _formData.append('correct_ans', QuestionData.correct_ans);

        try{
            axios.post(baseUrl + '/quiz-question/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                // console.log(res.data)
                window.location.href = '/add-question/' + quiz_id
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
                        <h5 className="card-header">Add Questions</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Question Name</label>
                                    <input id="title" onChange={handleChange} name="question_title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Option1</label>
                                    <input id="title" onChange={handleChange} name="option1" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Option2</label>
                                    <input id="title" onChange={handleChange} name="option2" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Option3 </label>
                                    <input id="title" onChange={handleChange} name="option3" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Option4</label>
                                    <input id="title" onChange={handleChange} name="option4" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Correct Ans</label>
                                    <input id="title" onChange={handleChange} name="correct_ans" type="text" className="form-control"/>
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