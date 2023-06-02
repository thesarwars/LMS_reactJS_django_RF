// import { Link, useParams } from "react-router-dom";
// import TeacherSidebar from "./TeacherSidebar";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/apiview';

function CheckQuizInStudent(props){
    const [QuizData, setQuizData] = useState([]);
    // const studentId = localStorage.getItem('studentId');

    useEffect(() => {
        try{
            axios.get(`${baseUrl}/quiz-attempt-status/${props.quiz}/${props.student}`)
            .then((res) => {
                setQuizData(res.data);
            });
        }catch(error){
            console.log(error);
        }

    },[]);

    return(
            
            <td>
                {QuizData.bool === false &&
                <Link to={`/take-quiz/`+props.quiz} className="btn btn-success btn-sm ms-2">Take Quiz</Link>
                }
                {QuizData.bool === true &&
                <button className="btn btn-success btn-sm ms-2">Completed</button>
                }
            </td>
    
    );
}

export default CheckQuizInStudent;