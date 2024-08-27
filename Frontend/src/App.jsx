import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route  path='/books' element={<AllBooks />}/>
            <Route  path='/Login' element={<Login />}/>
        </Routes>
        <Footer />
      </Router>
      
      
    </div>
  )
}

export default App