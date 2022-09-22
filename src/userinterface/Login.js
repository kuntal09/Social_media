import { Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import Logo from "../assests/images/logo.png";
import { postData } from "../api/ServerServices";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';


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

function Login() {
    const [mobilenum_or_email,setMobilenum_or_email] = useState("")
    const [password,setPassword]=useState("")
    const navigate =useNavigate();
    const dispatch = useDispatch();

    const handleSubmit=async()=>{
      let body ={
      
        username:mobilenum_or_email,
        password:password,

      }

      var result=await postData("user/login",body)
        
        dispatch({ type: "ADD_USER", payload: [result.data.userid, result.data] });
        navigate('/profile');
     
    };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fafafa"
      }}
    >
      <div
        style={{
          width: "25vw",
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #D3D3D3",
          padding: "20px",
          backgroundColor: "#fff"
        }}
      >
        <div
          style={{
            flexDirection: "column",
            width: "75%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="logo" style={{ width: "50%", height: "40px" }} />
          
          <CssTextField
            placeholder="Mobile no or Email"
            id="outlined-size-small"
            size="small"
            fullWidth
            style={{ marginTop: "30px" }}
            onChange={(event)=>setMobilenum_or_email(event.target.value)}
          />
         
          <CssTextField
            placeholder="Password"
            id="outlined-size-small"
            size="small"
            type="password"
            fullWidth
            style={{ marginTop: "10px" }}
            onChange={(event)=>setPassword(event.target.value)}
          />
          <Button
            fullWidth
            style={{ marginTop: "20px" }}
            variant="contained"
            size="small"
            onClick={handleSubmit}
          >
            LogIn
          </Button>
        </div>
      </div>
      <div
        style={{
          width: "25vw",
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #D3D3D3",
          padding: "20px",
          backgroundColor: "#fff"
        }}
      >
        Don't have an account?  
        <Link to='/signup' style={{textDecorationLine: "none"}}>Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
