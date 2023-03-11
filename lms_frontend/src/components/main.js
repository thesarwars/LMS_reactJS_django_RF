import Home from './home';
import About from './about';
import Header from './header';
import Footer from './footer';
import {Route, Routes as Switch} from 'react-router-dom';
import CourseDetails from './coursedetail';
import Login from './user/login';
import Registration from './user/registration';
import Dashboard from './user/dashboard';
import MyCourses from './user/mycourses';
import FavCourses from './user/favcourses';
import RecCourses from './user/reccourses';
import ProfileSettings from './user/profilesettings';
import ChangePassword from './user/changepass';

function Main() {
    return (
      <div className="container">
        <Header />
        <Switch>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/coursedetails/:course_id' element={<CourseDetails />}></Route>
            <Route path='/user-login' element={<Login />}></Route>
            <Route path='/user-reg' element={<Registration />}></Route>
            <Route path='/user-dashboard' element={<Dashboard />}></Route>
            <Route path='/my-courses' element={<MyCourses />}></Route>
            <Route path='/fav-courses' element={<FavCourses />}></Route>
            <Route path='/rec-courses' element={<RecCourses />}></Route>
            <Route path='/profile-settings' element={<ProfileSettings />}></Route>
            <Route path='/ch-password' element={<ChangePassword />}></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
  
  export default Main;