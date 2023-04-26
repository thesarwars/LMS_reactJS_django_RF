import { Link } from "react-router-dom";
// import MyCourses from './StudentCourses';
import StudentSidebar from "./StudentSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function StudentDashboard(){
    const [StudentDashboards, setStudentDashboards] = useState([]);
    const studentId = localStorage.getItem('studentId')

    useEffect(() => {
        try{
            axios.get(baseUrl + '/user/student-dashboard/'+studentId)
            .then((res) => {
                setStudentDashboards(res.data)
                
            });
        }catch(error){
            console.log(error);
        }
    },[]);
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <StudentSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
                                <div className="card-body">
                                    <h5><Link to="/my-courses">{StudentDashboards.enrolled_courses}</Link></h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-info text-white">Favourite Courses</h5>
                                <div className="card-body">
                                    <h5><Link to="/fav-courses">{StudentDashboards.favourite_courses}</Link></h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-success text-white">Assignments</h5>
                                <div className="card-body">
                                    <h5>
                                        <Link to="/my-assignment">Completed: {StudentDashboards.complete_assignment}, &nbsp; Pending: {StudentDashboards.pending_assignment}</Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default StudentDashboard;