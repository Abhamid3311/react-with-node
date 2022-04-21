import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUsers = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    //post data to server
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        const newUser = [...users, data];
        setUsers(newUser);
      })
  }

  return (
    <div className="App">
      <h2>My own data {users.length}</h2>
      <form onSubmit={handleAddUsers} >
        <input type="text" name='name' placeholder='enter name' required />
        <input type="email" name='email' placeholder='enter email' required />
        <input type="submit" value="Add user" />
      </form>


      {
        users.map(user => <li key={user.id}>Name:{user.name} Email: {user.email}</li>)
      }
    </div>
  );
}

export default App;
