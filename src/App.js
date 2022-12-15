import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import CheckOut from './pages/Order/CheckOut/CheckOut';
import OrderReview from './pages/Order/OrderReview/OrderReview';
import Footer from './pages/Shared/Footer';
import Navbar from './pages/Shared/Navbar';
import RedirectAuth from './pages/Login/RedirectAuth';


function App() {
  return (
    <div >
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={

          <Home />

        } />
        <Route path='/order' element={<OrderReview />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={
          <RedirectAuth>
            <CheckOut />

          </RedirectAuth>
        } />



      </Routes>
      <Footer></Footer>


    </div>
  );
}

export default App;
