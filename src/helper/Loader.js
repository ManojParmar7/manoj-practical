
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import { Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const loaderUserTable=()=> {
    const variants = ['h1', 'h3', 'body1', 'caption'];

    function TypographyDemo(props) {
      const { loading = false } = props;
    
      return (
        <div>
          {variants.map((variant) => (
            <Typography component="div" key={variant} variant={variant}>
              {loading ? <Skeleton /> : variant}
            </Typography>
          ))}
        </div>
      );
    }
    
    TypographyDemo.propTypes = {
      loading: PropTypes.bool,
    };


return(
  
<>

<Paper sx={{ margin: '1%' }}>
    <TableCell ><Skeleton variant="text" width={100} /> </TableCell>
                    <div style={{ margin: '1%' }}>
                        <Grid container spacing={8}>
      <Grid item xs>
        <TypographyDemo loading />
      </Grid>
      
    </Grid>
                    </div>
                    <div style={{ margin: '1%' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    
                                    <TableRow >
                                     
                                            <TableCell ><Skeleton variant="text" width={100} /> </TableCell>
                                            <TableCell ><Skeleton variant="text" width={100} /> </TableCell> <TableCell ><Skeleton variant="text" width={100} /></TableCell> <TableCell ><Skeleton variant="text" width={100} /> </TableCell><TableCell ><Skeleton variant="text" width={100} /> </TableCell><TableCell ><Skeleton variant="text" width={100} /> </TableCell>
                                    
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    
                                   
                                                    <TableRow >
                                                        <TableCell> <Skeleton variant="text" width={100} /></TableCell>
                                                        <TableCell> <Skeleton variant="text" width={100} /></TableCell>
                                                        <TableCell> <Skeleton variant="text" width={100} /></TableCell>
                                                        <TableCell> <Skeleton variant="text" width={100} /></TableCell>
                                                        <TableCell> <Skeleton variant="text" width={100} /></TableCell>
                                                        <TableCell> <Skeleton variant="text" width={100} /></TableCell>
                                                        <TableCell>
                                                          
                                                        </TableCell>
                                                    </TableRow>
                                              
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </div>
                </Paper>
</>
)

                    }

export default loaderUserTable