import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes,Route} from "react-router-dom";
import Header from './components/Header'
import AgregarAula from './components/AgregarAula'
import ModificarAula  from './components/ModificarAula'
import BorrarAula  from './components/BorrarAula'
import Cartelera from './components/Cartelera'
import AgregarClase from './components/AgregarClase'
import BorrarClase from './components/BorrarClase'
import AgregarMateria from './components/AgregarMateria'
import ModificarMateria from './components/ModificarMateria'
import BorrarMateria from './components/BorrarMateria'

function App() {

  return (

    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/'></Route>
          <Route path='/AgregarAula' element={(<AgregarAula />)}></Route>
          <Route path='/ModificarAula' element={(<ModificarAula />)}></Route>
          <Route path='/BorrarAula' element={(<BorrarAula />)}></Route>
          <Route path='/Cartelera' element={(<Cartelera />)}></Route>
          <Route path='/AgregarClase' element={(<AgregarClase />)}></Route>
          <Route path='/BorrarClase' element={(<BorrarClase />)}></Route>
          <Route path='/AgregarMateria' element={(<AgregarMateria />)}></Route> 
          <Route path='/ModificarMateria' element={(<ModificarMateria />)}></Route>
          <Route path='/BorrarMateria' element={(<BorrarMateria />)}></Route>

        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  )
}

export default App
