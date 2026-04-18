import './App.css'
import Store from './components/Store'
import { Routes, Route } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import TermsAndConditios from './components/TermsAndConditions'
import PrivacyPolicy from './components/PoliciesAndPrivacy'


function App() {

  return (
    <>

      <div className='app-layout'>

        <PageHeader />

        <main style={{position: 'relative'}}>  {/* CUIDADO CON QUE ESTO HAYA ROTO ALGO */}   
          <Routes>
            <Route path='/' element = {<Store />} />
            <Route path='/terms-and-conditions' element = {<TermsAndConditios />} />
            <Route path='/privacy-policy' element = {<PrivacyPolicy />} />

          </Routes>
        </main>    

        <PageFooter />

      </div>

    </>
  )
}

export default App
