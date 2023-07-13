import { Link } from "react-router-dom";
import React, { useState } from 'react';

function Header() {
  const [SearchString, setSearchString] = useState({
    'search': ''
  })
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')

  const handleChange = (event) =>{
    setSearchString({
      ...SearchString,
      [event.target.name]:event.target.value
    })
  }

  const SearchHere = () =>{
    window.location.href='/search/'+SearchString.search
  }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Taha LMS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              <Link className="nav-link" to="/all-courses">Courses</Link>
              
              {/* Teacher Login Area */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Instructor
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {teacherLoginStatus !== 'true' && 
                  <>
                  <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                  <li><Link className="dropdown-item" to="/teacher-reg">Registration</Link></li></>
                }
                {teacherLoginStatus === 'true' &&
                  <>
                  <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                  </>
                }
                </ul>
              </li>
              
              {/* User login Area */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">User
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {studentLoginStatus !== 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/user-reg">Registration</Link></li>
                  </>
                  }
                  {studentLoginStatus === 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li>
                  </>
                  }
                </ul>
              </li>
              <form class="d-flex" role="search">
                <input onChange={handleChange} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button onClick={SearchHere} class="btn btn-outline-light" type="button">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Header;