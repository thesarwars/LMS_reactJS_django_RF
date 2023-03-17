import { Link } from "react-router-dom";
import React from 'react';

function CategoryCourses() {
    return (
        <div className = "container mt-4">
            {/* Latest courses */}
            <h3 className="pb-1 mb-4">ReactJs Course</h3>
            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to={'/coursedetails/1'}><img src="/python.png" className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to={'/coursedetails/1'}>Course title</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/python.png" className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/python.png" className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/python.png" className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to={'/coursedetails/1'}><img src="/python.png" className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <h5 className="card-title"><Link to={'/coursedetails/1'}>Course title</Link></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/python.png" className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/python.png" className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#"><img src="/python.png" className="card-img-top" alt="..." /></a>
                        <div className="card-body">
                            <h5 className="card-title"><a href="#">Course title</a></h5>
                        </div>
                    </div>
                </div>
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