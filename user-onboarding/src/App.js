import {useState} from 'react';
import Form from './components/Form';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <Form users={users} setUsers={setUsers} />
      {users.map(user => {
        return (
          <div key={user.id}>
            <p>List of users</p>
            <p>{user.name}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
