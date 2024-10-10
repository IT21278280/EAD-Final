import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// User roles for the system
const roles = ["Administrator", "Vendor", "CSR"];

function UserManagement() {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", role: "Administrator" },
    { id: 2, name: "Bob", role: "Vendor" },
    { id: 3, name: "Charlie", role: "CSR" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", role: "CSR" });
  const [editUser, setEditUser] = useState({ id: null, name: "", role: "CSR" });

  // Toggles the Create User Modal
  const toggleCreateUserModal = () => {
    setShowCreateUserModal(!showCreateUserModal);
  };

  // Toggles the Edit User Modal
  const toggleEditUserModal = (user) => {
    setEditUser(user);
    setShowEditUserModal(!showEditUserModal);
  };

  // Handles creating a new user and adds it to the users list
  const handleCreateUser = () => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { id: Math.floor(Math.random() * 1000), ...newUser },
    ]);
    toggleCreateUserModal(); // Close the modal after adding the user
    setNewUser({ name: "", role: "CSR" }); // Reset form
  };

  // Handles editing an existing user
  const handleEditUser = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === editUser.id ? editUser : user))
    );
    toggleEditUserModal(); // Close the modal after editing the user
  };

  // Handles deleting a user
  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  // Handles search input
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handles input for creating a new user
  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handles input for editing a user
  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <Paper elevation={3} className="MuiPaper-root">
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          User Management
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleCreateUserModal}
              fullWidth
            >
              Create User
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              placeholder="Search users"
              value={searchTerm}
              onChange={handleSearchTerm}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Create User Modal */}
      {showCreateUserModal && (
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Create New User</Typography>
          <TextField
            label="User Name"
            name="name"
            value={newUser.name}
            onChange={handleUserChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={newUser.role}
              onChange={handleUserChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateUser}
          >
            Create User
          </Button>
          <Button variant="outlined" onClick={toggleCreateUserModal}>
            Cancel
          </Button>
        </Paper>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Edit User</Typography>
          <TextField
            label="User Name"
            name="name"
            value={editUser.name}
            onChange={handleEditChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={editUser.role}
              onChange={handleEditChange}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleEditUser}>
            Update User
          </Button>
          <Button variant="outlined" onClick={toggleEditUserModal}>
            Cancel
          </Button>
        </Paper>
      )}

      {/* User Table */}
      <TableContainer component={Paper} className="table-responsive mt-4">
        <Table aria-label="User Management Table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                User Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                Role
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: 20 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.role.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => toggleEditUserModal(user)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
