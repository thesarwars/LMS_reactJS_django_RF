// import { Link } from "react-router-dom";
// import MyCourses from './teachercourses'
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';


function TeacherDashboard(){
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    Teacher Dashboard
                </section>
            </div>
        </div>
    );
}

export default TeacherDashboard;