import React, { useState } from 'react'
import Axios from 'axios'

function App1() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3002/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3002/employees').then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3002/update', {wage: newWage, id: id}).then(
      (response) => {
        setEmployeeList(employeeList.map((val) => {
          return val.id === id ? {
            id: val.id, 
            name: val.name, 
            age: val.age, 
            country: val.country, 
            position: val.position, 
            wage: newWage} : val
        }))
      }
    )
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
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
                    <div>
                      <h3>Name: {val.name}</h3>
                      <h3>Age: {val.age}</h3>
                      <h3>Country: {val.country}</h3>
                      <h3>Position: {val.position}</h3>
                      <h3>Wage: {val.wage}</h3>
                    </div>
                    <div>
                      <input 
                        type="text" 
                        placeholder='2000...'
                        onChange={e => setNewWage(e.target.value)}
                        />
                      <button 
                        onClick={() => {updateEmployeeWage(val.id)}}
                      >
                        {" "}
                        Update
                      </button>
                      <button
                        onClick={() => {deleteEmployee(val.id)}}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
          )
        })}
      </div>
      
    </div>
  );
}

export default App1;



