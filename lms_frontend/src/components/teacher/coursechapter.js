import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl = 'http://127.0.0.1:8000/apiview';

function CourseChapters(){
    const [ChapterData, setChapterData] = useState([]);
    const [TotalChapter, setTotalChapter] = useState(0);
    const {course_id} = useParams();

    useEffect(() => {
        try{
            axios.get(baseUrl + '/course-chapter/'+course_id)
            .then((res) => {
                setTotalChapter(res.data.length);
                setChapterData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);
    // Delete
    const handleDeleteChange = (chapter_id) =>{
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this chapter?',
            icon: 'info',
            confirmButtonText: 'Drop',
            showCancelButton: true,
        }).then((result) => {
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl + '/chapter/' + chapter_id)
                    .then((res) => {
                        Swal.fire('success', 'Chapter has been removed.');
                        try{
                            axios.get(baseUrl + '/course-chapter/'+course_id)
                            .then((res)=>{
                                setTotalChapter(res.data.length);
                                setChapterData(res.data);
                            })
                        }catch(error){
                            console.log(error);
                        }
                    })
                }catch(error){
                    console.log(error);
                }
            }else{
                Swal.fire('error', 'Chapter not removed..!');
            }
        })
    }
    

    // console.log(ChapterData);
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Course Chapters ({TotalChapter}) <Link to={'/add-chapter/'+course_id} className="btn btn-success btn-sm active float-end">Add Chapter</Link></h5>
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
                                            Your browser does not support the video tag.
                                        </video>
                                        </td>
                                        <td>{chapter.remarks}</td>
                                        <td>
                                            <Link to={'/edit-chapter/'+chapter.id} className="btn btn-info btn-sm text-white"><i class="bi bi-pencil-square"></i></Link>
                                            <button onClick={()=>handleDeleteChange(chapter.id)} className="btn btn-danger btn-sm text-white ms-2"><i class="bi bi-trash"></i></button>
                                            
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