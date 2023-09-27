import WindalsNav from '../navbar';
import { Alert,Button,Form, Modal} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getAllWorkerNames, getOneEmployee, updateEmployee,deleteEmployee, resetPassword } from '../../helper/helper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import { Prev } from 'react-bootstrap/esm/PageItem';

function DeleteUser() {
  
  const [workerNames,setWorkerNames] = useState([])
  const [workerUserName,setWorkerUserName] = useState("")
  const [showResetPasswordModal,setShowResetPasswordModal] = useState(false)
  const [resetPasswordData,setResetPasswordData] = useState({
    userName: "",
    newPassword: "",
    confirmNewPassword: ""
  })

  const accessOptions = [ "Add User", "View User", "Delete User", "Modify User", "Add Product", "Veiw Product", "Delete Product", "Modify Product",
   "Add Station", "View Station", "Delete Station", "Modify Station", "Allocate Next Station for Product", "Update Next Station Allocated for Product", 
  "Modify Next Station Allocated for Product", "View Next Station Allocated for Product", "Allocate Station to Worker", "View Station allocated to worker"] 
  
  const [accessGiven, setAccessGiven] = useState(new Array(accessOptions.length).fill(false));

  const validationSchema = Yup.object().shape({
      userName:Yup.string().required('User name is required'),
      firstName:Yup.string().required('First name is required'),
      lastName:Yup.string().required('Last name is required'),
      nickName:Yup.string().required('Nick name is required'),
      designation:Yup.string().required('designation is required'),
      joiningDate:Yup.date().required('Joining Date is required'),
  })
  
  
  const formik = useFormik({
    initialValues:{
      employeeId:"",
      userName:"",
      firstName:"",
      lastName:"",
      nickName:"",
      designation:"",
      joiningDate:"",
      mobileNo:"",
      accessGiven:""
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
      values.accessGiven = accessGiven.map(val => val ? "1" : "0").join("");
      // console.log(values);
      const updateEmployeePromise = updateEmployee(values)
      toast.promise(updateEmployeePromise,{
        loading:"Updating data",
        success: (result) => {
          setWorkerUserName("")
          formik.resetForm()
          return result.msg
        },
        error: (err) => err.msg 
      })
    }
  })
  
  useEffect(()=>{
    const getWorkerNamePromise = getAllWorkerNames()
    getWorkerNamePromise.then((result)=>{
      setWorkerNames(result)
    }).catch((err)=>{
      toast.error(err.msg)
    })
  },[])

  const searchWorker = () => {
    if(workerUserName==="")
    {
      return toast.error("Select a worker first")
    }
    const getWorkerDataPromise = getOneEmployee(workerUserName.value)
    getWorkerDataPromise.then((result)=>{
      // console.log({result:result});
      formik.setFieldValue("employeeId",result[0].employee_id)
      formik.setFieldValue("userName",result[0].user_name)
      formik.setFieldValue("firstName",result[0].first_name)
      formik.setFieldValue("lastName",result[0].last_name)
      formik.setFieldValue("nickName",result[0].nick_name)
      formik.setFieldValue("designation",result[0].designation)
      formik.setFieldValue("mobileNo",result[0].mobile_no)
      formik.setFieldValue("joiningDate",result[0].joining_date)
      formik.setFieldValue("accessGiven",result[0].access_given)
      const accessArray = accessOptions.map((option, index) => result[0].access_given[index] === "1");
      setAccessGiven(accessArray);
    })
  }
  // console.log({formik:formik.values});
  const handleEmployeeDelete = () => {
    const deleteEmployeePromise = deleteEmployee(formik.values.employeeId)
    toast.promise(deleteEmployeePromise,{
      loading:"Updating data",
      success: (result) => {
        setWorkerUserName("")
        formik.resetForm()
        return result.msg
      },
      error: (err) => err.msg 
    }) 
  }

  const handleAccessOptionCheck = (index) => {
    const updatedAccess = [...accessGiven];
    updatedAccess[index] = !updatedAccess[index];
    setAccessGiven(updatedAccess);
  }

  const openResetPasswordModal = () => {
    setShowResetPasswordModal(true)
  }

  const closeResetPasswordModal = () => {
    setShowResetPasswordModal(false)
    setResetPasswordData({
      userName: "",
      newPassword: "",
      confirmNewPassword: ""
    })
  }

  const handleClickOFResetPassword = () => { 
    if(resetPasswordData.newPassword !== resetPasswordData.confirmNewPassword){
      return toast.error("Password and confirm-password do not match.")
    }
    const resetPasswordPromise = resetPassword(resetPasswordData)
    toast.promise(resetPasswordPromise,{
      loading: "Resetting password",
      success: (result) => {
        closeResetPasswordModal()
        setResetPasswordData({
          userName: "",
          newPassword: "",
          confirmNewPassword: ""
        })  
        return result.msg
      },
      error: (err) => err.msg
    })
  }

  const handleResetPasswordModalChange = (e) => {
    const {name,value} = e.target
    setResetPasswordData((PrevData)=>{
      return {
        ...PrevData,
        [name]:value
      }
    })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <WindalsNav/>
      <Form style={{ margin: 30 }}>
        <h3 style={{ width: 500, textAlign: 'center' }}>Enter Username of the User to Delete</h3>

        <div className='form' style={{margin: "10px"}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ width: 300 }}>
            <Form.Label>Username</Form.Label>
            <Select
                    options={workerNames.map((worker) => ({ label: worker.user_name, value: worker.user_name }))}
                    value={workerUserName}
                    onChange={(data) => {
                      setWorkerUserName(data)
                    }}
                    isSearchable={true}
                />
            
          </Form.Group>

          <Button variant="danger" type="button" onClick={searchWorker}>
            Search Worker
          </Button>
        </div>

        {
            formik.values.userName!=="" && 
            <table>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Nick Name</th>
                  <th>Mobile Number</th>
                  <th>Designation</th>
                  <th>Joining Date</th>
                  <th>Access Given</th>
                </tr>
              </thead>
           
              <tbody>
                <tr>
                    <td>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={formik.values.userName} name="userName" onChange={formik.handleChange} />
                    </Form.Group>
                    {
                      formik.errors.userName && (
                        <Alert variant="danger" className="paramererName-error-message">
                          {formik.errors.userName}
                        </Alert>
                    )} 
                    </td>

                    <td>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={formik.values.firstName} name="firstName" onChange={formik.handleChange} />
                    </Form.Group>
                    {
                      formik.errors.firstName && (
                        <Alert variant="danger" className="paramererName-error-message">
                          {formik.errors.firstName}
                        </Alert>
                    )} 
                    </td>

                    <td>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={formik.values.lastName} name="lastName" onChange={formik.handleChange} />
                    </Form.Group>
                    {
                      formik.errors.lastName && (
                        <Alert variant="danger" className="paramererName-error-message">
                          {formik.errors.lastName}
                        </Alert>
                    )} 
                    </td>

                    <td>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={formik.values.nickName} name="nickName" onChange={formik.handleChange} />
                    </Form.Group>
                    {
                      formik.errors.nickName && (
                        <Alert variant="danger" className="paramererName-error-message">
                          {formik.errors.nickName}
                        </Alert>
                    )} 
                    </td>

                    <td>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={formik.values.mobileNo} name="mobileNo" onChange={formik.handleChange} />
                    </Form.Group>
                    {
                      formik.errors.mobileNo && (
                        <Alert variant="danger" className="paramererName-error-message">
                          {formik.errors.mobileNo}
                        </Alert>
                    )} 
                    </td>

                    <td>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={formik.values.designation} name="designation" onChange={formik.handleChange} />
                    </Form.Group>
                    {
                      formik.errors.designation && (
                        <Alert variant="danger" className="paramererName-error-message">
                          {formik.errors.designation}
                        </Alert>
                    )} 
                    </td>

                    <td>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={formik.values.joiningDate} name="joiningDate" onChange={formik.handleChange} />
                    </Form.Group>
                    {
                      formik.errors.joiningDate && (
                        <Alert variant="danger" className="paramererName-error-message">
                          {formik.errors.joiningDate}
                        </Alert>
                    )} 
                    </td>

                    
                    <td>
                      {
                        accessOptions.map((option, index) => (
                          <div key={option}>
                            <label>
                              <input
                                type="checkbox"
                                checked={accessGiven[index]}
                                onChange={() => handleAccessOptionCheck(index)}
                              />
                              {option}
                            </label>
                          </div>
                        ))
                      }
                    </td>
                    
                    <td>
                      <button className="edit-button" onClick={formik.handleSubmit} >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    
                    <td>
                      <button className="delete-button" onClick={()=>{handleEmployeeDelete()}}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>

                    <td>
                      <button type='button' onClick={()=>{
                        setResetPasswordData((prevData)=>{
                          return {
                            ...prevData,
                            userName:formik.values.userName
                          }
                        })
                        openResetPasswordModal()
                      }}>
                        Reset-Password
                      </button>
                    </td>    

                </tr>
              </tbody>
            </table>
        }
      </Form>
    
        <Modal
          show={showResetPasswordModal}
          onHide={closeResetPasswordModal}
          backdrop="static"
          keyboard={false}
        >

          <Modal.Header closeButton>
            <Modal.Title>Enter the new password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                    <label>New password</label>
                    <Form.Control type="password" placeholder="New password" name="newPassword" value={resetPasswordData.newPassword} onChange={(e)=>handleResetPasswordModalChange(e)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                    <label>Confirm new password</label>
                    <Form.Control type="password" placeholder="Confirm new password" name="confirmNewPassword" value={resetPasswordData.confirmNewPassword} onChange={(e)=>handleResetPasswordModalChange(e)} />
              </Form.Group>
              </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={closeResetPasswordModal}>
              Close
            </Button>
              <Button variant="danger" onClick={handleClickOFResetPassword}>
                Save
              </Button>
          </Modal.Footer>
        </Modal>
        
    </div>
  );
}

export default DeleteUser;