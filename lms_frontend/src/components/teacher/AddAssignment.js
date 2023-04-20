import React, {useState} from 'react';
import TeacherSidebar from "./TeacherSidebar";
import axios from "axios";
import {useParams} from 'react-router-dom';
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function AddAssignment(){
    const [AssignmentData, setAssignmentData] = useState({
        title: "",
        details: ""
    });

    const handleChange = (event) => {
        setAssignmentData({
            ...AssignmentData,
            [event.target.name]:event.target.value
        })
    }

    const {student_id} = useParams();

    const submitForm = (event) => {
        event.preventDefault();
        const teacherId = localStorage.getItem('teacherId')
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('student', student_id);
        _formData.append('title', AssignmentData.title);
        _formData.append('details', AssignmentData.details);

        try{
            axios.post(baseUrl + '/student-assignment/' + student_id + '/' + teacherId + '/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                // console.log(res.data)
                window.location.href = '/my-students/'
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
                        <h5 className="card-header">Add Assignment</h5>
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