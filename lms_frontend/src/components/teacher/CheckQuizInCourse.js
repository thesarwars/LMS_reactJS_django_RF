// import { Link, useParams } from "react-router-dom";
// import TeacherSidebar from "./TeacherSidebar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function CheckQuizInCourse(props){
    const [QuizData, setQuizData] = useState([]);
    const teacherId = localStorage.getItem('teacherId');

    useEffect(() => {
        try{
            axios.get(`${baseUrl}/quiz-assign-status/${props.quiz}/${props.course}`)
            .then((res) => {
                setQuizData(res.data);
            });
        }catch(error){
            console.log(error);
        }

    },[]);

    const AssignToQuiz = (quiz_id)=>{
        // e.preventDefault();
        const _formData = new FormData();
        _formData.append('quiz', props.quiz);
        _formData.append('teacher', teacherId);
        _formData.append('course', props.course);

        try{
            axios.post(baseUrl + '/assign-quiz/', _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status==200||res.status==201){
                    window.location.reload();
                }
            });
        }catch(error){
            console.log(error);
        }
    };

    // console.log(CourseData);

    return(
            
            <td>
                {QuizData.bool == false &&
                <button onChange={()=>AssignToQuiz(props.quiz)} className="btn btn-success btn-sm ms-2">Assign Quiz</button>
                }
                {QuizData.bool == true &&
                <button className="btn btn-success btn-sm ms-2">Assigned</button>
                }
            </td>
    
    );
}

export default CheckQuizInCourse;