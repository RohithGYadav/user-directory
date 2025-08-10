import { useEffect, useState } from "react";
import type { User } from "./types/User";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesName = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender =
      genderFilter === "" || user.gender.toLowerCase() === genderFilter;
    return matchesName && matchesGender;
  });

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

      <div className="controls">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Gender Filter */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="user-list">
        {filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.image} alt={user.firstName} />
            <p className="user-name" title={`${user.firstName} ${user.lastName}`}>
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
