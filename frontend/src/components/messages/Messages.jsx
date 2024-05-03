import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 ? (
                messages.map((message, index) => (
                    <div key={message._id}>
                        <Message message={message} />
                        {index === messages.length - 1 && <div ref={messagesEndRef} />}
                    </div>
                ))
            ) : loading ? (
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
            ) : (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};
export default Messages;
