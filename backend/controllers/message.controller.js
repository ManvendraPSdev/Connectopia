import Conversation from "../models/conversation.model.js";
import Message from '../models/message.model.js' ;

export const sendMessage = async(req , res)=>{
    try{
        // We should get the message Content , id , senderId
        const{message} = req.body ;
        const{id:receiverId} = req.params ;
        const senderId = req.user._id ;
        //Now we also have to find the conversation between the sender and Receiver 
        let conversation = await Conversation.findOne({
            partcipants: {$all : [senderId , receiverId]},
        })
        if(!conversation){
            conversation = await Conversation.create({
                partcipants: [senderId , receiverId] ,
            })
        }
        const newMessage = new Message({
            senderId: senderId ,
            receiverId: receiverId ,
            message: message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        //SOCKET IO functionality will go here 


        // await conversation.save() ;
        // await newMessage.save() ;

        //The above two lines can be replace with the following lines , Because here both the function runs parallely
        await Promise.all([conversation.save() , newMessage.save() ]);

        res.status(201).json(newMessage) ;
    }catch(error){
        console.log("Error in sendMessage controller:" , error.message);
        res.status(500).json({error : "Internal server error" }) ;
    }
};

export const getMessages = async(req , res) =>{
    try {
        const{id:userToChatId} = req.params;
        const senderId = req.user._id ;
        const conversation = await Conversation.findOne({
            partcipants : {$all : [senderId , userToChatId]} ,
        }).populate("messages"); // By using this rather of getting the refrence we get the message itself 

        if(!conversation) return res.status(200).json([]) ;
        const messages = conversation.messages ;

        res.status(200).json(messages) ;

    } catch (error) {
        console.log("Error in getMessage controller:" , error.message);
        res.status(500).json({error : "Internal server error" }) ;
    }
}