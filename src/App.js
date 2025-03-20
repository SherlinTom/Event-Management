import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLoggedUser } from "./Redux/userSlice";
import UserHeader from "./Components/UserHeader";
import Header from "./Components/Header";
import AdminHeader from "./Admin/Components/AdminHeader";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import Events from "./Pages/Events";
import MyEvents from "./Pages/MyEvents";
import AddEvent from "./Pages/AddEvent";
import UpdateEvent from "./Pages/UpdateEvent";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import UserList from "./Admin/Pages/UserList";
import EventDetails from "./Pages/EventDetails";
// import AdminHeader from "./Components/AdminHeader";
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getLoggedUser());
  },[dispatch]);
  const role = useSelector((state) => state.users.loggedUser?.role || 'No Role Found');
  console.log(role);
  
  return (
    <Router>
       {role === 'user' ? <UserHeader/>: role === 'admin'? <AdminHeader/> : <Header/>}
       <ToastContainer position='top-center' autoClose={2000}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/my-events" element={<MyEvents/>}/>
        <Route path="/add-event" element={<AddEvent/>}/>
        <Route path="/update-event/:id" element={<UpdateEvent/>}/>
        <Route path="/my-profile" element={<Profile/>}/>
        <Route path="/update-profile" element={<UpdateProfile/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="/details/:id" element={<EventDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
