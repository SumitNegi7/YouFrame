import logo from './logo.svg';
import './App.css';
import {useState,useEffect } from 'react';
import axios from "axios";
import React from "react";

function App() {
  
  const [imageList,setImageList] = useState(""); 
  const [loading,setLoading]=useState(true)

// const onChange = (e) =>{
//   console.log(e.target.files[0])
//   // setFile(e.target.files[0]);
//   // setFilename(e.target.files.name);
// }


useEffect(()=>{
getImages();
},[imageList])


const getImages=async ()=>{
  const response = await axios.get("/uploads")
  .then(function (response) {
    // handle success
    console.log(response);
    setImageList(response.data)
    setLoading(false)
    console.log(imageList)
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
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
      console.log("There was a problem with the server")
    }
    else{
      console.log("err.response.data.msg")
    }


  }


}
  return (
    <div className="App">
      
      <form   >
      <label for="files" className="btn-upload">Upload</label>
<input style={{visibility:"hidden"}} id="files" type="file" onChange={SubmitHandler} />



        </form>
        {console.log(imageList)}

        <div className="class-container">
{loading ==false?

imageList.map((image_name)=>(
  
  <img id={image_name} class="preview-image"src={`./uploads/${image_name}`}/>   
  
)
):""}
</div>
    </div>
  );
}

export default App;
