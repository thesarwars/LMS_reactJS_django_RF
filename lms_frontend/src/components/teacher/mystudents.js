import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function MyStudents() {
    const [EnrolledStudents, setEnrolledStudents] = useState([]);
    // const [TeacherData, setTeacherData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')
    // const {teacher_id} = useParams();

    useEffect(() => {
        try{
            axios.get(baseUrl + '/all-enrolled-students/'+teacherId)
            .then((res) => {
                setEnrolledStudents(res.data)
                
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    // const handleDeleteChange = (course_id) => {
    //     Swal.fire({
    //         title: 'Confirm',
    //         text: 'Do you want to delete this course?',
    //         icon: 'info',
    //         confirmButtonText: 'Drop',
    //         showCancelButton: true,
    //     }).then((result) => {
    //         if(result.isConfirmed){
    //             try{
    //                 axios.delete(baseUrl + '/course/' + course_id)
    //                 .then((res) => {
    //                     Swal.fire('success', 'Course has been removed.');
    //                     try{
    //                         axios.get(baseUrl + '/teacher-course/' + teacherId)
    //                         .then((res)=>{
    //                             setCourseData(res.data);
    //                         })
    //                     }catch(error){
    //                         console.log(error);
    //                     }
    //                 })
    //             }catch(error){
    //                 console.log(error);
    //             }
    //         }else{
    //             Swal.fire('error', 'Course not removed..!');
    //         }
    //     })
    // }

    // console.log(CourseData);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Enrolled Students</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Course</th>
                                        <th>Enrolled Date</th>
                                        <th>Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EnrolledStudents.map((row, index) => 
                                        <tr>
                                            <td>{row.student.full_name}</td>
                                            {/* <td><img width="80px" src={row.student.featured_img} className="rounded" alt={row.student.full_name} /></td> */}
                                            <td><p to='#'>{row.student.email}</p></td>
                                            <td><p to='#'>{row.student.username}</p></td>
                                            <td><p>{row.course.title}</p></td>
                                            <td><p>{row.enrolled_time.slice(0,10)}</p></td>
                                            <td>
                                                <button className="btn btn-warning btn-sm">Assignments</button>
                                                <Link to={`/add-assignment/${row.student.id + '/' + teacherId}`}><button className="btn btn-primary btn-sm ms-2">Add</button></Link>
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

export default MyStudents;