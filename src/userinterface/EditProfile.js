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



function EditProfile() {
    const [refresh,setrefresh] = useState(false);
    const dispatch=useDispatch();
    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData)[0];
    console.log(user);

    const [username, setUserName] = useState(user.username);
    const [fullName, setFullName] = useState(user.full_name);
    const [website, setWebsite] = useState(user.website);
    const [bio, setBio] = useState(user.bio);
    const [mobilenum_or_email, setMobilenum_or_email] = useState(user.mobilenum_or_email);

    const handleSubmit = async () => {
        let body = {
            userid: user.userid,
            mobilenum_or_email: mobilenum_or_email,
            full_name: fullName,
            username: username,
            website: website,
            bio: bio,

        }
        var result = await postData("user/updateeditprofile", body)
        if (result.status) {
            dispatch({type:"ADD_USER", payload:[user.userid,{...user,...body}]
        })
        setrefresh(!refresh);
        }
        else {
            alert("Record Not Updated")
        }
    }

        const handleUploadFile=async(event)=>{
            var formData= new FormData();
            formData.append('picture', event.target.files[0])
            formData.append('userid',user.userid);
            
            var result=await postData("user/uploadprofile",formData)
          if(result.status){
    
            dispatch({type:"ADD_USER", payload:[user.userid,{...user,picture:result.data}]
        })
        setrefresh(!refresh);

          }
    
        }

        const removeProfilePicture = async () => {
            let body = { userid: user.userid }
    
            var result = await postData("user/removeprofile", body)
            if (result.status) {
    
                dispatch({
                    type: "ADD_USER", payload: [user.userid, { ...user, picture: '' }]
                })
                setrefresh(!refresh);
            }
            setOpen(false)
        }
    
    
        const [open, setOpen] = React.useState(false);
    
        const handleClickOpen = () => {
            setOpen(true);
        };
    
        const handleClose = (value) => {
            setOpen(false);
        };
    

        const showDialog = () => {
            return (<Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs" 
           >
                <DialogTitle style={{ width: '99%', color: '#363636' }} >Change Profile Photo</DialogTitle>
    
                <List sx={{ pt: 0, width:'100%'}}>
    
                    <label for='selectimage' style={{ width: '100%' }}>
    
                        <div style={{ textAlign: 'center', color: '#0095F6', fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="">
                            Upload Photo
                        </div>
    
                        <div style={{ textAlign: 'center', color: '#ED4956', fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" onClick={() => removeProfilePicture()}>
                            Remove Current Photo
                        </div>
    
                        <div style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" onClick={()=>setOpen(false)}>
                            Cancel
                        </div>
                    </label>
                </List>
            </Dialog>)
        };

    return (
        <div style={{ backgroundColor: "#000", color: 'white' }}>
          
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px', paddingRight: '20px', paddingBottom: '0px', paddingLeft: '20px', }}>

              

                    <Grid item xs={9} style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

                        <Grid item container xs={9} spacing={3} style={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={3} style={{ justifyContent: 'flex-end', display: 'flex' }}>

                            <label for='selectimage'>
                            <input type='file' id='selectimage' style={{display:'none'}} onChange={(event)=>handleUploadFile(event)} />
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
                                Username
                                
                            </Grid>

                           

                            <Grid item xs={9} >

                                <CssTextField
                                    placeholder="Name"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setUserName(event.target.value)}
                                    value={username}
                                    inputProps={{style:{color:'white'}}}

                                />
                                
                            </Grid>

                            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                Name
                                
                            </Grid>
                                
                            <Grid item xs={9} >
                                <CssTextField
                                    placeholder="Full Name"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setFullName(event.target.value)}
                                    value={fullName}
                                    inputProps={{style:{color:'white'}}}

                                />
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                Website
                                
                            </Grid>
                            

                                <Grid item xs={9} >
                                <CssTextField
                                    placeholder="Website"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setWebsite(event.target.value)}
                                    value={website}
                                    inputProps={{style:{color:'white'}}}

                                />
                                </Grid>

                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                Bio
                                
                            </Grid>

                                <Grid item xs={9} >
                                <CssTextField
                                    placeholder="Bio"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setBio(event.target.value)}
                                    value={bio}
                                    inputProps={{style:{color:'white'}}}

                                />
                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                Mobile Num/Email
                                
                            </Grid>
                                <Grid item xs={9} >
                                <CssTextField
                                    placeholder="Mobilenum_or_email"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth
                                    style={{ marginTop: "30px" }}
                                    onChange={(event) => setMobilenum_or_email(event.target.value)}
                                    value={mobilenum_or_email}
                                    inputProps={{style:{color:'white'}}}

                                />
                                </Grid>

                                <Grid item xs={9} >
                                <Button
                                    fullWidth
                                    style={{ marginTop: "20px" }}
                                    variant="contained"
                                    size="small"
                                    onClick={handleSubmit}
                                    inputProps={{style:{color:'white'}}}

                                >
                                    Submit
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>

              
            </div>
            {showDialog()}
        </div>

    )
}

export default EditProfile;