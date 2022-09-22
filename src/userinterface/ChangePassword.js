import React from "react";
import { Button, Grid, TextField } from '@mui/material';
import userlogo from '../assests/images/user.jpg';
import { serverURL } from "../api/ServerServices";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { postData } from "../api/ServerServices";
import Header from './Header';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';


const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "black",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "grey",
        },
        "&:hover fieldset": {
            borderColor: "grey",
        },
        "&.Mui-focused fieldset": {
            borderColor: "black",
        },
    },
});



function ChangePassword() {
    const [refresh,setrefresh] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData)[0];
    console.log(user);

    const [userid, setUserid] = useState(user.userid);
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmnewpassword, setConfirmNewPassword] = useState('');

    return (
        <div style={{ backgroundColor: "#0000", color: 'white' }}>
           
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingRight: '20px', paddingBottom: '0px', paddingLeft: '20px', }}>

               

                    <Grid item xs={9} style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                        <Grid item container xs={9} spacing={3} style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>

                            <label for='selectimage'>
                            <input type='file' id='selectimage' style={{display:'none'}}  />
                                <img title={user.picture != "" ? "Change Profile Picture":"Add Profile Picture"}
                                src={user.picture != '' ? `${serverURL}/images/${user.picture}` : userlogo} style={{ width: 38, height: 38, borderRadius: '100%' }} />
                            </label>
                            </Grid>

                            <Grid item xs={9}>
                                {user.username} <br />
                                <a style={{ color: '#0095F6', fontWeight: '600' }}>
                                    Change Profile Photo
                                </a>

                            </Grid>
                        </Grid>

                        <Grid item container xs={9} spacing={3} style={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}>
                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                Old Password
                                
                            </Grid>

                            <Grid item xs={9} >

                                <CssTextField
                                    placeholder=""
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setOldPassword(event.target.value)}
                                    
                                    inputProps={{style:{color:'white'}}}

                                />
                                
                            </Grid>

                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                New Password
                                
                            </Grid>
                                
                            <Grid item xs={9} >
                                <CssTextField
                                    placeholder=""
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                   
                                    inputProps={{style:{color:'white'}}}

                                />
                                </Grid>
                            
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                Confirm New Password
                                
                            </Grid>
                                <Grid item xs={9} >
                                <CssTextField
                                    placeholder=""
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setConfirmNewPassword(event.target.value)}
                                    
                                    inputProps={{style:{color:'white'}}}

                                />
                                </Grid>

                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                               
                                
                            </Grid>

                                <Grid item xs={9} style={{display:'flex', justifyContent:'space-between'}} >
                                <Button
                                    fullWidth
                                    style={{ marginTop: "20px" }}
                                    variant="contained"
                                    size="small"
                                    
                                    inputProps={{style:{color:'white'}}}

                                >
                                    Change Password
                                </Button>
                                <div>
                                    Forgotten Password
                                </div>
                            </Grid>

                        </Grid>
                    </Grid>

               
            </div>
            
        </div>

    )
}

export default ChangePassword;