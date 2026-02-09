import React,{useState,useEffect} from 'react'
import {listEmployees,deleteEmployee} from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'


const ListEmployeeComponent = () => {

  const navigate = useNavigate();

  const[employees,setEmployees] = useState([]);

  useEffect(()=>{
     getAllEmpolyees()
  },[])


  function getAllEmpolyees(){
    listEmployees().then((response)=>{
        setEmployees(response.data);
     }).catch(error=>{
        console.error(error);
     })
  }
 
  function addEmployee(){
    navigate('/add-employee');
  }

  function updateEmployee(id){ 
    navigate(`/edit-employee/${id}`);
  }


  function removeEmployee(id){
    deleteEmployee(id).then((response)=>{
    getAllEmpolyees()
    navigate('/')

    }).catch(error=>{
        console.error(error);
    })
  }


  return (
    <div>
       <div className="container mt-5">
        <h1>List of Employees</h1>
         <div className="card">
            <div className="card-header">
                <button className='btn btn-primary' onClick={addEmployee}>Add Employee</button>
            </div>
            <div className="card-body">
                <table className='table table-striped table-bordered table-responsive'>
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(employee=>
                            <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <th>
                                <button className='btn btn-success' onClick={()=>updateEmployee(employee.id)}>
                                Update
                                </button>
                                <button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}
                                style={{marginLeft:'12px'}}>
                                Delete
                                </button>
                                <a className='btn btn-secondary' href="http://" style={{marginLeft:'12px'}}>View</a>

                            </th>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
         </div>
       </div>
    </div>
  )
}

export default ListEmployeeComponent
