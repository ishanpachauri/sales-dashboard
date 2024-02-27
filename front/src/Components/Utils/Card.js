import React from 'react';
import { Container, Grid, Typography, TextField, MenuItem, Card, CardContent  } from '@mui/material';

export const CardDiv = (props) => {
  return (
    <Card style={{ height: '100px' }}>
      <CardContent>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={3} md={3}>
        <img src={props.icon} className='card-image'/>
          </Grid>
        <Grid item xs={9} md={9}>
        <Typography variant="subtitle1">
          {props.title}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {props.number}
        </Typography>
        </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
