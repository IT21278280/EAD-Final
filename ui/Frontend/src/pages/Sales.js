import React, { useState, useEffect, useContext } from "react";
import AddSale from "../components/AddSale";
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

function Sales() {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [sales, setAllSalesData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchSalesData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetching Data of All Sales
  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/sales/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllSalesData(data);
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

  // Fetching Data of All Stores
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setShowSaleModal(!showSaleModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showSaleModal && (
          <AddSale
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            stores={stores}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table */}
        <TableContainer component={Paper} className="table-responsive">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <Typography variant="h5" component="h2" className="font-bold">
              Sales
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addSaleModalSetting}
            >
              Add Sales
            </Button>
          </div>
          <Table aria-label="Sales Table">
            <TableHead>
              <TableRow>
                <TableCell className="font-medium text-gray-900">Product Name</TableCell>
                <TableCell className="font-medium text-gray-900">Store Name</TableCell>
                <TableCell className="font-medium text-gray-900">Stock Sold</TableCell>
                <TableCell className="font-medium text-gray-900">Sales Date</TableCell>
                <TableCell className="font-medium text-gray-900">Total Sale Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sales.map((element) => (
                <TableRow key={element._id}>
                  <TableCell className="text-gray-900">{element.ProductID?.name}</TableCell>
                  <TableCell className="text-gray-700">{element.StoreID?.name}</TableCell>
                  <TableCell className="text-gray-700">{element.StockSold}</TableCell>
                  <TableCell className="text-gray-700">{element.SaleDate}</TableCell>
                  <TableCell className="text-gray-700">${element.TotalSaleAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Sales;
