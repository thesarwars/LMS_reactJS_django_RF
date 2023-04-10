import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./teachersidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function EnrolledStudents() {
    const [EnrolledStudents, setEnrolledStudents] = useState([]);
    // const [TeacherData, setTeacherData] = useState([]);
    const {course_id} = useParams();

    useEffect(() => {
        try{
            axios.get(baseUrl + '/view-enrolled-students/'+course_id)
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
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        {/* <th>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {EnrolledStudents.map((row, index) => 
                                        <tr>
                                            <td><Link to="#">{row.student.full_name}</Link></td>
                                            {/* <td><img width="80px" src={row.student.featured_img} className="rounded" alt={row.student.full_name} /></td> */}
                                            <td><p to='#'>{row.student.email}</p></td>
                                            <td><p to='#'>{row.student.username}</p></td>
                                            {/* <td>
                                                <Link to='#' className="btn btn-info btn-sm active">{row.student.username}</Link>
                                                <Link to={'/add-chapter/'+student.id} className="btn btn-success btn-sm active ms-2">Add Chapter</Link>
                                                <button onClick={()=>handleDeleteChange(+course.id)} className="btn btn-danger active btn-sm ms-2">Drop</button>
                                            </td> */}
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

export default EnrolledStudents;