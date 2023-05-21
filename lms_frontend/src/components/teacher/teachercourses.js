import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
// import CheckCourseInQuiz from "./CheckQuizInCourse";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function TeacherCourses() {
    const [CourseData, setCourseData] = useState([]);
    // const [courseId, setcourseId] = useState(0);
    // console.log(courseId, 'From State')
    const [quizData, setquizData] = useState([]);
    const [QuizId, setQuizId] = useState(0);
    const [assignedData, setassignedData] = useState([]);
    const [AssignedStatus, setAssignedStatus] = useState([]);
    // console.log(quizData);
    const teacherId = localStorage.getItem('teacherId')
    const {quiz_id, course_id} = useParams();

    useEffect(() => {
        try{
            axios.get(baseUrl + '/teacher-course/'+teacherId)
            .then((res) => {
                setCourseData(res.data)
            });
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl + '/teacher-quiz/'+teacherId)
            .then((res) => {
                setquizData(res.data);
            });
        }catch(error){
            console.log(error);
        }

        // try{
        //     axios.get(baseUrl+'/assign-quiz/')
        //     .then((res) => {
        //         setassignedData(res.data);
        //         console.log(res.data)
        //     });
        // }catch(error){
        //     console.log(error)
        // }

    },[]);

    const handleDeleteChange = (course_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this course?',
            icon: 'info',
            confirmButtonText: 'Drop',
            showCancelButton: true,
        }).then((result) => {
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl + '/course/' + course_id)
                    .then((res) => {
                        Swal.fire('success', 'Course has been removed.');
                        try{
                            axios.get(baseUrl + '/teacher-course/' + teacherId)
                            .then((res)=>{
                                setCourseData(res.data);
                            })
                        }catch(error){
                            console.log(error);
                        }
                    })
                }catch(error){
                    console.log(error);
                }
            }else{
                Swal.fire('error', 'Course not removed..!');
            }
        })
    }

    // Assign Quiz to an course
    // const AssignToQuiz = (course_id) => {
    //     // console.log('quiz_id',quiz_id,'course id', course_id);
    //     // const quiz_id1 = parseInt(QuizId)
    //     // const course_id1 = parseInt(course_id)
    //     // e.preventDefault();
    //     const _formData = new FormData();
    //     _formData.append('quiz', parseInt(QuizId));
    //     _formData.append('teacher', teacherId);
    //     _formData.append('course', parseInt(course_id));
    //     // console.log(quiz_id)

    //     try{
    //         axios.post(baseUrl + '/assign-quiz/', _formData,{
    //             headers: {
    //                 'content-type': 'multipart/form-data'
    //             }
    //         })
    //         .then((response)=>{
    //             if(response.status === 200||response.status===201){
    //                 setAssignedStatus('success')
    //             }
    //         })
    //         .then(() => {
    //             try{
    //                 axios.get(baseUrl+'/quiz-assign-status/'+quiz_id+'/'+course_id)
    //                 .then((res) => {
    //                     setassignedData(res.data);
    //                     // console.log(res.data)
    //                 });
    //             }catch(error){
    //                 console.log(error)
    //             }
                
    //         });
    //     }catch(error){
    //         console.log(error);
    //     }

    // };

    

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-2">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-10">
                    <div className="card">
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Images</th>
                                        <th>Enrolled</th>
                                        <th>Action</th>
                                        <th>Rating</th>
                                        {/* <th>Assign To</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {CourseData.map((course, index) => 
                                       <><tr>
                                            
                                            <td><Link to={'/all-chapter/'+course.id}>{course.title}</Link></td>
                                            <td><img width="80px" src={course.featured_img} className="rounded" alt={course.title} /></td>
                                            <td><Link to={`/enrolled-student/`+ course.id}>{course.total_enrolled}</Link></td>
                                            <td>
                                                <Link to={'/edit-course/'+course.id} className="btn btn-info btn-sm active">Edit</Link>
                                                <Link to={'/add-chapter/'+course.id} className="btn btn-success btn-sm active ms-2">+ Chapter</Link>
                                                <Link to={'/assign-quiz/'+course.id} className="btn btn-warning btn-sm active ms-2">Assign Quiz</Link>
                                                <button onClick={()=>handleDeleteChange(+course.id)} className="btn btn-danger active btn-sm ms-2">Drop</button>
                                            </td>
                                            {course.course_rating &&
                                                <td><p>{course.course_rating}/5</p></td>
                                            }
                                            {!course.course_rating &&
                                                <td><p>Not yet rated</p></td>
                                            }
                                            {/* <td className="d-flex">
                                            <select name='quiz' onChange={(e)=>setQuizId(e.target.value)} className="form-control">
                                                
                                                <option disabled selected>Select</option>
                                                
                                                {quizData.map((quiz, index) => {return <option key={index} value={quiz.id}>{quiz.title}</option>})}
                                                
                                            </select>
                                           
                                            <button onClick={()=>AssignToQuiz(course.id)} type="submit" className="btn btn-primary btn-sm ms-1">Add</button>
                                            {assignedData.map((assign, index)=>
                                            <td>
                                                {assign.quiz.title}{console.log(assign)}
                                            </td>
                                            )}
                                            </td> */}
                                            
                                        </tr>
                                        </>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherCourses;