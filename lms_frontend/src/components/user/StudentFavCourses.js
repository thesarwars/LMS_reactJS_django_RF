import { Link, useParams } from "react-router-dom";
import Sidebar from "./StudentSidebar";
import React, { useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentFavCourses() {
    const [CourseData, setCourseData] = useState([]);
    // const [FavStatus, setFavStatus] = useState([]);
    const studentId = localStorage.getItem('studentId')
    // let {course_id} = useParams()

    useEffect(() => {
        try{
            axios.get(baseUrl + '/fav-courses/'+studentId)
            .then((res) => {
                setCourseData(res.data)
            });
        }catch(error){
            console.log(error);
        }

        // Fetch favourite status
        // try{
        //     axios.get(baseUrl + '/fav-status/' + studentId +'/'+ course_id)
        //     .then((res) => {
        //         if (res.data.bool == true){
        //             setFavStatus('success')
        //         }
        //         else{
        //             setFavStatus('')
        //         }
        //     });
        // }catch(error){
        //     console.log(error);
        // }
    },[]);

    // const removeFav = (e) => {
    //     e.preventDefault();
    //     const _formData = new FormData();
    //     _formData.append('course', course_id);
    //     _formData.append('student', studentId);
    //     _formData.append('status', false);

    //     try{
    //         axios.get(baseUrl + '/removefav/'+ studentId +'/'+ course_id)
    //         .then((res) => {
    //             // console.log(res.data)
    //             if(res.status === 200||res.status==201){
    //                 Swal.fire({
    //                     title: 'Removed from favourite course',
    //                     icon: 'success',
    //                     toast: true,
    //                     timer: 1000,
    //                     position: 'top-right',
    //                     timerProgressBar: true,
    //                     showConfirmButton: false,
    //                 });
    //                 setTimeout(function(){
    //                     window.location.reload();
    //                  }, 1000);
    //             }
    //         });
    //     }catch(error){
    //         console.log(error);
    //     }

    // };

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Favourite Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CourseData.map((row, index) =>
                                    <tr>
                                        <td><Link to={`/coursedetails/${row.id}`}>{row.course.title}</Link></td>
                                        <td><Link to={`/teacher-details/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link></td>
                                        {/* { FavStatus === 'success' && */}
                                        <td><button type='button' className='btn btn-danger ms-2 btn-sm'><i class="bi bi-heart-fill"></i></button></td>
                                        {/* } */}
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

export default StudentFavCourses;