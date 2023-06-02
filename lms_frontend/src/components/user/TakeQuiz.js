import { useParams } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function TakeQuizes() {
    const studentId = localStorage.getItem('studentId')
    const [QuestionData, setQuestionData] = useState([]);
    const {quiz_id} = useParams();

    useEffect(() => {
        try{
            axios.get(baseUrl + '/quiz-question/'+quiz_id+'/'+1)  // 1 is question limit per page
            .then((res) => {
                setQuestionData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    const submitAnswer = (question_id, submitted_ans) =>{
        const _formData = new FormData();
        _formData.append('student', studentId);
        _formData.append('quiz', quiz_id);
        _formData.append('question', question_id);
        _formData.append('submitted_ans', submitted_ans);
        _formData.append('quiz', quiz_id);

        try{
            axios.post(baseUrl + '/attempted-quiz/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status===200|res.status===201){
                    try{
                        axios.get(baseUrl + '/quiz-question/'+quiz_id+'/next-question/'+question_id)
                        .then((res) => {
                            setQuestionData(res.data);
                        });
                    }catch(error){
                        console.log(error);
                    }
                }
            });
        }catch(error){
            console.log(error);
        }

    }
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                <h5 className="mb-3 border-bottom pb-1">Quiz Title</h5>
                    {QuestionData.map((question, index)=>
                        <div className="card">
                            <h5 className="card-header">{question.question_title}</h5>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <tbody>
                                        
                                            <tr>
                                                <td><button onClick={()=>submitAnswer(question.id, question.option1)} className="btn btn-outline-secondary">{question.option1}</button></td>
                                            </tr>
                                            <tr>
                                                <td><button onClick={()=>submitAnswer(question.id, question.option2)} className="btn btn-outline-secondary">{question.option2}</button></td>
                                            </tr>
                                            <tr>
                                                <td><button onClick={()=>submitAnswer(question.id, question.option3)} className="btn btn-outline-secondary">{question.option3}</button></td>
                                            </tr>
                                            <tr>
                                                <td><button onClick={()=>submitAnswer(question.id, question.option4)} className="btn btn-outline-secondary">{question.option4}</button></td>
                                            </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default TakeQuizes;