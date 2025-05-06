import './index.scss'
import Header from './Header';
import MeasuringInformation from './pages/measuring-information/MeasuringInformation';
import { Route, Routes } from 'react-router-dom';
import Rle from './pages/rle/Rle';
import Huffman from './pages/huffman/Huffman';
import Lzw from './pages/lzw/Lzw';
import Arithmetic from './pages/arithmetic/Arithmetic';
import Rsa from './pages/rsa/Rsa';

function App() {
  return (
    <>
      <Header />
      <section className='main'>
        <Routes>
          <Route path='/measuring-information' element={<MeasuringInformation />} />
          <Route path='/rle' element={<Rle />} />
          <Route path='/huffman' element={<Huffman />} />
          <Route path='/arithmetic' element={<Arithmetic />} />
          <Route path='/lzw' element={<Lzw />} />
          <Route path='/rsa' element={<Rsa />} />
        </Routes>
      </section>
    </>
  )
}

export default App
