import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl = 'http://127.0.0.1:8000/apiview';

function CourseChapters(){
    const [QuestionData, setQuestionData] = useState([]);
    const [TotalQues, setTotalQues] = useState(0);
    const {quiz_id} = useParams();

    useEffect(() => {
        try{
            axios.get(baseUrl + '/teacher-quiz-question/'+quiz_id)
            .then((res) => {
                setTotalQues(res.data.length);
                setQuestionData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);
    // Delete
    const handleDeleteChange = (question_id) =>{
        Swal.fire({
            title: 'Confirm',
            text: 'Do you want to delete this chapter?',
            icon: 'info',
            confirmButtonText: 'Drop',
            showCancelButton: true,
        }).then((result) => {
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl + '/quiz-question/' + question_id)
                    .then((res) => {
                        Swal.fire('success', 'Question has been removed.');
                        try{
                            axios.get(baseUrl + '/teacher-quiz-question/'+quiz_id)
                            .then((res)=>{
                                setTotalQues(res.data.length);
                                setQuestionData(res.data);
                            })
                        }catch(error){
                            console.log(error);
                        }
                    })
                }catch(error){
                    console.log(error);
                }
            }else{
                Swal.fire('error', 'Question not removed..!');
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
                        <h5 className="card-header">Course Chapters ({TotalQues}) <Link to={'/add-question/'+quiz_id} className="btn btn-success btn-sm active float-end">Add Question</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Question Title</th>
                                        <th>Quiz</th>
                                        <th>Correct Ans</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {QuestionData.map((ques, index) => 
                                    <tr>
                                        <td>{ques.question_title}</td>
                                        <td>{ques.quiz.title}</td>
                                        <td>{ques.correct_ans}</td>
                                        <td>
                                            <Link to={'/edit-quiz/'+ques.id} className="btn btn-info btn-sm active">Edit</Link>
                                            {/* <Link to={'/add-question/'+ques.id} className="btn btn-success btn-sm active ms-2">Add Questions</Link> */}
                                            <button onClick={()=>handleDeleteChange(+ques.id)} className="btn btn-danger active btn-sm ms-2">Drop</button>
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