import { useEffect, useState } from "react";
import type { User } from "./types/User";
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Open modal with user details
  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

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
          <div
            className="user-card"
            key={user.id}
            onClick={() => openModal(user)}
            style={{ cursor: "pointer" }}
            title="Click to see details"
          >
            <img src={user.image} alt={user.firstName} />
            <p className="user-name" title={`${user.firstName} ${user.lastName}`}>
              {user.firstName} {user.lastName}
            </p>
            <p className="user-email">{user.email}</p>
            <p className="user-phone">{user.phone}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedUser.firstName} {selectedUser.lastName}</h2>
            <img
              src={selectedUser.image}
              alt={selectedUser.firstName}
              style={{ width: "100px", borderRadius: "50%", margin: "10px 0" }}
            />
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            {/* Add more user details if you want */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
