import './App.css'
import Header from "./components/Header/Header.jsx"
import BodySec from "./components/BodySec/BodySec.jsx"
import Footer from "./components/Footer/Footer.jsx"



function App() {
  

  return (
    <div className='min-h-screen flex flex-col'>
     <Header />
     <div className='flex-1 flex flex-col'>
    <BodySec />

     </div>
     
     <Footer/>
    </div>
  )
}

export default App
