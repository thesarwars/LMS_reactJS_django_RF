import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';

function CourseDetails() {
    let {course_id} = useParams()
    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-4'>
                    <img src="/logo512.png" className="img-thumbnail" alt="..." />
                </div>
                <div className='col-8'>
                    <h3>Course Title</h3>
                    <p>Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.</p>
                    <p className='fw-bold'>Author: <Link to='/teacher-details/1'>Teacher 1</Link></p>
                    <p className='fw-bold'>Duration: 3 hours 30 minutes </p>
                    <p className='fw-bold'>Total Enrolled: 2356 Students </p>
                    <p className='fw-bold'>Rating: 4.5/5 </p>
                </div>
            </div>
            {/* Course Videos */}
            <div className="card mt-4">
                <div className="card-header">
                    <h5>Course Videos</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Intro
                        <span className='float-end'>
                        <span className='me-5'>1h:30m</span>
                            <button className='btn btn-sm'><i class="bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">Intro
                        <span className='float-end'>
                        <span className='me-5'>1h:30m</span>
                            <button className='btn btn-sm'><i class="bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">Intro
                        <span className='float-end'>
                        <span className='me-5'>1h:30m</span>
                            <button className='btn btn-sm'><i class="bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">Intro
                        <span className='float-end'>
                        <span className='me-5'>1h:30m</span>
                            <button className='btn btn-sm'><i class="bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">Intro
                        <span className='float-end'>
                        <span className='me-5'>1h:30m</span>
                            <button className='btn btn-sm'><i class="bi-youtube"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">Intro
                        <span className='float-end'>
                        <span className='me-5'>1h:30m</span>
                            <button className='btn btn-sm'><i class="bi-youtube"></i></button>
                        </span>
                    </li>
                    
                </ul>
            </div>
            {/* End Course Videos */}

            <h3 className="pb-1 mb-4 mt-5">Related Course</h3>
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card">
                        <Link to={'/coursedetails/1'}><img src="/logo512.png" className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                        <h5 className="card-title"><Link to={'/coursedetails/1'}>Course title</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <a href="#"><img src="/logo512.png" className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                        <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;