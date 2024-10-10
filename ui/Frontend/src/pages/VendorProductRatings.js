import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import AddRating from "../components/AddRating";
import UpdateRating from "../components/UpdateRating";
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
import "./VendorProductRatings.css";

function VendorProductRatings() {
  const [showAddRatingModal, setShowAddRatingModal] = useState(false);
  const [showUpdateRatingModal, setShowUpdateRatingModal] = useState(false);
  const [updateRatingData, setUpdateRatingData] = useState(null);
  const [ratings, setRatings] = useState([
    { _id: "1", vendorName: "Vendor A", productName: "Product X", rating: 4, comment: "Great product!" },
    { _id: "2", vendorName: "Vendor B", productName: "Product Y", rating: 5, comment: "Excellent service!" },
    { _id: "3", vendorName: "Vendor C", productName: "Product Z", rating: 3, comment: "Could be better." },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchRatings();
    fetchVendors();
  }, [refresh]);

  const fetchRatings = () => {
    // Add API fetch here if needed
  };

  const fetchVendors = () => {
    // Add API fetch here if needed
  };

  const toggleAddRatingModal = () => {
    setShowAddRatingModal(!showAddRatingModal);
  };

  const toggleUpdateRatingModal = (rating) => {
    setUpdateRatingData(rating);
    setShowUpdateRatingModal(!showUpdateRatingModal);
  };

  const deleteRating = (id) => {
    const updatedRatings = ratings.filter((rating) => rating._id !== id);
    setRatings(updatedRatings);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <Paper elevation={3} className="MuiPaper-root">
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          Vendor & Product Ratings
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={toggleAddRatingModal} fullWidth>
              Add Rating
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              placeholder="Search ratings"
              value={searchTerm}
              onChange={handleSearchTerm}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      {showAddRatingModal && (
        <AddRating
          toggleModal={toggleAddRatingModal}
          refreshRatings={() => setRefresh(!refresh)}
        />
      )}

      {showUpdateRatingModal && (
        <UpdateRating
          ratingData={updateRatingData}
          toggleModal={toggleUpdateRatingModal}
          refreshRatings={() => setRefresh(!refresh)}
        />
      )}

      <TableContainer component={Paper} className="table-responsive">
        <Table aria-label="Vendor and Product Ratings Table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold',  fontSize: 20 }}>Vendor</TableCell>
              <TableCell style={{ fontWeight: 'bold',  fontSize: 20  }}>Product</TableCell>
              <TableCell style={{ fontWeight: 'bold',  fontSize: 20  }}>Rating</TableCell>
              <TableCell style={{ fontWeight: 'bold',  fontSize: 20  }}>Comment</TableCell>
              <TableCell style={{ fontWeight: 'bold',  fontSize: 20  }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings
              .filter((rating) =>
                rating.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rating.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rating.comment.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((rating) => (
                <TableRow key={rating._id}>
                  <TableCell>{rating.vendorName}</TableCell>
                  <TableCell>{rating.productName}</TableCell>
                  <TableCell>{rating.rating} / 5</TableCell>
                  <TableCell>{rating.comment}</TableCell>
                  <TableCell>
                    <div className="d-flex">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => toggleUpdateRatingModal(rating)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => deleteRating(rating._id)}
                      >
                        Delete
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

export default VendorProductRatings;
