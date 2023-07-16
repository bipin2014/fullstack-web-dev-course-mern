import './App.css'
import Navbar from './module/common/Navbar'
import Footer from './module/common/Footer'
import Homepage from './module/Home/Homepage'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
