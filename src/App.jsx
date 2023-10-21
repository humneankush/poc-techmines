
import { Route, Routes, createBrowserRouter } from 'react-router-dom'
import './App.css'
import UserList from './Pages/UserList/UserList'
import UserProfile from './Pages/UserProfile/UserProfile'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="user/:userId" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default App
