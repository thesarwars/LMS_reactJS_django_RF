// import { Link } from "react-router-dom";
// import MyStudents from './mystudents';
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';


function TeacherProfileSettings(){
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <form>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="file" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Skills</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <hr></hr>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default TeacherProfileSettings;