import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Editar from './pages/Editar'

function RouterApp() {
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/Editar' element={<Editar/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default RouterApp;