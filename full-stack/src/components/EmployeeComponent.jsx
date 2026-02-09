import React,{useState,useEffect} from 'react'
import {createEmployee} from '../services/EmployeeService'
import {getEmployee} from '../services/EmployeeService'
import {updateEmployee} from '../services/EmployeeService'
import {useNavigate,useParams} from 'react-router-dom'


const EmployeeComponent = () => {

    const navigator = useNavigate();
    const {id} = useParams();

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    
    const [errors,setErrors] = useState({
        firstName:'',
        lastName:'',
        email:''

    })

    //get employees data for update
    useEffect(()=>{
      getEmployee(id).then((response)=>{
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error=>{
        console.error(error);
      })
    },[id])

    //submitt form function,update function logic
    function saveOrUpdateEmployee(e){
        e.preventDefault();
    
        if(validateForm()){
            const employee = {firstName,lastName,email}

            if(id){
                updateEmployee(id,employee).then((response)=>{
                 console.log(response.data)
                 navigator('/')
                }).catch(errors=>{
                    console.errros(errors);
                })
            }
            else{
                createEmployee(employee).then((response)=>{
                console.log(response.data);
                navigator('/')
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
        if(firstName.trim()){
            errorsCopy.firstName='';
        }else{
            errorsCopy.firstName='First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName='';
        }else{
            errorsCopy.lastName='Last name is required';
            valid=false;
        }

        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email='Email is required';
            valid=false;
        }


        setErrors(errorsCopy);
        return valid;
    }

    //page title
    function pageTitle(){
        if(id){
            return <h1 className='text-center'>Update Employee</h1>
        }else{
           return <h1 className='text-center'>Add Employee</h1>
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
                      <label className='form-label'>First Name:</label>
                      <input type="text" 
                      placeholder='Enter first name'
                      name='fistName'
                      className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                      />
                      {errors.firstName && <div className='invalid feedback'>{errors.firstName}</div>}
                    </div>

                    <div className="form-goup mb-2">
                      <label className='form-label'>Last Name:</label>
                      <input type="text" 
                      placeholder='Enter last name'
                      name='lastName'
                      className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                      />
                       {errors.lastName && <div className='invalid feedback'>{errors.lastName}</div>}

                    </div>

                    <div className="form-goup mb-2">
                      <label className='form-label'>email:</label>
                      <input type="email" 
                      placeholder='Enter email'
                      name='email'
                      className={`form-control ${errors.email ? 'is-invalid': ''}`}
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      />
                        {errors.email && <div className='invalid feedback'>{errors.email}</div>}

                    </div>

                <button className='btn btn-primary' onClick={saveOrUpdateEmployee}>
                     {id?"Update Employee" :"Add Employee"}
                </button>

                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
