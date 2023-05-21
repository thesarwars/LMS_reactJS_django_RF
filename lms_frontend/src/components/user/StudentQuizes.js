import { Link } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentQuizes() {
    const [CourseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')

    useEffect(() => {
        try{
            axios.get(baseUrl + '/view-enrolled-courses/'+teacherId)
            .then((res) => {
                setCourseData(res.data)
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
                                        <tr>
                                            <td>Python Quiz</td>
                                            <td><Link to={`/start-quiz/1`} className="btn btn-sm btn-warning">Attend Quiz</Link></td>
                                        </tr>
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