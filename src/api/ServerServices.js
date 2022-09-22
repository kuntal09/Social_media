var axios=require('axios');

export const serverURL="http://localhost:5000"; 
export const postData= async(url,body)=>{
    try{
        const result= await axios.post(serverURL+"/"+url,body);
        return result.data;
    }
    catch{
        return{status:false};
    }
}