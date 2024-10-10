import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Modal,
  Box,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const CreateOrderForm = ({ open, onClose, onCreate }) => {
  const [customerName, setCustomerName] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Math.floor(Math.random() * 1000), // Generates a random ID
      customerName,
      orderStatus,
      orderDate,
      deliveryDate,
    };

    onCreate(newOrder);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setCustomerName("");
    setOrderStatus("Pending");
    setOrderDate("");
    setDeliveryDate("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component={Paper}
        sx={{
          padding: 3,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Create New Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Customer Name"
                fullWidth
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required size="small">
                <InputLabel>Order Status</InputLabel>
                <Select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  label="Order Status"
                  size="small" // Make the select smaller
                  sx={{ padding: "6px 10px" }} // Adjust padding for a smaller appearance
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Order Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Delivery Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" color="primary">
                Create Order
              </Button>
              <Button variant="outlined" onClick={onClose} sx={{ marginLeft: 2 }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateOrderForm;
