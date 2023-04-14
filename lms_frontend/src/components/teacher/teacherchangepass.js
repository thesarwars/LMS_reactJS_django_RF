import { Link } from "react-router-dom";
import MyStudents from './MyStudents'
import TeacherSidebar from "./TeacherSidebar";
import React from 'react';


function TeacherChangePassword(){
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label for="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                            Must be 8-20 characters long.
                            </span>
                        </div>
                    </div>
                    <hr></hr>
                    <button type="submit" className="btn btn-primary">Update</button>
                </section>
            </div>
        </div>
    );
}

export default TeacherChangePassword;