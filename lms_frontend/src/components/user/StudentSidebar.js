import { Link } from "react-router-dom";
import React from 'react';


function StudentSidebar(){
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/user-dashboard" className="list-group-item list-group-item-ation">Dashboard</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-ation">My courses</Link>
                <Link to="/fav-courses" className="list-group-item list-group-item-ation">Fvourite Course</Link>
                <Link to="/rec-courses" className="list-group-item list-group-item-ation">Recommanded Course</Link>
                <Link to="/profile-settings" className="list-group-item list-group-item-ation">Profile Settings</Link>
                <Link to="/ch-password" className="list-group-item list-group-item-ation">Change Password</Link>
                <Link to="/user-login" className="list-group-item list-group-item-ation text-danger">Logout</Link>
            </div>
        </div>
    )
}


export default StudentSidebar;