import { Link } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function TakeQuizes() {
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
                <h5 className="mb-3 border-bottom pb-1">Quiz Title</h5>
                    <div className="card">
                        <h5 className="card-header">Question Title</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <tbody>
                                        <tr>
                                            <td><input type="radio"></input></td>
                                            <th>Option 1</th>
                                        </tr>
                                        <tr>
                                            <td><input type="radio"></input></td>
                                            <th>Option 2</th>
                                        </tr>
                                        <tr>
                                            <td><input type="radio"></input></td>
                                            <th>Option 3</th>
                                        </tr>
                                        <tr>
                                            <td><input type="radio"></input></td>
                                            <th>Option 4</th>
                                        </tr>
                                </tbody>
                                <button className="btn btn-dark mt-2">Skip</button>
                                <button className="btn btn-primary mt-2 ms-2">Next</button>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TakeQuizes;