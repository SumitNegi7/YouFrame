const { DH_NOT_SUITABLE_GENERATOR } = require('constants');
const express = require('express');
const fileUpload = require('express-fileupload');
const fs=require("fs");
const app = express();
const path = require('path');
const { features } = require('process');


dotenv.config();

const PORT = process.env.PORT || 5000    // Step 1

app.use(fileUpload());
app.use(express.json())
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/frontend/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});


const dir= path.join(`${__dirname}/frontend/public/uploads/`)

router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use(express.static('client/build'));

app.get("/uploads",(req,res)=>{
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
               console.log(fil)

               res.status(200).json({images:fil}) 

     
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