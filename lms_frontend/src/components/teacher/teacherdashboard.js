import { Link } from "react-router-dom";
// import MyCourses from './teachercourses'
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';


function TeacherDashboard(){
    const [TeacherDashboard, setTeacherDashboard] = useState([]);
    const teacherId = localStorage.getItem('teacherId')

    useEffect(() => {
        try{
            axios.get(baseUrl + '/teacher/dashboard/'+teacherId)
            .then((res) => {
                setTeacherDashboard(res.data)
                
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    // console.log(TeacherDashboard)

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Total Course</h5>
                                <div className="card-body">
                                    <h3><Link to="/teacher-courses">{TeacherDashboard.total_teacher_courses}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Total Chapters</h5>
                                <div className="card-body">
                                    <h3><Link to="/teacher-courses">{TeacherDashboard.total_teacher_chapters}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Total Students</h5>
                                <div className="card-body">
                                    <h3><Link to="/my-students">{TeacherDashboard.total_teacher_students}</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherDashboard;