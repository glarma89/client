import React, { useState } from 'react'
import Axios from 'axios'

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3002/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("success");
    });
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3002/employees').then((response) => {
      setEmployeeList(response.data);
    });
  };

  return (
    <div className="App">
      <div className='information'>
        <label>Name</label>
        <input 
          type="text"
          onChange={e => setName(e.target.value)}
        />
        <br/>
        <label>Age</label>
        <input 
          type="number"
          onChange={e => setAge(e.target.value)}
        />
        <br/>
        <label>Country</label>
        <input 
          type="text"
          onChange={e => setCountry(e.target.value)}
        />
        <br/>
        <label>Position</label>
        <input 
          type="text"
          onChange={e => setPosition(e.target.value)}
        />
        <br/>
        <label>Wage</label>
        <input 
          type="number"
          onChange={e => setWage(e.target.value)}
        />
        <br/>
        <button onClick={addEmployee}>Add Employee</button>
        <div>------------------------------------------------------------------</div>
        <button onClick={getEmployees}>Show Employees</button>
        <br/>
        {employeeList.map((val, key) => {
          return  (
                  <div className='employee' key={val.id}>
                    <h3>Name: {val.name}</h3>
                    <h3>Age: {val.age}</h3>
                    <h3>Country: {val.country}</h3>
                    <h3>Position: {val.position}</h3>
                    <h3>Wage: {val.wage}</h3>
                  </div>
          )
        })}
      </div>
      
    </div>
  );
}

export default App;



