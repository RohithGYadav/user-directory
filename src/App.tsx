import { useEffect, useState } from "react";
import type { User } from "./types/User";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading users...</h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>User Directory</h1>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.image} alt={user.firstName} />
            <p className="user-name">
              {user.firstName} {user.lastName}
            </p>
            <p className="user-email">{user.email}</p>
            <p className="user-phone">{user.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
