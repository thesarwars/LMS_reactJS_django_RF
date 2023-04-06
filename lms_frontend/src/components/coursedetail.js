import {useParams, Link} from 'react-router-dom'
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

const relatedUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/apiview';

function CourseDetails() {
    const [CourseData, setCourseData] = useState([]);
    const [ChapterData, setChapterData] = useState([]);
    const [TeacherData, setTeacherData] = useState([]);
    const [relatedCourseData, setrelatedCourseData] = useState([]);
    const [techListData, settechListData] = useState([]);
    
    let {course_id} = useParams()

    useEffect(() => {
        try{
            axios.get(baseUrl + '/course/' + course_id)
            .then((res) => {
                setCourseData(res.data)
                setChapterData(res.data.course_chapters)
                setTeacherData(res.data.teacher)
                setrelatedCourseData(JSON.parse(res.data.related_videos))
                settechListData(res.data.tech_list)
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    // console.log(relatedCourseData)

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src={CourseData.featured_img} width="300px" className="img-thumbnail" alt={CourseData.title}/>
                </div>
                <div className='col-8'>
                    <h3>{CourseData.title}</h3>
                    <p>{CourseData.description}</p>
                    <p className='fw-bold'>Author: <Link to={`/teacher-details/${TeacherData.id}`}>{TeacherData.full_name}</Link></p>
                    <p className='fw-bold'>Techs: 
                    {techListData.map((tech, index)=>
                        <>
                        <Link to={`/category/${tech.trim()}`} className='badge bg-secondary ms-1'>{tech}</Link>
                        </>
                    )}
                    </p>
                    <p className='fw-bold'>Duration: 3 hours 30 minutes </p>
                    <p className='fw-bold'>Total Enrolled: 2356 Students </p>
                    <p className='fw-bold'>Rating: 4.5/5 </p>
                </div>
            </div>
            {/* Course Videos */}
            <div className="card mt-4">
                <div className="card-header">
                    <h5>In this course</h5>
                </div>
                <ul className="list-group list-group-flush">
                    {ChapterData.map((chapter, index) => 
                        <li className="list-group-item">{chapter.title}
                            <span className='float-end'>
                            <span className='me-5'>1h:30m</span>
                                <button className='btn btn-sm' data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi-youtube"></i></button>
                            </span>
                            {/* Start Video Modal */}
                            <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{CourseData.title}: {chapter.title}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="ratio ratio-16x9">
                                        <iframe src={chapter.video} title={chapter.title} allowFullScreen></iframe>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/* End Video Modal */}
                        </li>
                    )}
                </ul>
            </div>
            {/* End Course Videos */}

            <h3 className="pb-1 mb-4 mt-5">Related Course</h3>
            <div className="row mb-4">
                {relatedCourseData.map((relcourse, index) =>
                    <div className="col-md-3">
                        <div className="card">
                            <Link to={`/coursedetails/${relcourse.pk}`}><img src={`${relatedUrl}media/${relcourse.fields.featured_img}`} className="card-img-top" alt={relcourse.fields.title} /></Link>
                            <div className="card-body">
                            <h5 className="card-title"><Link target='_blank' to={`/coursedetails/${relcourse.pk}`}>{relcourse.fields.title}</Link></h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseDetails;