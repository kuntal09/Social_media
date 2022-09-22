import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Button, Grid, TextField } from '@mui/material';
import userlogo from '../assests/images/user.jpg';
import { serverURL } from "../api/ServerServices";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "../api/ServerServices";
import { useDispatch } from 'react-redux';
import { Divider } from "@mui/material";


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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import moment from 'moment';
import "./ViewPost.css";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { styled, alpha } from "@mui/material/styles";
import {useRef} from 'react';
import { SaveAlt } from "@mui/icons-material";


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

function ViewPost() {
    var setting = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const ref=useRef();
    const params = useParams();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    console.log(userData);
    const user = Object.values(userData)[0];
    console.log(user);

    const [postFiles, setPostFiles] = useState([]);
    const [selectedPost, setSelectedPost] = useState({});
    const [files, setFiles] = useState([]);
    const [posts, setPosts] = useState("");
    const [dateadded, setDateadded] = useState("");
    const [showLike, setShowLike]= useState(false);
    const [showSave, setShowSave]= useState(false);
    const [comment, setComment]= useState("");
    const [commentId, setCommentId]=useState("");
    

    const fetchPostByPostuuid = async () => {
        let body = {
            postuuid: params.postuuid,
            userid:user.userid,
           
        }
        var result = await postData("user/getpostbypostuuid", body);
        if (result.status) {
            
            setSelectedPost(result.data);
            setFiles(JSON.parse(result.data.pictures_videos));
            setDateadded(new Date())
            if(result.data.likestatus != null){
                setShowLike(true)
            }
            setRefresh(!refresh)
        }
    }

    const fetchPostByUserId = async () => {
        let body = {
            userid: user.userid
        }
        const result = await postData('user/getpostbyuserid', body);
        if (result.status) {
            var arr= [...result.data]
            arr= arr.filter((item)=>item.postuuid != params.postuuid)
            setPosts(arr)
        }
        setRefresh(!refresh)
    }

    const addLike = async () => {
        let body = {
            userid: user.userid,
            postid: selectedPost.postid
        }
        const result = await postData('user/addlike', body);
        if (result.status) {
            setShowLike(true)
        }
        setRefresh(!refresh)
    }

    const unlike = async () => {
        let body = {
            userid: user.userid,
            postid: selectedPost.postid
        }
        const result = await postData('user/unlike', body);
        if (result.status) {
            setShowLike(false)
        }
        setRefresh(!refresh)
    }

    const addSave = async () => {
        let body = {
            userid: user.userid,
            postid: selectedPost.postid
        }
        const result = await postData('user/addsave', body);
        if (result.status) {
            setShowSave(true)
        }
        setRefresh(!refresh)
    }
    const notsaved = async () => {
        let body = {
            userid: user.userid,
            postid: selectedPost.postid
        }
        const result = await postData('user/notsaved', body);
        if (result.status) {
            setShowSave(false)
        }
        setRefresh(!refresh)
    }

    const addComment = async () => {
        let body = {
            comment:encodeURIComponent(comment),
            postid: selectedPost.postid,
            userid: user.userid,
            dateadded:new Date().valueOf(),
            
        }
        const result = await postData('user/addcomment', body);
        if (result.status) {
            alert("Comment")
            setComment("")
        }
        setRefresh(!refresh)
    }

    const [showComments, setShowComments] =useState([]);

    const fetchCommentByPostuuid = async () => {
        let body = {
            postuuid: params.postuuid,
           
        }
        var result = await postData("user/getcommentbypostuuid", body);
        if (result.status) { 
            setShowComments(result.data)
        }
        setRefresh(!refresh)
    }


    useEffect(() => {
        fetchPostByPostuuid();
        fetchPostByUserId();
        fetchCommentByPostuuid();

    }, [])

    const [openSetting, setOpenSetting] = React.useState(false);
    
    const handleClickOpenSetting = () => {
        setOpenSetting(true);
    };
  
    const handleCloseSetting = (value) => {
        setOpenSetting(false);
    };


    const handleDeletePost = async (data) => {
        let body = {
          postuuid: params.postuuid,
        }
        const result = await postData("user/deletepost", body);
        {
          if (result.status) {
            fetchPostByPostuuid();
            
          }
          setRefresh(!refresh)
        }
      }
    const showDialogSetting = () => {
        return (<Dialog onClose={handleCloseSetting} open={openSetting} fullWidth maxWidth="xs"
        PaperProps={{ style: { backgroundColor: '#262626', color: 'white', borderRadius: '20px' } }} 
       >
            <List sx={{ pt: 0, width:'100%'}}>
            <div style={{ textAlign: 'center', color: 'red',marginTop:5,marginBottom:5, fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" onClick={handleDeletePost} >
                        Delete
                    </div>
                    <Divider color="#262626" />
                    <div style={{ textAlign: 'center',marginTop:5,marginBottom:5, color: '#0095F6', fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" >
                        Edit
                    </div>
                    <Divider color="#262626" />
                    <div style={{ textAlign: 'center', color: '#0095F6',marginTop:5,marginBottom:5, fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" >
                        Hide like count
                    </div>
                    <Divider color="#262626" />
                    <div style={{ textAlign: 'center', color: '#0095F6',marginTop:5,marginBottom:5, fontWeight: 'bold', width: '100%', cursor: 'pointer' }} primary="" >
                        Turn off commenting
                    </div>
                    <Divider color="#262626" />
    
                    <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop:5,marginBottom:5, width: '100%', cursor: 'pointer' }} primary="" onClick={()=>setOpenSetting(false)}>
                        Cancel
                    </div>
             
            </List>
        </Dialog>)
    };

    return (
        <div style={{backgroundColor:'#121212',color:'#fff'}}>
                <Header />
            <div style={{display:'flex',justifyContent:'center'}}>
                <div style={{display:'flex',justifyContent:'column',width:'75%'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'50px',paddingRight:'20px',paddingBottom:'0px',paddingLeft:'20px',width:'80%', }}>
                <Grid container spacing={1} style={{ border: '1px solid #262626', background:'black',  }}>
                    <Grid item xs={8} style={{
                       display: 'flex', justifyContent: 'center',
                        
                    }}>
                        <div style={{ width: "50%", height: '70vh' }}>

                            <Slider {...setting} style={{width:'auto'}}>
                                {files.map((item, index) => (
                                    <img src={`${serverURL}/images/${item}`}  className="postImage" />
                                ))}
                            </Slider>
                        </div>
                    </Grid>
                    <Grid item xs={4} style={{borderLeft:'1px solid white'}} >
                        <div style={{ display: 'flex', flaxDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                            <div style={{ display: 'flex', flaxDirection: 'row', alignItems: 'center',padding:10 }}>
                                
                                <Avatar
                                    sx={{ width: 32, height: 32 }}
                                    src={
                                        selectedPost.picture != ""
                                            ? `${serverURL}/images/${selectedPost.picture}`
                                            : userlogo
                                    }
                                ></Avatar>
                                <div style={{ paddingLeft: '10px', fontWeight: '600', fontSize: 15, flexDirection: 'row', cursor:'pointer'}} onClick={()=>navigate('/profile')}>
                                    {selectedPost.username}
                        
                                    {selectedPost.location != "" ? <div style={{fontWeight:300}}>{selectedPost.location}</div> : null}
                                </div>
                                </div>

                                <div style={{ marginRight:10, cursor: 'pointer' }}>
                                    <MoreHorizIcon  onClick={handleClickOpenSetting}/>
                                </div>
                            
                        </div>

                        <Divider color= '#262626' style={{marginTop:20}} />
                        
                    <div style={{height:'60vh'}}>
                        {selectedPost.caption != "" ?<div style={{display:'flex',flaxDirection: 'row', alignItems: 'center',padding:10}}>
                            <Avatar
                                sx={{ width: 32, height: 32 }}
                                src={
                                    selectedPost.picture != ""
                                        ? `${serverURL}/images/${selectedPost.picture}`
                                        : userlogo
                                }
                            >
                            </Avatar>
                            <div style={{ paddingLeft: '10', fontWeight: '600', fontSize: 15, flexDirection: 'row',cursor:'pointer' }}>
                                {selectedPost.username} 
                                <div style={{fontWeight:300, marginLeft:5}}>{decodeURIComponent(selectedPost.caption)}</div>
                            </div>
                            </div>:null}
                            
                            {showComments.map((item,index)=>{
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <Avatar
                                sx={{ width: 32, height: 32 }}
                                src={
                                    item.picture != ""
                                        ? `${serverURL}/images/${item.picture}`
                                        : userlogo
                                }
                            >
                            </Avatar>
                            <div style={{paddingLeft:10}}>
                                <div style={{fontWeight:600, fontSize:14,display:'flex',flexDirection:'row'}}>
                                    {item.username}
                                    <div style={{fontWeight:300, marginLeft:5}}>{decodeURIComponent(item.comment)}</div>
                                </div>

                                <div style={{display:'flex',flexDirection:'row',padding:12,color:'#8E8E8E',fontSize:'12px'}}>
                            {moment(new Date(parseInt(selectedPost.dateadded))).fromNow(true)} Ago
                            <div onClick={()=>{setCommentId(item.commentid)
                                    setComment("@"+item.username+" ")
                                    ref.current.focus()
                            }} style={{cursor:'pointer'}}>
                                Reply
                            </div>
                            <div>reply</div>
                        </div>
                            </div>
                                </div>
                            })}
                           
                        </div>
                        <Divider color= '#262626' />
                            <Grid item xs={12}>
                        <div style={{ display: 'flex',justifyContent: 'space-between',alignItems:'center',margin:10 }}>
                            <div style={{ display: 'flex', cursor:'pointer',flexDirection:'row',alignItems:'center' }}>
                                <div>
                                {showLike ?(<FavoriteOutlinedIcon onClick={unlike} 
                                style={{paddingRight:5,paddingLeft:5,paddingTop:5,fontSize:30,cursor:'pointer', color:'red'}} />)
                                :(<FavoriteBorderIcon onClick={addLike} style={{paddingRight:5,paddingBottom:5,paddingTop:5,fontSize:30,cursor:'pointer'}} />)}
                            </div>
                                <ChatBubbleOutlineIcon />
                                <SendIcon />
                            </div >
                            <div style={{ display: 'flex', cursor:'pointer',marginTop:-30 }}>
                            {showSave ?(<BookmarkOutlinedIcon onClick={notsaved} 
                                style={{paddingRight:5,paddingLeft:5,paddingTop:5,fontSize:30,cursor:'pointer', color:'white'}} />)
                                :(<BookmarkBorderIcon onClick={addSave} />)}
                    </div> 
                        </div>
                        </Grid>
                        <div>{selectedPost.likes} likes</div>
                        <div>
                            {selectedPost.showlikecount} 
                        </div>
                        <div style={{display:'flex',flexDirection:'row',padding:12,color:'#8E8E8E',fontSize:'12px'}}>
                            {moment(new Date(parseInt(selectedPost.dateadded))).fromNow(true)} Ago
                        </div>
                        <Divider color="#262626" />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <EmojiEmotionsOutlinedIcon style={{ color: '#8E8E8E',cursor:'pointer' }} />
                        </div >
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                         <CssTextField
                             placeholder="Add a comment..."
                            id="outlined-size-small"
                             size="small"
                            fullWidth
                            style={{ padding: "5px" }}
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            ref={ref}
                           
                            inputProps={{ style: { color: 'white' } }}
                        />
                    </div>
                    <div>
                      <Button variant="contained"
                        size="small"
                        style={{ textTransform: "capitalize", backgroundColor: '#0095F6', marginLeft: '20px', fontWeight: "bold" }}
                        onClick={commentId} >
                        Post
                      </Button>
                      </div>
                       
                    </Grid>

                </Grid>
            </div>
            </div>
            </div>
            {showDialogSetting()}
        </div>

    )

}


export default ViewPost;