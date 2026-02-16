import { useState } from 'react'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import EmployeeComponent from './components/EmployeeComponent'
import DepartmentComponent from './components/DepartmentComponent'
import ListDepartmentComponent from './components/ListDepartment'
import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <HeaderComponent/>
      <Routes>
          <Route exact path='/' element={ <ListEmployeeComponent/>}/>
          <Route path='/add-employee' element={<EmployeeComponent/>}/>
          <Route path='/edit-employee/:id' element={<EmployeeComponent/>}/>
          <Route path='/department' element={<DepartmentComponent/>}/>
          <Route path='/edit-department/:id' element={<DepartmentComponent/>}/>
          <Route path='/list-department' element={<ListDepartmentComponent/>}/>
      </Routes>
      <FooterComponent/>
    </Router>
    </>
  )
}

export default App
