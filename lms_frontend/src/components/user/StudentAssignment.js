import { Link, useParams } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect } from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentAssignment() {
    const [AssignmentData, setAssignmentData] = useState([]);
    // const [SubmitAssignment, setSubmitAssignment] = useState(' ');
    const studentId = localStorage.getItem('studentId');
    // const {course_id} = useParams();

    useEffect(() => {
        try{
            axios.get(baseUrl + '/my-assignment/'+ studentId)
            .then((res) => {
                setAssignmentData(res.data)
            });
        }catch(error){
            console.log(error);
        }
    },[]);


    const MarkAsDone = (assignment_id, title, details, student, teacher, course) =>{
        
        const _formData = new FormData();
        _formData.append('assignment_status', true);
        _formData.append('title', title);
        _formData.append('details', details);
        _formData.append('student', student);
        _formData.append('teacher', teacher);
        _formData.append('course', course);

        try{
            axios.put(baseUrl + '/update-assignment/' + assignment_id, _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status === 200||res.status===201){
                    window.location.reload();
                    };
            });
        }catch(error){
            console.log(error);
        }
    };
    // console.log(AssignmentData)
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
                                        <th>Course</th>
                                        <th>Assigned By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AssignmentData.map((row, index)=>
                                        <tr>
                                            <td>{row.title}</td>
                                            <td>{row.details}</td>
                                            <td>{row.course.title}</td>
                                            <td><Link to={`/teacher-details/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
                                            <td>
                                                {row.assignment_status !== true && 
                                                    <button onClick={(()=>MarkAsDone(row.id,row.title,row.details,row.student.id,row.teacher.id,row.course.id,))} className="btn btn-warning btn-sm">Submit</button>
                                                }
                                                {row.assignment_status === true && 
                                                    <button className="btn btn-success btn-sm">Submitted</button>
                                                }
                                            </td>
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