import './index.scss'
import Header from './Header';
import MeasuringInformation from './pages/measuring-information/MeasuringInformation';
import { Route, Routes } from 'react-router-dom';
import Compression from './pages/compression/Compression';

function App() {
  return (
    <>
      <Header />
      <section className='main'>
        <Routes>
          <Route path='/measuring-information' element={<MeasuringInformation />}/>
          <Route path='/compression' element={<Compression />} />
        </Routes>
      </section>
    </>
  )
}

export default App
