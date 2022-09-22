import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Button, Grid } from '@mui/material';
import userlogo from '../assests/images/user.jpg';
import { serverURL } from "../api/ServerServices";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { postData } from "../api/ServerServices";
import { useDispatch } from 'react-redux';


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
import { useParams } from 'react-router-dom';
import { Divider } from "@mui/material";

function UserProfile() {
    const [refresh, setrefresh] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData)[0];
    console.log(user);
    const [getUserData, setUserData] = useState({});
    const [btnStatus, setbtnStatus] = useState('follow');
    const [followerFollowing, setFollowerFollowing]= useState({});
    const [openFollowing, setOpenFollowing] = React.useState(false);
    const [openFollower, setOpenFollower] = React.useState(false);
    

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

    
    const [following, setFollowing] =useState([]);
    const [follower, setFollower] =useState([]);

    const fetchAllFollowing=async()=>{
        let body={
            username: params.username,
        }
        const result=await postData ('user/followingbysenderidofuser',body);
        if (result.status){
            setFollowing(result.data)
        }
    }

    const fetchAllFollower=async()=>{
        let body={
            username: params.username,
        }
        const result=await postData ('user/followerbyreceiveridofuser',body);
        if (result.status){
            setFollower(result.data)
        }
    }


    const fetchUserData = async () => {
        let body = {
            username: params.username,
            senderuserid: user.userid
        }
        var result = await postData("user/userbyuserid", body);
        if (result.status) {
            setUserData(result.data)
            if (result.data.requeststatus != null) {
                setbtnStatus("requested")
            }
            else {
                setbtnStatus("follow")
            }
        }
    }

    useEffect(() => {
        if (params.username == user.username) {
            navigate("/profile")
        }
        else {
            fetchUserData();
            fetchAllFollowerAndFollowingofUser();

        }

    }, [params.username])

    const fetchAllFollowerAndFollowingofUser = async () => {
        let body = {
            username: params.username
        }
        var result = await postData("user/getfollowerandfollowingofuser", body);
        if (result.status) {
            console.log(result.data[0].followers)
            console.log(result.data[1].followers)

            const response={
                followers:result.data[0].followers,
                following:result.data[1].following
        
            }
            setFollowerFollowing(response);

        }
    }

    const handleRequest = async () => {
        let body = {
            receiveruserid: getUserData.userid,
            senderuserid: user.userid,
        }
        const result = await postData("user/followrequest", body);
        if (result.status) {
            setbtnStatus('requested')
        }

    }

    const cancelRequest = async () => {
        let body = {
            receiveruserid: getUserData.userid,
            senderuserid: user.userid,
        }
        const result = await postData("user/deletefollowrequest", body);
        if (result.status) {
            setbtnStatus('follow')
        }

    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };


    const showDialog = () => {
        return (
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs"
                PaperProps={{ style: { backgroundColor: '#262626', color: 'white', borderRadius: '20px' } }} >
                <DialogTitle style={{ color: 'white', display: 'flex', justifyContent: 'center' }} ></DialogTitle>
                <Divider style={{ color: "#121212" }} />

                <List sx={{ pt: 0 }}>
                    <label>
                        <img src={getUserData.picture} onClick={() => handleClickOpen()} />
                    </label>

                    <div>
                        If u change your mind, you'll have to request to join <br />
                        {getUserData.username} again.
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ED4956', fontWeight: 'bold', fontSize: '18px', padding: '10px', cursor: 'pointer' }} primary="" >
                        Unfollow
                    </div>
                    <Divider style={{ color: "#121212" }} />

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px', padding: '10px', cursor: 'pointer' }} primary="" onClick={() => setOpen(false)}>
                        Cancel
                    </div>

                </List>
            </Dialog>)
    }

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


    


    return (
        <div >
            <div>
                <Header />
            </div>
            <div style={{ backgroundColor: "#121212", color: 'white', display: 'flex', justifyContent: 'center' }}>
                <Grid container style={{ width: "80%", paddingLeft: '20px', paddingTop: '30px', width: '80%' }}>
                    <Grid item xs={4}>

                        <label for={getUserData.picture != "" ? "" : "selectimage"} >

                            <input type='file' id='selectimage' style={{ display: 'none' }} />

                            <img title={getUserData.picture != "" ? "Change Profile Picture" : "Add Profile Picture"}
                                src={getUserData.picture != '' ? `${serverURL}/images/${getUserData.picture}` : userlogo}
                                style={{ width: 150, height: 150, borderRadius: '100%', cursor: 'pointer' }} />
                        </label>
                    </Grid>

                    <Grid item xs={8}>
                        <div style={{ fontSize: '28px' }}>
                            {getUserData.username}{""}
                            {btnStatus == 'follow' ? (
                                <Button variant="contained"
                                    onClick={handleRequest}
                                    style={{ backgroundColor: '#0095F6', fontWeight: 'bold', marginLeft: '20px', textTransform: 'capitalize' }}>
                                    Follow</Button>
                            ) : null}

                            {btnStatus == 'requested' ? (
                                <Button variant="contained"
                                    onClick={cancelRequest}
                                    style={{ fontWeight: 'bold', marginLeft: '20px', textTransform: 'capitalize', backgroundColor: '#121212', border: '1px solid white' }}>
                                    Requested</Button>
                            ) : null}


                        </div>

                        <div style={{ fontSize: '20px' }}>
                            {getUserData.full_name}

                        </div>

                        <div style={{ marginTop:'15px',display:'flex',justifyContent:'space-between',
                    paddingTop:'5px', paddingBottom:'10px', width:'45%'}}>
                            <span>
                                0 posts
                            </span>

                            <span style={{cursor:'pointer'}} onClick={()=>{
                  handleClickOpenFollower()
                  fetchAllFollower()}} >
                            {followerFollowing.followers} Followers 
                            </span>

                            <span style={{cursor:'pointer',display:'flex', flexDirection:'row'}} onClick={()=>{
                  handleClickOpenFollowing()
                  fetchAllFollowing()}}>
                            {followerFollowing.following} Following
                            </span>
                           
                        </div>


                        <div style={{ whiteSpace: 'pre-line' }}>
                            {getUserData.bio}

                        </div>

                        <div>
                            <a style={{ color: 'white', fontWeight: '600' }} href={user.website} target="_blank">{getUserData.website} </a>
                        </div>


                    </Grid>

                    {getUserData.visibilitystatus == 'private' ?
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', border: '2px solid #252525', fontSize: '18px' }}>
                                This account is private<br /><br />
                                Follow this account to see their photos and <br /> videos.
                            </div>
                        </Grid> : ''}

                </Grid>

            </div>
            {showDialog()}
            {showFollowingDialog()}
            {showFollowerDialog()}
            

        </div>

    )



}


export default UserProfile;