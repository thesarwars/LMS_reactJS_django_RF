import React from 'react'
import Home from './Home';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import {Route, Routes as Switch} from 'react-router-dom';
import CourseDetails from './CourseDetail';
import TeacherDetails from './TeacherDetails';

//Studetns
import StudentLogin from './user/StudentLogin';
import StudentLogout from './user/StudentLogout';
import StudentRegistration from './user/StudentRegistration';
import StudentDashboard from './user/StudentDashboard';
import StudentCourses from './user/StudentCourses';
import StudentAssignment from './user/StudentAssignment';
import StudentFavCourses from './user/StudentFavCourses';
import StudentRecCourses from './user/StudentRecCourse';
import StudentProfileSettings from './user/StudentProfileSettings';
import StudentChangePassword from './user/StudentChangePass';

// Teacher Area
import TeacherRegistration from './teacher/TeacherRegistration';
import TeacherLogin from './teacher/TeacherLogin';
import TeacherLogout from './teacher/TeacherLogout';
import TeacherDashboard from './teacher/TeacherDashboard';
import TeacherCourses from './teacher/TeacherCourses';
import EnrolledStudents from './teacher/EnrolledStudents';
import AddCourses from './teacher/AddCourses';
import EditCourses from './teacher/EditCourse';
import AddChapter from './teacher/AddChapter';
import EditChapter from './teacher/EditChapter';
import CourseChapters from './teacher/CourseChapter';
import AddAssignment from './teacher/AddAssignment';
import CourseAssignment from './teacher/CourseAssignment';
import MyStudents from './teacher/MyStudents';
import TeacherProfileSettings from './teacher/TeacherProfileSettings';
import TeacherChangePassword from './teacher/TeacherChangePass';
import TeacherSkills from './teacher/TeacherSkills';

// Courses area
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeacher from './PopularTeacher';
import CategoryCourses from './CategoryCourses';

// Quiz Section
import AddQuiz from './teacher/AddQuiz';
import MyQuiz from './teacher/MyQuiz';
import EditQuiz from './teacher/EditQuiz';
import AddQuestions from './teacher/AddQuestions';
import TeacherQuestions from './teacher/TeacherQuestions';
import AssignQuiz from './teacher/AssignQuiz';











function Main() {
    return (
      <div className="container">
        <Header />
        <Switch>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/coursedetails/:course_id' element={<CourseDetails />}></Route>
            <Route path='/teacher-details/:teacher_id' element={<TeacherDetails />}></Route>

            {/* Students */}
            <Route path='/user-login' element={<StudentLogin />}></Route>
            <Route path='/user-logout' element={<StudentLogout />}></Route>
            <Route path='/user-reg' element={<StudentRegistration />}></Route>
            <Route path='/user-dashboard' element={<StudentDashboard />}></Route>
            <Route path='/my-courses' element={<StudentCourses />}></Route>
            <Route path='/my-assignment' element={<StudentAssignment />}></Route>
            <Route path='/fav-courses' element={<StudentFavCourses />}></Route>
            <Route path='/rec-courses' element={<StudentRecCourses />}></Route>
            <Route path='/profile-settings' element={<StudentProfileSettings />}></Route>
            <Route path='/ch-password' element={<StudentChangePassword />}></Route>

            {/* Teacher Area */}
            <Route path='/teacher-login' element={<TeacherLogin />}></Route>
            <Route path='/teacher-logout' element={<TeacherLogout />}></Route>
            <Route path='/teacher-reg' element={<TeacherRegistration />}></Route>
            <Route path='/teacher-dashboard' element={<TeacherDashboard />}></Route>
            <Route path='/teacher-courses' element={<TeacherCourses />}></Route>
            <Route path='/enrolled-student/:course_id' element={<EnrolledStudents />}></Route>
            <Route path='/add-courses' element={<AddCourses />}></Route>
            <Route path='/edit-course/:course_id' element={<EditCourses />}></Route>
            <Route path='/edit-chapter/:chapter_id' element={<EditChapter />}></Route>
            <Route path='/add-chapter/:course_id' element={<AddChapter />}></Route>
            <Route path='/all-chapter/:course_id' element={<CourseChapters />}></Route>
            <Route path='/add-assignment/:student_id/:teacher_id/:course_id' element={<AddAssignment />}></Route>
            <Route path='/show-assignment/:student_id/:teacher_id/:course_id' element={<CourseAssignment />}></Route>
            <Route path='/my-students' element={<MyStudents />}></Route>
            <Route path='/teacher-settings' element={<TeacherProfileSettings />}></Route>
            <Route path='/teacher-ch-password' element={<TeacherChangePassword />}></Route>
            <Route path='/teacher-skills/:skill_name/:teacher_id' element={<TeacherSkills />}></Route>

            {/* courses area */}
            <Route path='/all-courses' element={<AllCourses />}></Route>
            <Route path='/popular-courses' element={<PopularCourses />}></Route>
            <Route path='/popular-teacher' element={<PopularTeacher />}></Route>
            <Route path='/category/:category_slug' element={<CategoryCourses />}></Route>

            {/* Quiz Area */}
            <Route path='/add-quiz' element={<AddQuiz />}></Route>
            <Route path='/all-quiz' element={<MyQuiz />}></Route>
            <Route path='/assign-quiz/:course_id' element={<AssignQuiz />}></Route>
            <Route path='/edit-quiz/:quiz_id' element={<EditQuiz />}></Route>
            <Route path='/add-question/:quiz_id' element={<AddQuestions />}></Route>
            <Route path='/all-question/:quiz_id' element={<TeacherQuestions />}></Route>


        </Switch>
        <Footer />
      </div>
    );
  }
  
  export default Main;