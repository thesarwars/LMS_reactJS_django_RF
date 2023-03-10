import Home from './home';
import About from './about';
import Header from './header';
import Footer from './footer';
import {Route, Routes as Switch} from 'react-router-dom';
import CourseDetails from './coursedetail';
import Login from './user/login';
import Registration from './user/registration';

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
        </Switch>
        <Footer />
      </div>
    );
  }
  
  export default Main;