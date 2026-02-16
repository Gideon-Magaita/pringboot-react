import React,{useState,useEffect} from 'react'
import {listDepartments} from '../services/Departmentservice'
import { useNavigate } from 'react-router-dom'


const ListDepartmentComponent = () => {

  const navigate = useNavigate();

  const[departments,setDepartment] = useState([]);

  useEffect(()=>{
     getAllDepartments()
  },[])


  function getAllDepartments(){
    listDepartments().then((response)=>{
        setDepartment(response.data);
     }).catch(error=>{
        console.error(error);
     })
  }
 
  function addDepartment(){
    navigate('/department');
  }

//   function updateEmployee(id){ 
//     navigate(`/edit-employee/${id}`);
//   }


//   function removeEmployee(id){
//     deleteEmployee(id).then((response)=>{
//     getAllDepartments()
//     navigate('/')

//     }).catch(error=>{
//         console.error(error);
//     })
//   }


  return (
    <div>
       <div className="container mt-5">
        <h1>List of Department</h1>
         <div className="card">
            <div className="card-header">
                <button className='btn btn-primary' onClick={addDepartment}>Add Department</button>
            </div>
            <div className="card-body">
                <table className='table table-striped table-bordered table-responsive'>
                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>Department Name</th>
                            <th>Department Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departments.map(department=>
                            <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentDescription}</td>
                            <th>
                                <button className='btn btn-success' onClick={'/'}>
                                Update
                                </button>
                                <button className='btn btn-danger' onClick={'/'}
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

export default ListDepartmentComponent
