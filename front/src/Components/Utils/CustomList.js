import React from 'react';
import { Grid, Typography, TextField, MenuItem, Card, CardContent, ListItem, CardHeader  } from '@mui/material';
import {CustomListItem} from './CustomListItem';

export const CustomList = (props) => {
  return (
          <Card>
          <CardHeader title={<Typography variant="h6">{props.title}</Typography>} />
            <CardContent>
              
            <Grid container alignItems="center" spacing={2}>
                <ListItem>
                  <Grid container justifyContent="space-between">
                    <Grid item >
                      <Typography variant="body1" >{props.header}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">Sales in $</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {
                  props.listData ? Object.keys(props.listData).map((val, key) => {
                    return <CustomListItem  leftValue={val} rightValue={props.listData[val]}/>
                  }) : null
                }
              </Grid>
            </CardContent>
          </Card>
        // </Grid>
  )
}
