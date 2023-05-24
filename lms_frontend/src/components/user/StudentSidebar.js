import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';


function StudentSidebar(){
    const [NotifStatus, setNotifStatus] = useState(0)
    const studentId = localStorage.getItem('studentId');

    // useEffect(()=>{
    //     try{
    //         axios.get(baseUrl+'/student/view-notification/'+studentId)
    //         .then((response)=>{
    //             // console.log(response);
    //             setNotifStatus(response.data);
    //         })
    //     }catch(error){
    //         console.log(error)
    //     }
    // })

    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/user-dashboard" className="list-group-item list-group-item-ation">Dashboard</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-ation">My courses</Link>
                <Link to="/my-assignment" className="list-group-item list-group-item-ation">Assignment<span className="badge bg-danger float-end mt-1">{NotifStatus.length}</span></Link>
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