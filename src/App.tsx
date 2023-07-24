import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Photos from './pages/Photos/Photos'
import PhotoFullScreen from './pages/PhotoFullScreen/PhotoFullScreen'

function App() {

  return (
    <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/photos" Component={Photos} />
        <Route path="/photos/:slug" element={<PhotoFullScreen/>} />
    </Routes>
  )
}

export default App
