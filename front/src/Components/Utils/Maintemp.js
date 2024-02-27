import React from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import {Outlet} from "react-router-dom";
import { Container, Grid } from '@mui/material';

export const Maintemp = () => {
  return (
    <>
    <Header />
    <Container style={{ margin: 0, padding: 0, maxWidth: '100%'}}>
    <Grid container>
        <Grid item xs={12} md={3} style={{ maxWidth: '20%'}}>
        <Sidebar />
        </Grid>
        <Grid item xs={12} md={9} style={{ maxWidth: '80%', marginTop : '10px'}}>
            <Outlet />
        </Grid>
      </Grid>
      </Container>
    </>
  )
}
