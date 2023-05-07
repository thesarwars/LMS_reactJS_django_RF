import { Link } from "react-router-dom";
import React from 'react';


function TeacherSidebar(){
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/teacher-dashboard" className="list-group-item list-group-item-ation">Dashboard</Link>
                <Link to="/teacher-courses" className="list-group-item list-group-item-ation">My courses</Link>
                <Link to="/add-courses" className="list-group-item list-group-item-ation">Add Courses</Link>
                <Link to="/quiz" className="list-group-item list-group-item-ation">Quiz</Link>
                <Link to="/add-quiz" className="list-group-item list-group-item-ation">Add Quiz</Link>
                <Link to="/my-students" className="list-group-item list-group-item-ation">My Students</Link>
                <Link to="/teacher-settings" className="list-group-item list-group-item-ation">Profile Settings</Link>
                <Link to="/teacher-ch-password" className="list-group-item list-group-item-ation">Change Password</Link>
                <Link to="/teacher-login" className="list-group-item list-group-item-ation text-danger">Logout</Link>
            </div>
        </div>
    )
}


export default TeacherSidebar;