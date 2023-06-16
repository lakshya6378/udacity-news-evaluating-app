const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors=require('cors')

const app = express()

app.use(express.static('dist'))
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
 //   res.sendFile(path.resolve('src/client/views/index.html'))
})
const analysis=async (req,res)=>{
    //const baseurl=`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en`
    const data=req.body.text;
    const formdata = new FormData();
    function checkTextType(text) {
      // Regular expression to match URL pattern
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    
      // Check if the text matches the URL pattern
      if (urlPattern.test(text)) {
        return true;
      } else {
        return false;
      }
    }
    formdata.append("key", process.env.API_KEY);
    if(checkTextType(data))
    formdata.append("url",data);
    else
    formdata.append("txt",data);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...
    
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    
    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);

    try{
      const data2=await response.json();
      console.log(data2)
      res.send(data2)
    }
    catch(error){
      console.log('error',error);
    }
   }
app.post('/test',analysis)


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


