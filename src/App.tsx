import { useEffect, useState } from "react";
import type { User } from "./types/User";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="user-list">
        {filteredUsers.map((user) => (
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
