import './App.css'
import Store from './components/Store'
import { Routes, Route } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import AboutUs from './components/AboutUs'
import Melodies from './components/Melodies'
import PageFooter from './components/PageFooter'
import HowToCreate from './components/HowToCreate'  
import HowToPurchase from './components/HowToPurchase'
import TermsAndConditions from './components/TermsAndConditions'
import HistoryOfMusicBoxes from './components/HistoryOfMusicBoxes'
import PoliciesAndPrivacy from './components/PoliciesAndPrivacy'  
import FrequentQuestions from './components/FrequentQuestions'

function App() {

  return (
    <>

      <div className='app-layout'>

        <PageHeader />

        <main style={{position: 'relative'}}>  {/* CUIDADO CON QUE ESTO HAYA ROTO ALGO */}   
          <Routes>
            <Route path='/' element = {<Store />} />
            <Route path='/melodies' element = {<Melodies />} />
            <Route path='/who-we-are' element = {<AboutUs />} />
            <Route path='/how-to-create' element = {<HowToCreate />} />
            <Route path='/how-to-purchase' element = {<HowToPurchase />} />
            <Route path='/terms-and-conditions' element = {<TermsAndConditions />} />
            <Route path='/history-of-music-boxes' element = {<HistoryOfMusicBoxes />} />
            <Route path='/policies-and-privacy' element = {<PoliciesAndPrivacy />} />
            <Route path='/frequently-asked-questions' element = {<FrequentQuestions />} />
          </Routes>
        </main>    

        <PageFooter />

      </div>

    </>
  )
}

export default App
