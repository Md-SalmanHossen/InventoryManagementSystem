
//file import
const connectDB=require('./src/config/ConnectedDB');
const router=require('./src/routes/Api');


//package import
const express=require('express');
const app=new express();

const helmet=require('helmet');
const hpp =require('hpp');
const cors=require('cors');
const rateLimit=require('express-rate-limit')
const morgan=require('morgan')
const bodyParser=require('body-parser')


//setup cors origin before security
app.use(cors());


//security implement :
app.use(helmet());
app.use(hpp());
app.use(express.json({limit:'20mb'}));

const limiter=rateLimit({
   windowMs:15*60*1000,
   max:3000,
})
app.use(limiter);

//morgan for logging http request
app.use(morgan('dev'));

// Body parser for handling form data (if needed)
app.use(bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));

//database connected after security
const connectedDB = async () => {
   try {
      await connectDB();
      console.log('Database connected successfully');
   } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1);
   }
};

connectedDB();

//route implement after connected
app.use('/api',router);

//handle undefined routes
app.use('*',(req,res)=>{
   res.status(404).json({data:"Not Found "})
})


module.exports=app;
