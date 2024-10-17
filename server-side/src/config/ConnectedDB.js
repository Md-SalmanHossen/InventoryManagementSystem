
const mongoose=require('mongoose');

const connectDB=async ()=>{
   try {
      const uri=process.env.MONGO_URI;
      await mongoose.connect(uri)
   } catch (error) {
      console.error('MongoDB Connection error:',error);
      throw error;
   }
}
module.exports=connectDB;