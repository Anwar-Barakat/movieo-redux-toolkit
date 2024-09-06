import { Outlet } from 'react-router-dom';
import './index.css';
import './styles/index.scss'

function App() {

  return (
    <div className='min-h-[90vh]'>
      <Outlet />
    </div>

  )
}

export default App
