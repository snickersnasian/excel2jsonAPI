
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import { Home } from './Pages/Home/Home'
import { NotFound } from './Pages/NotFound/NotFound'
import { LayoutApp } from './Components/Layout/LayoutApp'
import { Home } from './Pages/Home/Home'
import { Excel2json } from './Pages/Excel2json/Excel2json'

function App() {
  return (
    <div >
      <LayoutApp>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/excel2json' element={<Excel2json />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutApp>

    </div>
  )
}

export default App
