import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function Store() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [stores, setAllStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      })
      .catch((err) => console.log(err));
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = (store) => {
    setSelectedStore(store);
    setShowEditModal(!showEditModal);
  };

  const deleteStore = (storeId) => {
    fetch(`http://localhost:4000/api/store/delete/${storeId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Refresh the store list after deletion
        } else {
          console.error("Failed to delete store");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12 border-2 p-4">
        <div className="flex justify-between">
          <Typography variant="h5" component="h2" className="font-bold">
            Manage Store
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleAddModal}
          >
            Add Store
          </Button>
        </div>
        {showAddModal && <AddStore onClose={toggleAddModal} />}
        {showEditModal && (
          <AddStore onClose={toggleEditModal} store={selectedStore} />
        )}
        <Grid container spacing={2}>
          {stores.map((element) => (
            <Grid item xs={12} sm={6} md={4} key={element._id}>
              <Card>
                <CardMedia
                  component="img"
                  alt="store"
                  height="200" // Set a fixed height
                  image={element.image}
                  title={element.name}
                  style={{ objectFit: 'cover' }} // Maintain aspect ratio
                />
                <CardContent>
                  <Typography variant="h6" component="div" className="font-bold">
                    {element.name}
                  </Typography>
                  <div className="flex items-center">
                    <img
                      alt="location-icon"
                      className="h-6 w-6"
                      src={require("../assets/location-icon.png")}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {element.address + ", " + element.city}
                    </Typography>
                  </div>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => toggleEditModal(element)}
                    className="mt-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error" // Red color
                    onClick={() => deleteStore(element._id)}
                    className="mt-2 ml-2"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Store;
