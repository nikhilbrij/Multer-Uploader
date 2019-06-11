const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Multer setting
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/myupload')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // fieldname is a  file name (profilepic) in the html
  }
})

var upload = multer({storage: storage}).single('profilepic')

//static folder
app.use(express.static('./public'))

//set for ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/upload' , (req ,res ) => {
  upload(req ,res , error => {
    if (error) {
      res.render('index' , {
        message : error
      })
    } else {
      res.render('index' , {
        message : 'Successfully uploaded....' ,
        filename: `myupload/${req.file.filename}`
      })
    }
  });
});

app.listen(port, () => console.log('server is running 3000 ......'))
