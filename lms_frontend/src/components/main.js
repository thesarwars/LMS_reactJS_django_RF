import Home from './home';
import About from './about';
import Header from './header';
import Footer from './footer';
import {Route, Routes as Switch} from 'react-router-dom';


function Main() {
    return (
      <div className="container">
        <Header />
        <Switch>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
        </Switch>
        <Footer />
      </div>
    );
  }
  
  export default Main;