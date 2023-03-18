import { Link } from "react-router-dom";
import TeacherSidebar from "./teachersidebar";
import React from 'react';

function AddChapter() {
    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Chapter</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Course Title</label>
                                    <input id="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="form-label" htmlFor="email">Description</label>
                                    <textarea id="description" className="form-control"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="video" className="form-label">Video</label>
                                    <input type="file" id="video" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Remarks</label>
                                    <textarea id="techs" placeholder="This video is focus on basic." className="form-control"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddChapter;