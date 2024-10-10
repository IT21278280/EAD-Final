import React, { useState } from "react"; 
import CreateOrderForm from "../components/CreateOrderForm";
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
  Grid
} from "@mui/material";

function OrderManagement() {
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);
  const [updateOrderData, setUpdateOrderData] = useState(null);
  const [orders, setOrders] = useState([
    { id: 1, customerName: "John Doe", orderStatus: "Pending", orderDate: "2024-09-15", deliveryDate: "2024-09-20" },
    { id: 2, customerName: "Jane Smith", orderStatus: "Shipped", orderDate: "2024-09-10", deliveryDate: "2024-09-15" },
    { id: 3, customerName: "Mark Lee", orderStatus: "Delivered", orderDate: "2024-09-12", deliveryDate: "2024-09-18" },
    { id: 4, customerName: "Emily Clark", orderStatus: "Cancelled", orderDate: "2024-09-17", deliveryDate: null },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggles the Create Order Modal
  const toggleCreateOrderModal = () => {
    setShowCreateOrderModal(!showCreateOrderModal);
  };

  // Toggles the Update Order Modal and passes the selected order
  const toggleUpdateOrderModal = (order) => {
    setUpdateOrderData(order);
    setShowUpdateOrderModal(!showUpdateOrderModal);
  };

  // Handles creating a new order and adds it to the orders list
  const handleCreateOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  // Handles deleting an order
  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  // Handles search input
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <Paper elevation={3} className="MuiPaper-root">
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          Order Management
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={toggleCreateOrderModal} fullWidth>
              Create Order
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              placeholder="Search orders"
              value={searchTerm}
              onChange={handleSearchTerm}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Create Order Modal */}
      <CreateOrderForm
        open={showCreateOrderModal}
        onClose={toggleCreateOrderModal}
        onCreate={handleCreateOrder}
      />

      {/* Order Table */}
      <TableContainer component={Paper} className="table-responsive mt-4">
        <Table aria-label="Order Management Table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}>Customer Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}>Order Status</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}>Order Date</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}>Delivery Date</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: 20 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .filter((order) =>
                order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.deliveryDate ? order.deliveryDate : "N/A"}</TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <Button
                        variant="contained"
                        color="success"
                        className="btn btn-success me-2"
                        onClick={() => toggleUpdateOrderModal(order)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        className="btn btn-danger"
                        onClick={() => deleteOrder(order.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderManagement;
