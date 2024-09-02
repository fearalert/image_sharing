
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from './Layout'
import { AppContextProvider } from './Context/AppContext'
import ImageCard from "./components/ImageCard"
import ImageUploader from "./components/ImageUploader"


const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/' element={<ImageCard />} />
            <Route path='/upload' element={<ImageUploader />} />
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  )
}

export default App