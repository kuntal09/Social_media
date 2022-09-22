import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Button, Grid } from '@mui/material';
import userlogo from '../assests/images/user.jpg';
import { serverURL } from "../api/ServerServices";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "../api/ServerServices";
import { useDispatch } from 'react-redux';
import {Divider} from "@mui/material";


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
import settingimage from '../assests/images/settingimage.png';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Box from '@mui/material/Box';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArchiveIcon from '@mui/icons-material/Archive';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  

function Profile() {
    const [refresh, setrefresh] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData)[0];
    console.log(user);

    const handleEditClick = () => {
        navigate('/account/editprofile')
    };

    const handleUploadFile = async (event) => {
        var formData = new FormData();
        formData.append('picture', event.target.files[0])
        formData.append('userid', user.userid);

        var result = await postData("user/uploadprofile", formData)
        if (result.status) {

            dispatch({
                type: "ADD_USER", payload: [user.userid, { ...user, picture: result.data }]
            })
            setrefresh(!refresh);
        }
        setOpen(false)
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
    const [openSetting, setOpenSetting] = React.useState(false);
    const [openFollowing, setOpenFollowing] = React.useState(false);
    const [openFollower, setOpenFollower] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleClickOpenSetting = () => {
        setOpenSetting(true);
    };

    const handleCloseSetting = (value) => {
        setOpenSetting(false);
    };

    const handleClickOpenFollowing = () => {
        setOpenFollowing(true);
    };

    const handleCloseFollowing = (value) => {
        setOpenFollowing(false);
    };

    const handleClickOpenFollower = () => {
        setOpenFollower(true);
    };

    const handleCloseFollower = (value) => {
        setOpenFollower(false);
    };

    const fetchAllFollowersFollowing=async()=>{
        let body={
            userid: user.userid
        }
        const result=await postData ('user/getfollowerandfollowing',body);
        if (result.status){
            dispatch({type:"ADD_USER", payload:[user.userid,{...user, follower:result.data[0].followers, following:result.data[1].following}]
        })
        setrefresh(!refresh);
        }
    }

    useEffect(()=>{
       fetchAllFollowersFollowing() 
       fetchPostByUserId()
    },[])

    const [following, setFollowing] =useState([]);
    const [follower, setFollower] =useState([]);
    const [posts, setPosts]=useState([]);


   
    const fetchAllFollowing=async()=>{
        let body={
     userid    :user.userid
        }
        const result=await postData ('user/followingbysenderid',body);
        if (result.status){
            setFollowing(result.data)
        }
    }

    const fetchPostByUserId=async()=>{
        let body={
            userid:user.userid
        }
        const result=await postData ('user/getpostbyuserid',body);
        if (result.status){
            setPosts(result.data)
        }
    }

    const fetchAllFollower=async()=>{
        let body={
            userid:user.userid
        }
        const result=await postData ('user/followerbyreceiverid',body);
        if (result.status){
            setFollower(result.data)
        }
    }



    const showDialog = () => {
        return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs"
            PaperProps={{ style: { backgroundColor: '#262626', color: 'white', borderRadius: '20px' } }} >
            <DialogTitle style={{  color: 'white',display:'flex', justifyContent:'center' }} >Change Profile Photo</DialogTitle>
            <Divider style={{color:"#121212"}} />

            <List sx={{ pt: 0 }}>

                <label for='selectimage' >

                    <div style={{ display:'flex',justifyContent:'center', alignItems: 'center', color: '#0095F6', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer' }} id="selectimage">
                        Upload Photo
                    </div>
                    </label>
                    <Divider style={{color:"#363636"}} />

                    <div style={{ display:'flex',justifyContent:'center', alignItems: 'center', color: '#ED4956', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} primary="" onClick={() => removeProfilePicture()}>
                        Remove Current Photo
                    </div>
                    <Divider style={{color:"#121212"}} />

                    <div style={{ display:'flex',justifyContent:'center', alignItems: 'center', color: '#fff', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer' }} primary="" onClick={() => setOpen(false)}>
                        Cancel
                    </div>
              
            </List>
        </Dialog>)
    }


    const showDialogSetting=()=>{
        return(
            <div >
        <Dialog onClose={handleCloseSetting} open={openSetting} fullWidth maxWidth="xs" >
    
            <List sx={{ pt: 0 }}>
               
                <div style={{display:'flex',justifyContent:'center', alignItems: 'center', color: '#0095F6', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} onClick={()=>navigate('/changepassword')}> 
                Change Password
                </div>
                <Divider style={{color:"#363636"}} />
    
                <div style={{display:'flex',justifyContent:'center', alignItems: 'center', color: '#0095F6', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} primary="" > 
                QR code
                </div>
                <Divider style={{color:"#363636"}} />
    
                <div style={{display:'flex',justifyContent:'center', alignItems: 'center', color: '#0095F6', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} primary="" > 
                Apps and website
                </div>
                <Divider style={{color:"#363636"}} />

                <div style={{display:'flex',justifyContent:'center', alignItems: 'center', color: '#0095F6', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} primary="" > 
                Notifications
                </div>
                <Divider style={{color:"#363636"}} />
    
                <div style={{display:'flex',justifyContent:'center', alignItems: 'center', color: '#0095F6', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} primary="" > 
                Privacy and Security
                </div>
                <Divider style={{color:"#363636"}} />
    
                <div style={{display:'flex',justifyContent:'center', alignItems: 'center', color: '#0095F6', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} primary="" > 
                Login Activity
                </div>
                <Divider style={{color:"#363636"}} />
    
                <div style={{display:'flex',justifyContent:'center', alignItems: 'center', fontWeight: 'bold',fontSize:'18px',padding:'10px', cursor: 'pointer'}} primary=""> 
                Cancel
                </div>
               
                </List>
        </Dialog>
        </div>
        )
    
    };

    const showFollowingDialog = () => {
        return (
        <Dialog onClose={handleCloseFollowing} open={openFollowing} fullWidth maxWidth="xs" >
            <DialogTitle style={{  color: 'white',display:'flex', justifyContent:'center',color:'#000' }} >Following</DialogTitle>
            <Divider style={{color:"#121212"}} />

            {following.map((item,index)=>{
            return(

              <div style={{ display: "flex", justifyContent: "space-between", flaxDirection:"row" }}>
               <div style={{marginLeft:'10px',cursor:'pointer'}} onClick={()=>navigate("/"+item.username)}>
             
              <img src={item.picture != ""?`${serverURL}/images/${item.picture}`:userlogo} style={{width:34, height:34, borderRadius:'100%'}}/>

              <div style={{display:'flex', justifyContent:'center',marginTop:'10px'}}>
              <div style={{fontSize:'14px', fontWeight:'700'}} >
                  {item.username}
              </div>

              <div style={{fontSize:'14px', color:'#8A8A8A'}} >
                  {item.full_name}
              </div>
              </div>

            </div>
            </div>

            )
        })}

            
        </Dialog>)
    }

    const showFollowerDialog = () => {
        return (
        <Dialog onClose={handleCloseFollower} open={openFollower} fullWidth maxWidth="xs" >
            <DialogTitle style={{  color: 'white',display:'flex', justifyContent:'center',color:'#000' }} >Followers</DialogTitle>
            <Divider style={{color:"#121212"}} />

            {follower.map((item,index)=>{
            return(

              <div style={{ display: "flex", justifyContent: "space-between", flaxDirection:"row" }}>
               <div style={{marginLeft:'10px',cursor:'pointer'}} onClick={()=>navigate("/"+item.username)}>
             
              <img src={item.picture != ""?`${serverURL}/images/${item.picture}`:userlogo} style={{width:34, height:34, borderRadius:'100%'}}/>

              <div style={{display:'flex', justifyContent:'center',marginTop:'10px'}}>
              <div style={{fontSize:'14px', fontWeight:'700'}} >
                  {item.username}
              </div>

              <div style={{fontSize:'14px', color:'#8A8A8A'}} >
                  {item.full_name}
              </div>
              </div>

            </div>
            </div>

            )
        })}

            
        </Dialog>)
    }
    const [value, setValue] = React.useState(0);
    const [tabValue, setTabValue]=React.useState("");
    const handleChange = (event,val) => {
        setValue(val);
      };
    return (
        <div >
            <div>
                <Header />
            </div>
            <div style={{ backgroundColor: "#121212", color: 'white', display: 'flex', justifyContent: 'center' }}>
                <Grid container style={{ width: "80%", paddingLeft: '20px', paddingTop: '30px' }}>
                    <Grid item xs={4}>

                        <label for={user.picture != "" ? "" : "selectimage"} onClick={user.picture != "" ? handleClickOpen : null}>

                            <input type='file' id='selectimage' style={{ display: 'none' }} onChange={handleUploadFile} />

                            <img title={user.picture != "" ? "Change Profile Picture" : "Add Profile Picture"}
                                src={user.picture != '' ? `${serverURL}/images/${user.picture}` : userlogo}
                                style={{ width: 150, height: 150, borderRadius: '100%', cursor: 'pointer' }} />
                        </label>
                    </Grid>

                    <Grid item xs={8}>
                        <div style={{ fontSize: '28px'}}>
                            {user.username}
                            <Button variant='outlined' onClick={() => handleEditClick()}> EditProfile </Button>
                            <img src={settingimage} width="30px" height="30px" onClick={()=>handleClickOpenSetting()} />
                        </div>

                        <div style={{ fontSize: '20px' }}>
                            {user.full_name}

                        </div>

                        <div style={{ marginTop:'15px',display:'flex',justifyContent:'space-between',
                    paddingTop:'5px', paddingBottom:'10px', width:'45%'}}>
                            <span>
                                {posts.length} posts
                            </span>

                            <span style={{cursor:'pointer'}} onClick={()=>{
                  handleClickOpenFollower()
                  fetchAllFollower()}}>
                            {user.follower} Followers 
                            </span>

                            <span style={{cursor:'pointer'}} onClick={()=>{
                  handleClickOpenFollowing()
                  fetchAllFollowing()}}>
                            {user.following} Following
                            </span>
                           
                        </div>
                        <div style={{ whiteSpace: 'pre-line',marginTop:'10px',marginBottom:'10px' }}>
                            {user.bio}
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <a style={{ color: 'white', fontWeight: '600',marginTop:'10px',marginBottom:'10px' }} href={user.website} target="_blank">{user.website} </a>
                        </div>
                    </Grid><Divider style={{width:'100%'}} />
            <Grid item xs={12}>
            <div style={{display:'flex',justifyContent:'center',}} >
            <Tabs value={value} onChange={handleChange} >
            <Tab icon={<PersonPinIcon />} label="POST"  />
            <Tab icon={<BookmarkBorderIcon />} label="SAVED" />
             <Tab icon={<ArchiveIcon />} label="ARCHIVE" />
            </Tabs>

           
            </div>
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
              <TabPanel value={value} index={0} >
         <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
         
        {posts.map((item,index)=>{
         const files=JSON.parse(item.pictures_videos)
         return(
            <div onClick={()=>navigate("/p/"+item.postuuid)} style={{width:271,height:271,background:"#000",marginRight:(index+1)%3==0?0:28,marginTop:(index+1)>3==0?0:28}}> 
             <img src={`${serverURL}/images/${files[0]}`} style={{width:'100%',height:'100%',cursor:'pointer'}} /> 
        </div>
         )
    })}  
         </div>
        </TabPanel>
        </div>
            </Grid>
                </Grid>
            </div>
            
            {showDialog()}
            {showDialogSetting()}
            {showFollowingDialog()}
            {showFollowerDialog()}
           
        </div>
    )
}
export default Profile;