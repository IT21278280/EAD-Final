import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";
import {
  Button,
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

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  // Fetching Data of All Purchase items
  const fetchPurchaseData = () => {
    fetch(`http://localhost:4000/api/purchase/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        
        {/* Table */}
        <TableContainer component={Paper} className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <Grid container justifyContent="space-between" padding={2}>
            <Typography variant="h6" fontWeight="bold">
              Purchase Details
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addSaleModalSetting}
            >
              Add Purchase
            </Button>
          </Grid>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-medium text-gray-900">Product Name</TableCell>
                <TableCell className="font-medium text-gray-900">Quantity Purchased</TableCell>
                <TableCell className="font-medium text-gray-900">Purchase Date</TableCell>
                <TableCell className="font-medium text-gray-900">Total Purchase Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {purchase.map((element) => (
                <TableRow key={element._id}>
                  <TableCell>{element.ProductID?.name}</TableCell>
                  <TableCell>{element.QuantityPurchased}</TableCell>
                  <TableCell>
                    {new Date(element.PurchaseDate).toLocaleDateString() ===
                    new Date().toLocaleDateString()
                      ? "Today"
                      : element.PurchaseDate}
                  </TableCell>
                  <TableCell>${element.TotalPurchaseAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default PurchaseDetails;
