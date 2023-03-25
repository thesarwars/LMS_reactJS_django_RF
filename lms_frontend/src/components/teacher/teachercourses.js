import { Link } from "react-router-dom";
import TeacherSidebar from "./teachersidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function TeacherCourses() {
    const [CourseData, setCourseData] = useState([]);
    const teacherId = localStorage.getItem('teacherId')

    useEffect(() => {
        try{
            axios.get(baseUrl + '/teacher-course/'+teacherId)
            .then((res) => {
                setCourseData(res.data)
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    console.log(CourseData);

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
                                        <th>Images</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CourseData.map((course, index) => 
                                    <tr>
                                        <td><Link to={'/all-chapter/'+course.id}>{course.title}</Link></td>
                                        <td><img width="80px" src={course.featured_img} className="rounded" alt={course.title}/></td>
                                        <td><Link to={"/teacher-details/"+teacherId}>{course.teacher}</Link></td>
                                        <td>
                                            <button className="btn btn-danger active btn-sm">Drop</button>
                                            <Link to={'/add-chapter/'+course.id} className="btn btn-success btn-sm active ms-2">Add Chapter</Link>
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

export default TeacherCourses;