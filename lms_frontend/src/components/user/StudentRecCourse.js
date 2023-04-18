import { Link } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentRecCourses() {
    const [CourseData, setCourseData] = useState([]);
    const studentId = localStorage.getItem('studentId')

    useEffect(() => {
        try{
            axios.get(baseUrl + '/recommended-course/'+studentId)
            .then((res) => {
                setCourseData(res.data)
                // if (res.data.course_rating != ' ' && res.data.course_rating != null){
                //     setAvgRating(res.data.course_rating)
                // }
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
                        <h5 className="card-header">Recommanded Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CourseData.map((row, index) =>
                                    <tr>
                                        <td><Link to={`/coursedetails/${row.id}`}>{row.title}</Link></td>
                                        <td>{row.techs}</td>
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

export default StudentRecCourses;