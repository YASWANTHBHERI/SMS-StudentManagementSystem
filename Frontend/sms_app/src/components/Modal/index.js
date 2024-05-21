import React from "react";
import "./index.css";


const Modal = ({studentRollNo,studentName,studentAddress,studentEmail,onChangestudentRollNo,onChangestudentName,onChangestudentAddress,onChangestudentEmail, handleApiCall,clickAddStudent,cancelAddStudent,method}) => {


  const handleStudentRollNoInput = (event) =>{
    onChangestudentRollNo(event);
  }
  const handleStudentNameInput = (event) =>{
    onChangestudentName(event);
  }
  const handleStudentAddressInput = (event) =>{
    onChangestudentAddress(event);
  }
  const handleStudentEmailInput = (event) =>{
    onChangestudentEmail(event);
  }

  const handleFormSubmission = (event) =>{
    console.log("submit clicked");
    event.preventDefault();
    handleApiCall();
  }

  const handleCloseStudentBtn=()=>{
    clickAddStudent(false,"post","close");
  }

  const handleCancelStudentBtn = () =>{
    cancelAddStudent(false)
  }

  let submitButton;
  let cancelButton;

  if(method === "post"){
    submitButton = <button type="submit" className="btn-studentSubmit">
    submit
  </button>;
    cancelButton = <button type="button" className="btn-studentclose" onClick={handleCloseStudentBtn}>
    close
  </button>;
  }
  if(method === "put"){
    submitButton = <button type="submit" className="btn-studentSubmit">
    Update
  </button>;
    cancelButton = <button type="button" className="btn-studentclose" onClick={handleCancelStudentBtn}>
    cancel
  </button>;
  }

  return (
    <div className="modal-outer-container">
      <div className="modal-container">
        <form className="sms-form" onSubmit={handleFormSubmission}>
          {cancelButton}        
          <input
            type="text"
            placeholder="Student RollNo"
            className="studentRollNo input"
            required
            value={studentRollNo}
            onChange={handleStudentRollNoInput}
            
          />
          <input
            type="text"
            placeholder="Student name"
            className="studentName input"
            required
            value={studentName}
            onChange={handleStudentNameInput} 
          />

          <input
            type="text"
            placeholder="Student Address"
            className="studentAddress input"
            required
            value={studentAddress}
            onChange={handleStudentAddressInput}
          />

          <input
            type="email"
            placeholder="Student Email"
            className="studentEmail input"
            required
            value={studentEmail}
            onChange={handleStudentEmailInput}

          />
          {submitButton}
          
        </form>
      </div>
    </div>
  );
};

export default Modal;
