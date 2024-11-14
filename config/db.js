import mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MongoDB_URL,{
            
        });
        console.log("MongoDB Connected.!");
        
    }
    catch(error){
        console.error("Error Connectiong to DB..!", error);
        process.exit(1);
        
    }
};

export default connectDB;