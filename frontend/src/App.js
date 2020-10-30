import {useState,useEffect } from 'react';
import './App.css';
import axios from "axios";
import React from "react";

function App() {
  
  const [imageList,setImageList] = useState([]); 
  const [loading,setLoading]=useState(true)
  const [error,setError]= useState("");

useEffect(()=>{
getImages();
},[imageList])


const getImages=async ()=>{
  const response = await axios.get("/upload")
  .then(function (response) {
    // handles success
   
    setImageList(response.data)
    setLoading(false)
    
  })
  .catch(function (error) {
    // handles error
    setError(error.response.data.msg)
  })
}


const SubmitHandler = async(e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('file',e.target.files[0])

  try {
    const res = await axios.post('/upload',formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      },
    });

    
  } catch (error) {
    if(error.response.status === 500){
      setError("There was a problem with the server")
    }
    else{
      setError(error.response.data.msg)
    }


  }


}
  return (
    <div className="App">
      
      <form   >

        {/* setting text of file to Upload */}
      <label for="files" className="btn-upload">Upload</label>
<input style={{visibility:"hidden"}} id="files" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={SubmitHandler} />



        </form>
        {/* Error Handling */}
<div className="error-container">
  {error !==""?error:""}
  </div>
        <div className="class-container">

{loading ===false  && imageList !==[]?
// mapping images 
imageList.map((image_name)=>(
  <div className="img-container">
      <img id={image_name} class="preview-image"src={`./uploads/${image_name}`}/> 
        {/* id of className as given in description */}
        
        <p className="image-desc">{image_name}</p>  
 </div>
)
):""}
</div>
    </div>
  );
}

export default App;