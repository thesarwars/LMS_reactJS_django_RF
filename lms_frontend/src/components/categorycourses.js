import { Link, useParams } from "react-router-dom";
import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/apiview';

function CategoryCourses() {
    const [catCourseData, setcatCourseData] = useState([]);
    let {category_slug} = useParams()

    useEffect(() => {
        try{
            axios.get(baseUrl + '/course/?category=' + category_slug)
            .then((res) => {
                setcatCourseData(res.data)
            });
        }catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className = "container mt-4">
            {/* Latest courses */}
            <h3 className="pb-1 mb-4">{category_slug}</h3>
            <div className="row">
                {catCourseData && catCourseData.map ((course, index)=>
                    <div className="col-md-3 mb-4">
                        <div className="card">
                            <Link to={`/coursedetails/${course.id}`}><img src={course.featured_img} className="card-img-top" alt={course.title} /></Link>
                            <div className="card-body">
                                <h5 className="card-title"><Link to={`/coursedetails/${course.id}`}>{course.title}</Link></h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* End Latest courses */}

            {/* pagination start */}

            <nav aria-label="Page navigation example mt-5">
                <ul class="pagination justify-content-end">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>

            {/* pagination end */}
      </div>
    )
}

export default CategoryCourses;