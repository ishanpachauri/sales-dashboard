import { Grid, ListItem, ListItemText, Typography } from '@mui/material';

export const CustomListItem = ({ leftValue, rightValue }) => {
  return (
    <ListItem>
      <Grid container justifyContent="space-between" style={{backgroundColor : '#D6EFF3', marginBottom:'10px'}} alignItems="center">
        <Grid item style={{width:'75%', alignContent:'center'}} >
          <Typography variant="body1" >{leftValue}</Typography>
        </Grid>
        <Grid item style={{backgroundColor : '#8BD0E0' , padding: '8px', width:'25%'}}>
          <Typography variant="body1">${rightValue.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};