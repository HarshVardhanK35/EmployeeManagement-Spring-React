/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([])

  const navigator = useNavigate()

  const getAllEmployees = () => {
    EmployeeService.fetchAllEmployees()
      .then((res) => {
        setEmployees(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getAllEmployees()
  }, [])


  const addNewEmployee = () => {
    navigator("/add-employee")
  }

  const showEmployeesList = () => {
    navigator('/employees')
  }

  const editEmployee = (id) => {
    navigator(`/edit-employee/${id}`)
  }

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id)
    .then((res) => {
      getAllEmployees()
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const employeeDetail = (id) => {
    navigator(`/employee-details/${id}`)
  }

	return (
		<div>
			<h2 className="text-center">Employee Management System</h2>

      <div>
        <button type="button" className="btn btn-link" onClick={showEmployeesList}>Employees List</button>
        <button type="button" className="btn btn-link" onClick={addNewEmployee}>Add Employee</button>
      </div>

      <table style={{ margin: "40px" }} className="table table-bordered">
				<thead>
					<tr>
						<th scope="col" style={{textAlign: "center"}}>Employee_id</th>
						<th scope="col">Name</th>
						<th scope="col">Email ID</th>
						<th scope="col">Contact Number</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>

				<tbody>
        {
            employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <th scope="row">
                    <button style={{border: "none", textDecoration: 'underline blue'}}>
                      <a onClick={() => { return employeeDetail(employee.id) }}>{employee.id}</a>
                    </button>
                  </th>
                  <td>{`${employee.firstName} ${employee.lastName}`}</td>
                  <td>{employee.email}</td>
                  <td>{employee.contactNumber}</td>
                  <td><button type="button" className="btn btn-link btn-light" onClick={ () => { return editEmployee(employee.id) } }>Edit</button></td>
                  <td><button type="button" className="btn btn-link btn-light" onClick={ () => { return deleteEmployee(employee.id) } }>Delete</button></td>
                </tr>
              );
            })
          }
				</tbody>
			</table>
		</div>
	);
};

export default ListEmployeeComponent;