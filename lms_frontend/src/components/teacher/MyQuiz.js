import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function MyQuiz() {
    const [QuizData, setQuizData] = useState([]);
    const [TotalQuiz, setTotalQuiz] = useState(0);
    const teacherId = localStorage.getItem('teacherId')

    useEffect(() => {
        try{
            axios.get(baseUrl + '/teacher-quiz/'+teacherId)
            .then((res) => {
                setTotalQuiz(res.data.length);
                setQuizData(res.data);
                // if (res.data.course_rating != ' ' && res.data.course_rating != null){
                //     setAvgRating(res.data.course_rating)
                // }
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    const handleDeleteChange = (quiz_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this Quiz?',
            icon: 'info',
            confirmButtonText: 'Drop',
            showCancelButton: true,
        }).then((result) => {
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl + '/quiz/' + quiz_id)
                    .then((res) => {
                        Swal.fire('success', 'Course has been removed.');
                        try{
                            axios.get(baseUrl + '/teacher-quiz/' + teacherId)
                            .then((res)=>{
                                setTotalQuiz(res.data.length);
                                setQuizData(res.data);
                                
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

    // console.log(CourseData);

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">My Quizes ({TotalQuiz}) <Link to={'/add-quiz/'} className="btn btn-success btn-sm active float-end">Add Quiz</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Details</th>
                                        <th>Questions</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {QuizData.map((quiz, index) => 
                                        <tr>
                                            <td><Link to={'/all-question/'+quiz.id}>{quiz.title}</Link></td>
                                            <td>{quiz.detail}</td>
                                            <td><Link to='#'>123</Link></td>
                                            <td>
                                                <Link to={'/edit-quiz/'+quiz.id} className="btn btn-info btn-sm active">Edit</Link>
                                                {/* <Link to={'/add-quiz/'+quiz.id} className="btn btn-success btn-sm active ms-2">Add Quiz</Link> */}
                                                <button onClick={()=>handleDeleteChange(+quiz.id)} className="btn btn-danger active btn-sm ms-2">Drop</button>
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
    );
}

export default MyQuiz;