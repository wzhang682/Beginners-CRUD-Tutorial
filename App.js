import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("Employee added successfully");
      // Optionally, you can update the employee list after adding
      // This depends on your application flow
      // getEmployee();
    }).catch(error => {
      console.error("Error adding employee:", error);
    });
  };

  const getEmployee = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    }).catch(error => {
      console.error("Error fetching employees:", error);
    });
  };

  return (
    <div className="App">
      <div className='information'>
        <label>Name:</label>
        <input type='text' value={name} onChange={(event) => setName(event.target.value)} />
        <label>Age:</label>
        <input type='number' value={age} onChange={(event) => setAge(event.target.value)} />
        <label>Country:</label>
        <input type='text' value={country} onChange={(event) => setCountry(event.target.value)} />
        <label>Position:</label>
        <input type='text' value={position} onChange={(event) => setPosition(event.target.value)} />
        <label>Wage (year):</label>
        <input type='number' value={wage} onChange={(event) => setWage(event.target.value)} />

        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <hr/>
      <div className='employees'>
        <button onClick={getEmployee}>Show Employees</button>
        {employeeList.map((val, key) => {
          return (
            <div className='employee' key={key}>
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Wage: {val.wage}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
