import { Link, useParams } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentAssignment() {
    const [AssignmentData, setAssignmentData] = useState([]);
    const studentId = localStorage.getItem('studentId')
    let {course_id} = useParams()

    useEffect(() => {
        try{
            axios.get(baseUrl + '/view-enrolled-courses/'+studentId)
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
                        <h5 className="card-header">My Assignment</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Details</th>
                                        <th>Assigned By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CourseData.map((row, index)=>
                                        <tr>
                                            <td><Link to={`/coursedetails/${row.course.id}`}>{row.course.title}</Link></td>
                                            <td><Link to={`/teacher-details/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
                                            <td>{row.enrolled_time.slice(0,10)}</td>
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

export default StudentAssignment;