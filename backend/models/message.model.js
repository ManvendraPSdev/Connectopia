import mongoose from 'mongoose' ;

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User" ,
        required : true 
    } ,
    receiverId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User" ,
        required : true 
    },
    message:{
        type: String ,
        required : true 
    }
    // CreatedAt , updatedAt => message.createdAt : 15:30
} , {timestamps: true});

// Now we have created the Schema and now we are start creating the model 

const Message = mongoose.model("Message" , messageSchema);
export default Message ;