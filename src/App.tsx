import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppFrench from "./AppFrench"
import AppEnglish from "./AppEnglish"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppFrench />} />
        <Route path="/recrutement" element={<AppEnglish />} />
      </Routes>
    </BrowserRouter>
  )
}