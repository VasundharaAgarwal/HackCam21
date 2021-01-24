import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { setPage} from "../redux/main";
import { connect } from "react-redux"
import { buttonStyle } from './LandingPage'
function BuyerHomePage(props) {
    const createData = (product, quantity, sales_amount) => {
        return { product, quantity, sales_amount };
      }
      const buttonStyle = {
        borderRadius: "10px",
        backgroundColor: "#f2ebd8",
        fontFamily: "Quicksand",
        fontWeight: "bold",
    }     
    const rows = [
        createData('Onion', '12', '80'),
        createData('Tomato', '10', '50'),
        createData('Pepper', '2','40'),
        createData('Garlic', '3', '30'),
        createData('Potato', '5', '20'),
      ];
    return (<div id="buyer-home-page">
        <div id="sales-table">
            <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity Sold</TableCell>
                    <TableCell align="right">Total Sales Amount</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.product}>
                    <TableCell component="th" scope="row">
                        {row.product}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.sales_amount}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
         <div id="explanatory-text">Data from the past 7 days</div>
        <div id="button-group">
            <Button className="buyer-button" variant="outlined" onClick={() => props.setPage(9)} style={buttonStyle}>{"Manage Inventory"}</Button>
            <Button className="buyer-button" variant="outlined" style={buttonStyle}>{"View Orders"} </Button>
            <Button className="buyer-button" onClick={() => props.setPage(8)} style={buttonStyle} variant="outlined">{"User Insights"}</Button>
        </div>
        
    </div>)
}

const mapStateToProps = (state) => ({
    page : state.page,
  });
  
  const mapDispatchToProps = {
    setPage
  };
  
  const BuyerHomeContainer = connect(mapStateToProps, mapDispatchToProps)(BuyerHomePage);
  export default BuyerHomeContainer;