
const express = require('express');
const fileUpload = require('express-fileupload');
const fs=require("fs");
const app = express();
const path = require('path');
const { features } = require('process');



const PORT = process.env.PORT || 5000    

app.use(fileUpload());
app.use(express.json())
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  // Checking for file formats which are supported

  if(file.name.includes(".jpg") || file.name.includes(".jpeg") || file.name.includes(".JPEG") || file.name.includes(".png")
  ||file.name.includes(".JPG") || file.name.includes(".PNG") ||file.name.includes(".gif") || file.name.includes(".GIF"))
  
  {
  
  // movinf file to uploads directory
  file.mv(`${__dirname}/frontend/public/uploads/${file.name}`, err => {
    if (err) {
      // console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });}
  else{
    return res.status(401).json({ msg: "Please upload an image format" });
  }
});


const dir= path.join(`${__dirname}/frontend/public/uploads/`)

app.get("/upload",(req,res)=>{


  //Sorting the list of the files by date 

  fs.readdir(dir,(err,files)=>{

        const  fil = files.map(function (fileName) {
           return {
           name: fileName,
           time: fs.statSync(dir + '/' + fileName).mtime.getTime()
           };
       })
           .sort(function (a, b) {
               return b.time - a.time; })
           .map(function (v) {
               return v.name; });
              
               res.status(200).send(fil) 

     
});
       
   })

if(process.env.NODE_ENV ==="production"){
    app.use(express.static('frontend/build'));
    app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,"frontend","build","index.html"));
// realtive path
    })
}



app.listen(PORT, () => console.log('Server Started...'));