import { Link, useParams } from "react-router-dom";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

const relatedUrl = 'http://127.0.0.1:8000/apiview';


function TeacherDetails() {
    const [TeacherData, setTeacherData] = useState([]);
    const [CourseData, setCourseData] = useState([]);
    const [TeacherSkills, setTeacherSkills] = useState([]);

    let {teacher_id} = useParams()

    useEffect(() => {
        try{
            axios.get(relatedUrl + '/teacher/' + teacher_id)
            .then((res) => {
                setCourseData(res.data.teacher_courses)
                setTeacherData(res.data)
                setTeacherSkills(res.data.teach_skills)
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    console.log(TeacherSkills)

    return(
        <div className='container mt-3'>
        <div className='row'>
            <div className='col-4'>
                <img src="/teacher.png" className="img-thumbnail" alt="teacher" />
            </div>
            <div className='col-8'>
                <h3>{TeacherData.full_name}</h3>
                <p>Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.</p>
                <p className='fw-bold'>Skills: 
                {TeacherSkills.map((tskills, index) =>
                    <>
                        <Link to={`/teacher-skills/${tskills.trim()}/${TeacherData.id}`} className="badge bg-secondary ms-1">{tskills.trim()}</Link>
                    </>
                )}
                </p>
                <p className='fw-bold'>Recent Course: <Link to='/category/react'>ReactJS Course</Link> </p>
                <p className='fw-bold'>Rating: 4.5/5 </p>
            </div>
        </div>
        {/* Course List */}
        <div className="card mt-4">
            <div className="card-header">
                <h5>Course Lists</h5>
            </div>
            <div className="list-group list-group-flush">
                {CourseData.map((course, index) =>
                    <Link to={`/coursedetails/${course.id}`} className="list-group-item ist-group-item-action">{course.title}</Link>
                )}
            </div>
        </div>
        {/* End Course List */}
    </div>
    );
}

export default TeacherDetails;