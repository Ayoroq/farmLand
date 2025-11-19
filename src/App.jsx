import { Outlet } from 'react-router'
import Navbar from './components/Navbar.jsx'
import style from "./App.module.css";

export default function App() {
  return (
    <div className={style.app}>
      <Navbar />
      <Outlet />
    </div>
  )
}