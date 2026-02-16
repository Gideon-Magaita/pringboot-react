import React,{useState,useEffect} from 'react'
import {createDepartment} from '../services/DepartmentService'
import {getDepartment} from '../services/DepartmentService'
import {updateDepartment} from '../services/DepartmentService'
import {useNavigate,useParams} from 'react-router-dom'


const DepartmentComponent = () => {

    const navigator = useNavigate();
    const {id} = useParams();

    const [departmentName,setDepartmentName] = useState('');
    const [departmentDescription,setDepartmentDescription] = useState('');
    
    const [errors,setErrors] = useState({
        departmentName:'',
        departmentDescription:''

    })

    //get department data for update
    useEffect(()=>{
      getDepartment(id).then((response)=>{
        setDepartmentName(response.data.departmentName);
        setDepartmentDescription(response.data.departmentDescription);
      }).catch(error=>{
        console.error(error);
      })
    },[id])

    //submitt form function,update function logic
    function saveOrUpdateDepartment(e){
        e.preventDefault();
    
        if(validateForm()){
            const department = {departmentName,departmentDescription}

            if(id){
                updateDepartment(id,department).then((response)=>{
                 console.log(response.data)
                 navigator('/list-department')
                }).catch(errors=>{
                    console.errros(errors);
                })
            }
            else{
                createDepartment(department).then((response)=>{
                console.log(response.data);
                navigator('/list-department')
            }).catch(errors=>{
                    console.errros(errors);
                })
            }

        }
        
    }

    //form validation function
    function validateForm(){
        let valid= true;

        const errorsCopy = {...errors}
        if(departmentName.trim()){
            errorsCopy.departmentName='';
        }else{
            errorsCopy.departmentName='department name is required';
            valid = false;
        }

        if(departmentDescription.trim()){
            errorsCopy.departmentDescription='';
        }else{
            errorsCopy.departmentDescription='department decsription is required';
            valid=false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    //page title
    function pageTitle(){
        if(id){
            return <h1 className='text-center'>Update Department</h1>
        }else{
           return <h1 className='text-center'>Add Department</h1>
        }
    }
  
  return (
    <div className='container'>
      <div className="row mt-5">
        <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-header">
                {
                    pageTitle()
                }
            </div>
            <div className="card-body">
                <form action="">

                    <div className="form-goup mb-2">
                      <label className='form-label'>Department Name:</label>
                      <input type="text" 
                      placeholder='Enter department name'
                      name='departmentName'
                      className={`form-control ${errors.departmentName ? 'is-invalid': ''}`}
                      value={departmentName}
                      onChange={(e)=>setDepartmentName(e.target.value)}
                      />
                      {errors.departmentName && <div className='invalid feedback'>{errors.departmentName}</div>}
                    </div>

                    <div className="form-goup mb-2">
                      <label className='form-label'>Decsription:</label>
                      <input type="text" 
                      placeholder='Enter description'
                      name='departmentDescription'
                      className={`form-control ${errors.departmentDescription ? 'is-invalid': ''}`}
                      value={departmentDescription}
                      onChange={(e)=>setDepartmentDescription(e.target.value)}
                      />
                       {errors.departmentDescription && <div className='invalid feedback'>{errors.departmentDescription}</div>}

                    </div>

                <button className='btn btn-primary' onClick={saveOrUpdateDepartment}>
                     {id?"Update Department" :"Add Department"}
                </button>

                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentComponent
