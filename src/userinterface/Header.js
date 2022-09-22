/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar, Tooltip } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { serverURL } from "../api/ServerServices";
import userlogo from "../assests/images/user.jpg";
import photovideo from "../assests/images/photovideo.png";
import logo from "../assests/images/logowhite.jpg";
import { Button } from "@mui/material";
import "./Header.Css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { postData } from "../api/ServerServices";
import { Grid, TextField } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Picker } from 'emoji-mart';
import { Navigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#262626",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "grey",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#262626",
    },
    "&:hover fieldset": {
      borderColor: "#262626",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#262626",
    },
  },
});


const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));




const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [allFollowRequest, setAllFollowRequest] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const user = Object.values(userData)[0];
  console.log(user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPost, setOpenPost] = React.useState(false);
  const [openCrop, setOpenCrop] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);

  var settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const [anchorElSearch, setAnchorElSearch] = React.useState(null);
  const openSearch = Boolean(anchorElSearch);
  const handleClickSearch = (event) => {
    setAnchorElSearch(event.currentTarget);
  };
  const handleCloseSearch = () => {
    setAnchorElSearch(null);
  };


  const [anchorElRequest, setAnchorElRequest] = React.useState(null);
  const openRequest = Boolean(anchorElRequest);
  const handleClickRequest = (event) => {
    setAnchorElRequest(event.currentTarget);
  };
  const handleCloseRequest = () => {
    setAnchorElRequest(null);
  };

  const handleClickOpenPost = () => {
    setOpenPost(true);
  };

  const handleClosePost = (value) => {
    setOpenPost(false);
  };

  const handleClickOpenCrop = () => {
    setOpenCrop(true);
  };

  const handleCloseCrop = (value) => {
    setOpenCrop(false);
  };

  const handleClickOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = (value) => {
    setOpenShare(false);
  };

  const fetchAllFollowRequest = async (event) => {
    let body = { receiveruserid: user.userid }
    var result = await postData("user/followrequestbyreceiver", body)
    if (result.status) {
      setAllFollowRequest(result.data)
    }

  }

  const handleLogout = () => {

    dispatch({ type: "CLEAR_ALL_DATA" })
    localStorage.removeItem("PURANADATA");
    navigate('/login')
  }

  const handleConfirm = async (data) => {
    let body = {
      receiveruserid: data.receiveruserid,
      senderuserid: data.senderuserid

    }
    const result = await postData("user/acceptrequest", body);
    {
      if (result.status) {
        fetchAllFollowRequest();
      }
    }
  }

  const handleDecline = async (data) => {
    let body = {
      receiveruserid: data.receiveruserid,
      senderuserid: data.senderuserid
    }
    const result = await postData("user/deleterequest", body);
    {
      if (result.status) {
        fetchAllFollowRequest();
      }
    }
  }

  const [postFiles, setPostFiles] = useState([]);
  const [caption, setCaption] = React.useState("");

  const handlePostFiles = (event) => {
    console.log(event.target.files)
    var files = Object.values(event.target.files)
    alert(files.splice(10).length + "files were not uploaded")
    console.log(files)
    setPostFiles(files)
    handleClosePost()
    handleClickOpenCrop()
  }

  const handleUpdatePostFiles = (event) => {
    console.log(event.target.files)
    var arr = [...postFiles]
    var files = Object.values(event.target.files)
    var newarr = [...arr, ...files]
    alert(newarr.splice(10).length + "files were not uploaded")
    console.log(files)
    setPostFiles(newarr)

  }

  const handleRemoveImage = (index) => {
    var arr = [...postFiles]
    arr.splice(index, 1)
    setPostFiles(arr)
    if (arr.length == 0) {
      setOpenCrop(false)
      setOpenPost(true)
    }
  }

  const handleClickNext = () => {
    setOpenCrop(false)
    setOpenShare(true)
  }

  const handleClickShareBack = () => {
    setOpenShare(false)
    setOpenCrop(true)
  }

  const showDialogCreateNewPost = () => {
    return (
      <Dialog onClose={handleClosePost} open={openPost}
        fullWidth maxWidth="xs"
        PaperProps={{ style: { backgroundColor: "#262626", color: "white", borderRadius: "10px", alignItems: 'center', height: "75%" }, }} >
        <div style={{ padding: '10px', textAlign: 'center', width: '95%' }} >
          Create New Post
          <hr color="#363636" style={{ width: "99%" }}></hr>
        </div>
        <Divider style={{ color: "#121212" }} />

        <div style={{ display: 'flex', alignItems: 'center', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
          <img src={photovideo} />


          <div style={{ fontSize: '18px', fontWeight: '300', }}>
            Drag photos and videos here
          </div>
          <Button
            size="small"
            variant="contained" component="label"
            style={{ backgroundColor: '#0095F6', textTransform: 'capitalize', marginTop: '20px', }}>
            Select From Computer
            <input hidden accept="image/*,video/*" multiple
              onChange={handlePostFiles}
              type="file" />
          </Button>
        </div>
      </Dialog>)
  }

  const showDialogCrop = () => {
    return (
      <Dialog onClose={handleCloseCrop} open={openCrop}
        fullWidth maxWidth="xs"
        PaperProps={{ style: { backgroundColor: "#262626", color: "white", borderRadius: "10px", alignItems: 'center', height: "75%" }, }} >
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', width:'100%' }}>
          <WestOutlinedIcon style={{ paddingLeft: 10,cursor:'pointer' }} onClick={handleClickOpenBackArrow}/>
        <div style={{ padding: '10px',  display:'flex',justifyContent:'center' }} >Crop</div>
          <div style={{ paddingRight: '10px', color: '#1495D5', fontWeight: '600', cursor: 'pointer' }} onClick={handleClickNext}>
            Next
          </div>
          </div>
          <Divider color="#363636" style={{ width: "99%" }} />
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ width: "350px" }}>
            <Slider {...settings}>
              {postFiles.map((item, index) => (
                <img src={
                  URL.createObjectURL(item)} width="200" height="250" />
              ))
              }
            </Slider>
            <div style={{marginTop:50}}>
              {postFiles.map((item, index) => (
                <img src={
                  URL.createObjectURL(item)} width="40" height="40" title="Delete"
                  className="imgcursor" style={{padding:5, cursor:'pointer'}} onClick={() => handleRemoveImage(index)} />
              ))
               }
              {postFiles.length < 10 ? (
                <Button
                  size="small"
                  variant="contained" component="label" style={{marginTop:'-30px'}}>
                  <AddCircleOutlineIcon style={{ color: '#363636' }} />
                  <input hidden accept="image/*,video/*" multiple
                    onChange={handleUpdatePostFiles}
                    type="file" /> </Button>) : null}
            </div>
          </div>
        </div>
      </Dialog>)
  }

  const [showEmoji, setShowEmoji]= React.useState(false);
  const [location, setLocation]=React.useState("");
  const [showLikeCount, setShowLikeCount]= React.useState(false);
  const [commenting, setCommenting]=React.useState("");
  const {v4:uuidv4}=require("uuid")

  const handleSubmitPost=async()=>{
    
    let formData = new FormData();
    formData.append("caption",encodeURIComponent(caption));
    formData.append("location",location);
    formData.append("isarchive",0);
    formData.append("commenting",commenting?0:1);
    formData.append("showlikecount",showLikeCount?0:1);
    formData.append("dateadded",new Date().valueOf());
    formData.append("editedon",new Date().valueOf());
    postFiles.map((item)=>{
      formData.append("picture",item);
    });
    formData.append("userid",user.userid);
    const result= await postData('user/createpost',formData)
    if(result.status)
    {
     
      setOpenShare(false)
    }
    
  }

  const showDialogShare = () => {
    return (
      <Dialog onClose={handleCloseShare} open={openShare}
        fullWidth maxWidth="md"
        PaperProps={{ style: { backgroundColor: "#262626", color: "white", borderRadius: "10px", alignItems: 'center', height: "80%" }, }} >
        <div style={{ display: 'flex', justifyContent: 'space-between',width:'100%' }}>
          <WestOutlinedIcon style={{ paddingLeft: 5, paddingTop:10, cursor: 'pointer' }} onClick={handleClickShareBack} />

        </div>
        <div style={{ padding: '10px', textAlign: 'center', width: '95%' }} >
          Create New Post
          </div>
          <div style={{ paddingRight: '10', color: '#1495D5', fontWeight: '600',cursor:'pointer' }} onClick={handleSubmitPost} >
            Share
          </div>
          <Divider color="#363636" style={{ width: "100%" }} />

        <Grid item container>
          <Grid item xs={8} style={{ justifyContent: 'center', display: 'flex', height: '450' }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%', flexDirection: 'column', justifyContent: 'center',  }}>
              <div style={{width: "250px"}}>
                <Slider {...settings}>
                  {postFiles.map((item, index) => (
                    <img src={
                      URL.createObjectURL(item)} width="200" height="250" />
                  ))
                  }
                </Slider>
              </div>
            </div>
          </Grid>
          <Grid item xs={4} >
            <div style={{ padding: '15px' }}>
              <div style={{ display: 'flex', flaxDirection: 'row', alignItems: 'center' }}>
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={
                    user.picture != ""
                      ? `${serverURL}/images/${user.picture}`
                      : userlogo
                  }
                ></Avatar>
              </div>
              <div style={{ paddingLeft: '10', fontWeight: '600', fontSize: 15 }}>
                {user.username}
              </div>
              <div >
                <CssTextField
                  placeholder="Write a caption..."
                  id="outlined-size-small"
                  size="small"
                  fullWidth
                  row={7}
                  style={{ marginTop: "30px",color:'red' }}
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  inputProps={{ style: { color: 'white' }, marginLeft: '-8px', fontSize: '12px' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <EmojiEmotionsOutlinedIcon style={{ color: '#8E8E8E',cursor:'pointer' }} />
              </div >
              <div style={{paddingRight:'10px'}}>
                {caption.length}/2200
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
              <CssTextField
                  placeholder="Location"
                  id="outlined-size-small"
                  size="small"
                  fullWidth
                  style={{ paddingTop: "10px" }}
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  inputProps={{ style: { color: 'white' } }}
                />
                <LocationOnIcon style={{display:'flex', alignItems:'center',justifyContent:'center', padding:'13px'}} />
              </div>

              <div style={{marginTop:10}}>
              <Accordion style={{backgroundColor:'#262626'}}>
        <AccordionSummary style={{backgroundColor:'transparent', color:'black',boxShadow:'none',padding:0}}
          expandIcon={<ExpandMoreIcon style={{color:'black'}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <div style={{fontSize:'14px'}} >Advance Setting</div>
        </AccordionSummary >

            <AccordionDetails >
           <div style={{padding:0,color:'#8E8E8E',fontSize:'10px', display:'flex',justifyContent:'space-between'}}>
            <div>
                  Hide like and view counts on this post
             </div>
             <div>
             <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} />}
                label="iOS style"
                value={showLikeCount}
                onChange={(event)=>{setShowLikeCount(event.target.checked)}}
                style={{ paddingLeft:10}}
             />
             </div>
             </div>
              <div style={{padding:0,color:'#8E8E8E',fontSize:'12px',display:'flex',justifyContent:'space-between'}}>
                <div>
                  Only you will see the total number of likes and views on this post.You can change this later by going to the
                  </div>
                  <div>
                  <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} />}
                label="iOS style"
                value={commenting}
                onChange={(event)=>{setCommenting(event.target.checked)}}
             />
                  </div>
           </div>
         
        </AccordionDetails>
      </Accordion>
                
              </div>

            </div>

          </Grid>
        </Grid>
      </Dialog>
    )
  }

  const [openBackArrow, setOpenBackArrow] = React.useState(false);
    
  const handleClickOpenBackArrow = () => {
      setOpenBackArrow(true);
  };

  const handleCloseBackArrow = (value) => {
      setOpenBackArrow(false);
  };


  const showDialogBackArrow = () => {
    return (<Dialog onClose={handleCloseBackArrow} open={openBackArrow} fullWidth maxWidth="xs"
    PaperProps={{ style: { backgroundColor: '#262626', color: 'white', borderRadius: '20px' } }} 
   >
        <DialogTitle style={{ display:'flex',justifyContent:'center', width: '85%', color: 'red',marginBottom:-20 ,fontWeight:'bold' }} >Discard post?</DialogTitle>
        <div style={{ display:'flex',justifyContent:'center',color:'white',marginTop:0,marginBottom:5}}>If you leave,your edits won't be saved.</div>
        <Divider color="#262626" /> 

        <List sx={{ pt: 0, width:'100%'}}>

                <div style={{ textAlign: 'center',marginTop:5,marginBottom:5, color: '#0095F6', fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" onClick={()=>setOpenPost(true)}>
                    Discard
                </div>
                <Divider color="#262626" /> 

                <div style={{ textAlign: 'center', fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" onClick={()=>setOpenBackArrow(false)}>
                    Cancel
                </div>
         
        </List>
    </Dialog>)
};

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img src={logo} width="140px" />
          </Typography>
          <div
            style={{ display: "flex", justifyContent: "center", width: "65%" }}
          >
            <Search
              onClick={handleClickSearch}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge >
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge >
                <NotificationsIcon />
              </Badge>
            </IconButton>



            <Tooltip title=" ">
              <IconButton
                onClick={handleClickOpenPost}

                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                color="inherit">

                <Badge >
                  <AddBoxOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title=" ">
              <IconButton
                onClick={(event) => {
                  handleClickRequest(event)
                  fetchAllFollowRequest()
                }}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                color="inherit">

                <Badge >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={
                    user.picture != ""
                      ? `${serverURL}/images/${user.picture}`
                      : userlogo
                  }
                ></Avatar>
              </IconButton>
            </Tooltip>
          </Box>



          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small"
                />
              </ListItemIcon>
              Logout

            </MenuItem>
          </Menu>

          {/* Search box menu */}
          <Menu
            anchorEl={anchorElSearch}
            id="account-menu"
            open={openSearch}
            onClose={handleCloseSearch}
            onClick={handleCloseSearch}
            PaperProps={{
              elevation: 0,
              sx: {
                width: "30vw",
                backgroundColor: "#262626",
                color: "white",
                borderRadius: "5px",
                paddingTop: '10px',
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingBottom: "10px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  backgroundColor: "#262626",
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  // bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: "700" }}>Recent</div>
              <div style={{ color: "#0094F4", cursor: "pointer", fontSize: "14px" }}>Clear All</div>
            </div>
          </Menu>


          {/* Request Icon menu */}
          <Menu
            anchorEl={anchorElRequest}
            id="account-menu"
            open={openRequest}
            onClose={handleCloseRequest}
            // onClick={handleCloseRequest}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                backgroundColor: "#262626",
                color: "white",
                borderRadius: "5px",
                paddingTop: '10px',
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingBottom: "10px",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  backgroundColor: "#262626",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >



            <div>
              {allFollowRequest.map((item, index) => {
                return (

                  <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}
                  >


                    <img src={item.picture} style={{ width: 34, height: 34, borderRadius: '100%' }} />

                    <div style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => navigate("/" + item.username)}>
                      <div style={{ fontSize: '14px', fontWeight: '700' }} >
                        {item.username}
                      </div>

                      <div style={{ fontSize: '14px', color: '#8A8A8A' }} >
                        {item.full_name}
                      </div>

                    </div>

                    <div>
                      <Button variant="contained"
                        size="small"
                        onClick={() => handleConfirm(item)}
                        style={{ textTransform: "capitalize", backgroundColor: '#0095F6', marginLeft: '20px', fontWeight: "bold" }} >
                        Confirm
                      </Button>

                      <Button variant="contained"
                        onClick={() => handleDecline(item)}

                        style={{ fontWeight: 'bold', marginLeft: '20px', textTransform: 'capitalize', backgroundColor: '#121212', border: '1px solid white' }}>
                        Delete


                      </Button>
                    </div>


                    <div style={{ fontWeight: "700" }}></div>
                    <div style={{ color: "#0094F4", cursor: "pointer", fontSize: "14px" }}></div>
                  </div>

                )
              })}
            </div>
          </Menu>
        </Toolbar>
      </AppBar>
      <Divider color="#363636" />
      {showDialogCreateNewPost()}
      {showDialogCrop()}
      {showDialogShare()}
      {showDialogBackArrow()}
    </Box>

  );
}
