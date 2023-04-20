import React from 'react';
import TeacherSidebar from "./TeacherSidebar";

function AddAssignment(){

    return(
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <div className="col-9">
                    <div className="card">
                        <h5 className="card-header">Add Assignment</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="title" className="form-label">Title</label>
                                    <input id="title" name="title" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label for="techs" class="form-label">Details</label>
                                    <textarea id="details" name="details" placeholder="Assignment details" className="form-control"></textarea>
                                </div>
                                <button type="button" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddAssignment;