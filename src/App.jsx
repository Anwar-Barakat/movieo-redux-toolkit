import { Outlet } from 'react-router-dom';
import './index.css';
import './styles/index.scss'
import { Footer, Header } from './components';

function App() {

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default App
