import React, {useState, useEffect} from 'react';
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function AddAssignment(){
    const teacherId = localStorage.getItem('teacherId')
    const [EnrolledStudents, setEnrolledStudents] = useState([]);
    const [AssignmentData, setAssignmentData] = useState({
        title: "",
        details: ""
    });

    useEffect(() => {
        try{
            axios.get(baseUrl + '/course/' + course_id)
            .then((res) => {
                setEnrolledStudents(res.data)
            });
        }catch(error){
            console.log(error);
        }
    },[]);
    // console.log(EnrolledStudents)

    const handleChange = (event) => {
        setAssignmentData({
            ...AssignmentData,
            [event.target.name]:event.target.value
        })
    }

    const {student_id, course_id} = useParams();

    const submitForm = (event) => {
        event.preventDefault();
        
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('student', student_id);
        _formData.append('course', course_id);
        _formData.append('title', AssignmentData.title);
        _formData.append('details', AssignmentData.details);

        try{
            axios.post(baseUrl + '/student-assignment/' + student_id + '/' + teacherId + '/' + course_id + '/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                // console.log(res.data)
                if(res.status === 200||res.status==201){
                    Swal.fire({
                        title: 'Assignment has been added',
                        icon: 'success',
                        toast: true,
                        timer: 1000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    const _notifData = new FormData();
                    _notifData.append('teacher', teacherId);
                    _notifData.append('student', student_id);
                    _notifData.append('notif_to', 'students');
                    _notifData.append('notif_sub', 'assignment');
                    axios.post(baseUrl+'/save-notification/',_notifData,{
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }).then((res)=>{
                        console.log('Notification Added')
                    })
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                }
            });
        }catch(error){
            console.log(error);
        }
        
    };

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        {/* {EnrolledStudents.map((col, index) => */}
                        <h5 className="card-header">Add Assignment for <span className="text-warning">{EnrolledStudents.title}</span></h5>
                        {/* )} */}
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input id="title" value={AssignmentData.title} onChange={handleChange} name="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Details</label>
                                    <textarea id="details" name="details" value={AssignmentData.details} onChange={handleChange} placeholder="Assignment details" className="form-control"></textarea>
                                </div>
                                <button type="button" onClick={submitForm} className="btn btn-primary">Assign</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddAssignment;