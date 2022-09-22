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
import { Navigate, Router, useLocation } from "react-router-dom";
import {Routes,Route} from 'react-router-dom';
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";


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



function Account() {
    const [refresh,setrefresh] = useState(false);
    const navigate= useNavigate();
    const dispatch=useDispatch();
    var location=useLocation()
    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData)[0];
    console.log(user);

    const [username, setUserName] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);
    const [website, setWebsite] = useState(user.website);
    const [bio, setBio] = useState(user.bio);
    const [mobilenum_or_email, setMobilenum_or_email] = useState(user.mobilenum_or_email);

    
          const [open, setOpen] = React.useState(false);
    
        const handleClickOpen = () => {
            setOpen(true);
        };
    
        const handleClose = (value) => {
            setOpen(false);
        };
    

       
    return (
        <div style={{ backgroundColor: "#121212", color: 'white' }}>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingRight: '20px', paddingBottom: '0px', paddingLeft: '20px', }}>

                <Grid container style={{ width: '80%', border: '1px solid #363636', backgroundColor: 'black' }}>

                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center', borderRight: '1px solid #363636' }}>
                        <div>
                    <List
        component="nav"
        aria-label="Device settings"
       style={{backgroundColor:'#0000'}}
      >
        <ListItem
          button onClick={()=>navigate("/account/editprofile")}
          style={{borderLeft:location.pathname=='/account/editprofile'?'2px solid white':'',width:'100%'}}>

            <div style={{fontWeight:location.pathname=="/account/editprofile"?"600":"",padding:"10px"}}>Edit Profile</div>
</ListItem>
           <ListItem button onClick={()=>navigate("/account/changepassword")}
          style={{borderLeft:location.pathname=='/account/changepassword'?'2px solid white':'',width:'100%'}}>

            <div style={{fontWeight:location.pathname=="/account/changepassword"?"600":"",padding:"10px"}}>Change Password</div>
          
        
        </ListItem>

        <ListItem>
            <div>Apps and websites</div>
        </ListItem>

        <ListItem>
            <div>Email Notifications</div>
        </ListItem>

        <ListItem>
            <div>Push Notifications</div>
        </ListItem>

        <ListItem>
            <div>Manage Contacts</div>
        </ListItem>

        <ListItem>
            <div>Privacy and Security</div>
        </ListItem>

        <ListItem>
            <div>Login Activity</div>
        </ListItem>

        <ListItem>
            <div>Emails from Instagram</div>
        </ListItem>

        <ListItem>
            <div>Help</div>
        </ListItem>
      </List>
      </div>
                    </Grid>

                    <Grid item xs={9} style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <div>
                
                <Routes>
                    <Route element={<EditProfile />} path={'/editprofile'} />
                    <Route element={<ChangePassword />} path={'/changepassword'} />
                </Routes>
                 
                </div>
                        
                    </Grid>

                </Grid>
            </div>
            
        </div>

    )
}

export default Account;