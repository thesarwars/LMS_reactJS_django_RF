import { Link } from "react-router-dom";
import TeacherSidebar from "./teachersidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'

const baseUrl = 'http://127.0.0.1:8000/apiview';

function CourseChapters(){
    const [ChapterData, setChapterData] = useState([]);
    const {course_id} = useParams()

    useEffect(() => {
        try{
            axios.get(baseUrl + '/course-chapter/'+course_id)
            .then((res) => {
                setChapterData(res.data)
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    // console.log(ChapterData);
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Course Chapters</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ChapterData.map((chapter, index) => 
                                    <tr>
                                        <td><Link to='#'>{chapter.title}</Link></td>
                                        <td>
                                        <video width="250" controls>
                                            <source src={chapter.video.url} type="video/mp4" />
                                            <source src={chapter.video.url} type="video/ogg" />
                                            Your browser does not support the video tag.
                                        </video>
                                        </td>
                                        <td>{chapter.remarks}</td>
                                        <td>
                                            <button className="btn btn-danger active">Drop</button>
                                            <button className="btn btn-info active ms-2">Edit</button>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default CourseChapters;