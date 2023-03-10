import Home from './home';
import About from './about';
import Header from './header';
import Footer from './footer';
import {Route, Routes as Switch} from 'react-router-dom';
import CourseDetails from './coursedetail';


function Main() {
    return (
      <div className="container">
        <Header />
        <Switch>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/coursedetails/:course_id' element={<CourseDetails />}></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
  
  export default Main;