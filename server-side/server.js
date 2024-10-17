
require('dotenv').config();
const app=require('./app');
const {PUBLIC_DATA}=require('./constantData');

app.listen(PUBLIC_DATA.port,()=>{
   console.log(`Server is running on port ${PUBLIC_DATA.port}`);
})