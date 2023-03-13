import { Link } from "react-router-dom";

function TeacherDetails() {
    return(
        <div className='container mt-3'>
        <div className='row'>
            <div className='col-4'>
                <img src="/teacher.png" className="img-thumbnail" alt="teacher-image" />
            </div>
            <div className='col-8'>
                <h3>Tahasin Tabassum</h3>
                <p>Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.</p>
                <p className='fw-bold'>Skills: <Link to='/category/react'>PHP</Link>, <Link to='/category/react'>Python</Link>, <Link to='/category/react'>JavaScripts</Link>,</p>
                <p className='fw-bold'>Recent Course: <Link to='/category/react'>ReactJS Course</Link> </p>
                <p className='fw-bold'>Rating: 4.5/5 </p>
            </div>
        </div>
        {/* Course Videos */}
        <div className="card mt-4">
            <div className="card-header">
                <h5>Course Lists</h5>
            </div>
            <div className="list-group list-group-flush">
                <Link to="/coursedetails/1" className="list-group-item ist-group-item-action">PHP Course 1</Link>
                <Link to="/coursedetails/1" className="list-group-item ist-group-item-action">PHP Course 2</Link>
                <Link to="/coursedetails/1" className="list-group-item ist-group-item-action">Python Course 1</Link>
                <Link to="/coursedetails/1" className="list-group-item ist-group-item-action">Python Course 2</Link>
                <Link to="/coursedetails/1" className="list-group-item ist-group-item-action">ReactJs Course 1</Link>
                <Link to="/coursedetails/1" className="list-group-item ist-group-item-action">ReactJs Course 2</Link>
            </div>
        </div>
        {/* End Course Videos */}
    </div>
    );
}

export default TeacherDetails;