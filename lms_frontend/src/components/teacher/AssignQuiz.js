import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import CheckQuizInCourse from "./CheckQuizInCourse";
import React, {useState, useEffect} from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function AssignQuiz() {
    const [QuizData, setQuizData] = useState([]);
    const [CourseData, setCourseData] = useState([]);
    const [AssignQuiz, setAssignQuiz] = useState([]);
    const teacherId = localStorage.getItem('teacherId')
    const {course_id} = useParams();
    
    

    useEffect(() => {
        try{
            axios.get(baseUrl + '/teacher-quiz/'+teacherId)
            .then((res) => {
                setQuizData(res.data);
            });
        }catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl + '/course/' + course_id)
            .then((res) => {
                setCourseData(res.data)
            });
        }catch(error){
            console.log(error);
        }

    },[]);

    // const AssignToQuiz = (quiz_id) => {
    //     // e.preventDefault();
    //     const _formData = new FormData();
    //     _formData.append('quiz', quiz_id);
    //     _formData.append('teacher', teacherId);
    //     _formData.append('course', course_id);

    //     try{
    //         axios.post(baseUrl + '/assign-quiz/', _formData,{
    //             headers: {
    //                 'content-type': 'multipart/form-data'
    //             }
    //         })
    //         .then((res) => {
    //             try{
    //                 axios.get(baseUrl+'/quiz-assign-status/'+quiz_id+'/'+course_id)
    //                 .then((res) => {
    //                     setAssignQuiz(res.data);
    //                 });
    //             }catch(error){
    //                 console.log(error)
    //             }
    //         });
    //     }catch(error){
    //         console.log(error);
    //     }

    // };

    // console.log(CourseData);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Assign Quiz to <span className="text text-warning">{CourseData.title}</span></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Assign to</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {QuizData.map((quiz, index) => 
                                        <tr>
                                            <td><Link to={'/all-question/'+quiz.id}>{quiz.title}</Link></td>
                                            
                                                {/* <td>
                                                    <button onClick={()=>AssignToQuiz(+quiz.id)} className="btn btn-success active btn-sm ms-2">Assign</button>
                                                </td> */}
                                            <CheckQuizInCourse quiz={quiz.id} course={course_id} />
                                        </tr>
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

export default AssignQuiz;