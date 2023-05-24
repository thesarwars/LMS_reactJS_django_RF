import { Link, useParams } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentQuizes() {
    const [QuizData, setQuizData] = useState([]);
    // const teacherId = localStorage.getItem('teacherId')
    const {course_id} = useParams()

    useEffect(() => {
        try{
            axios.get(baseUrl + '/view-assigned-quiz/'+course_id)
            .then((res) => {
                setQuizData(res.data)
            });
        }catch(error){
            console.log(error);
        }
    },[]);
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Quiz List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {QuizData.map((quizes, index)=>
                                        <tr>
                                            <td>{quizes.quiz.title}</td>
                                            <td><Link className="btn btn-warning btn-sm" to={`/take-quiz/`+quizes.quiz.id}>Take Quiz</Link></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default StudentQuizes;