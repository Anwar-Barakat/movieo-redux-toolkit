import { Outlet } from 'react-router-dom';
import './index.css';
import './styles/index.scss'
import { Footer, Header } from './components';
import { useEffect } from 'react';
import fetchTrendingMovies from './api/moviesApi';

function App() {

  useEffect(() => {
    fetchTrendingMovies()
  }
  , [])

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
