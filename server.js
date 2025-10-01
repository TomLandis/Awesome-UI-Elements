import dotenv from "dotenv";
import https from 'https';
import express from 'express'
import fs from 'fs'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseurl = `https://${process.env.URL}:${process.env.PORT}`
const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
}; // generate these with openssl for local dev
// how to do?  -->  https://stackoverflow.com/a/52007971/13227170


// middleware
app.use(express.static(join(__dirname, 'public')));
app.set('view engine', 'ejs');




app.get("/", (req, res) =>{
    res.render('index', {})
}) 


https.createServer(options, app).listen(process.env.PORT, () => {
  console.log(`Server is running on https://${process.env.URL}:${process.env.PORT}`);
});
