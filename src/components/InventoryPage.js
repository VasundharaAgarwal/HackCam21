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

export default function InventoryPage(props) {
    const createData = (product, quantity) => {
        return { product, quantity};
      }
    const rows = [
        createData('Onion', '100'),
        createData('Pepper', '90'),
        createData('Garlic', '95'),
        createData('Tomato', '80'),
        createData('Potato', '65')
      ];
    return (<div id="inventory-page">
        <div id="inventory-table">
            <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity Left</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.product}>
                    <TableCell component="th" scope="row">
                        {row.product}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        
    </div>)
}