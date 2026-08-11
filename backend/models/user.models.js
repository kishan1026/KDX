import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    
    email:{
        type:String,
        unique:true,
        required: [true,'email is required'],
    },
   
    password:{
        type:String,
        required:[true,'password is required']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

},{timestamps:true})

const User=mongoose.model('User',userSchema)

export default User 