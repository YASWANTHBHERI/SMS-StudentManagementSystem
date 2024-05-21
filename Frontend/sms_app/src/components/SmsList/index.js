import { Component } from "react";
import Modal from "../Modal";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import { IoAddCircleOutline } from "react-icons/io5";

class SmsList extends Component {
  state = {
    smsList: [],
    studentName:"",
    studentAddress:"",
    studentEmail:"",
    studentRollNo:"",
    addStudentBtn:false,
    currentApiCall:"",
    method:"post",
    updateId:null,
    springStudentsApiCallUrl:"http://localhost:8080/api/students",
    modalState:"close",
  };


  componentDidMount() {
    this.getAllStudents()
  }

  getAllStudents = () =>{
    console.log("get all students api called");
    this.setState({currentApiCall:"getStudents"})
      axios
        .get("http://localhost:8080/api/students")
        .then((response) => {
          console.log(response);
          const data = response.data;
          console.log(data);
          this.setState({ smsList: data, currentApiCall:"addStudent" });
        })
        .catch((error) => {
          console.log("error", error);
        });
  }

  onChangeGetStudentRollNo = (event) => {
    // console.log(event.target.value);
    const studentRollNo = event.target.value;
    this.setState({studentRollNo:studentRollNo});
  }
  onChangeGetStudentName = (event) => {
    // console.log(event.target.value);
    const studentName = event.target.value;
    this.setState({studentName:studentName});
  }
  onChangeGetStudentAddress = (event) => {
    const studentAddress = event.target.value;
    this.setState({studentAddress:studentAddress});
  }
  onChangeGetStudentEmail = (event) => {
    const studentEmail = event.target.value;
    this.setState({studentEmail:studentEmail});
  }

  studentApiCall = (data) =>{
    const postData = JSON.stringify(data);
    const method = this.state.method;
    axios({
      method: method,
      url: this.state.springStudentsApiCallUrl,
      data: postData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("post response", response);
      this.getAllStudents();
      this.setState({
        studentRollNo: "",
        studentName: "",
        studentAddress: "",
        studentEmail: "",
        currentApiCall: "addStudent",
        addStudentBtn:false
      });
    })
    .catch((error) => {
      console.error("Error adding student", error);
      this.setState({ currentApiCall: "" });
    });
  }

  apiCall = () =>{
    const {studentRollNo,studentName,studentAddress,studentEmail} = this.state;
    const data = {studentRollNo,studentName,studentAddress,studentEmail};
    this.studentApiCall(data);
  }

  addApiCall = () =>{
    this.setState({currentApiCall:"addStudent",method:"post",springStudentsApiCallUrl:"http://localhost:8080/api/students"});
    this.apiCall();
  }

  updateStudent = (id) =>{
    const updateApiUrl = "http://localhost:8080/api/students/"+id;
    this.setState({
      currentApiCall:"updateStudent",
      method:"put",updateId:id,
      springStudentsApiCallUrl:updateApiUrl,
      addStudentBtn:true,
    });
    this.getStudentByIdApiCall(id);
  }

  getStudentByIdApiCall = (id) =>{

    axios
        .get("http://localhost:8080/api/students/"+id)
        .then((response) => {
          console.log(response);
          const data = response.data;
          console.log(data);
          this.setState({
            studentRollNo:data.studentRollNo,
            studentAddress:data.studentAddress,
            studentName:data.studentName,
            studentEmail:data.studentEmail
          })
        })
        .catch((error) => {
          console.log("error", error);
        });
  }

  updateApiCall = () => {
    this.apiCall();
  }


  handleApiCall = () =>{
    const {currentApiCall} = this.state;
    console.log(this.state.currentApiCall);
    switch(currentApiCall){
      case "addStudent":
        this.addApiCall();
        break;
      case "updateStudent":
        this.updateApiCall();
        break;
      default:
        return;
    }
  }

  clickAddStudent = (value,method,modal) => {
    this.setState({
      addStudentBtn:value, 
      method:method,
      modalState:modal
    })
  }

  cancelAddStudent = (value) =>{
    this.setState({
      addStudentBtn:value,
      studentName:"",
      studentAddress:"",
      studentRollNo:"",
      studentEmail:"",
      springStudentsApiCallUrl:"http://localhost:8080/api/students"
    })
  }


  deleteStudent = (id) => {
    axios
        .delete("http://localhost:8080/api/students/"+id)
        .then((response) => {
          console.log(response);
          this.getAllStudents();          
        })
        .catch((error) => {
          console.log("error", error);
        });
  }


  render() {
    const { smsList,studentName,studentEmail,studentAddress,studentRollNo,method } = this.state;
    return (
      <div className="sms-list-container">
        {this.state.addStudentBtn ? <Modal 
        smsList = {smsList} 
        studentName={studentName}
        studentAddress={studentAddress}
        studentEmail={studentEmail}
        studentRollNo = {studentRollNo}
        method = {method}
        clickAddStudent = {this.clickAddStudent}
        cancelAddStudent = {this.cancelAddStudent}
        onChangestudentRollNo = {this.onChangeGetStudentRollNo}
        onChangestudentName = {this.onChangeGetStudentName}
        onChangestudentAddress = {this.onChangeGetStudentAddress}
        onChangestudentEmail = {this.onChangeGetStudentEmail}
        handleApiCall={this.handleApiCall}
        /> : <div className="addStudent-container">
                  {/* <IoAddCircleOutline className="add-icon"/> */}
                  <button className="addStudent-btn" onClick={()=>this.clickAddStudent(true,"post","open")}>Add Students</button>
          </div>
      }
        
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student RollNo</th>
              <th scope="col">Student Name</th>
              <th scope="col">Student Address</th>
              <th scope="col">Student Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {smsList.map(student=>(
                <tr key={student.id}>
                <td>{student.studentRollNo}</td>
                <td>{student.studentName}</td>
                <td>{student.studentAddress}</td>
                <td>{student.studentEmail}</td>
                <td>
                    <div className="action-buttons">
                        <button className="btn btn-dark action-btns" onClick = {()=>this.updateStudent(student.id)}>Update</button>
                        <button className="btn btn-danger action-btns" onClick = {()=>this.deleteStudent(student.id)}>Delete</button>
                    </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    );
  }
}
export default SmsList;
