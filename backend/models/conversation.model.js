import mongoose from 'mongoose' ;

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'User' ,
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'Message' ,
            default: [] ,// When we first Start the Conversation it is going to be the empty Array 
        },
    ], 
} , {timestamps:true});

const Conversation  = mongoose.model("Conversation" , conversationSchema) ;
export default Conversation ;