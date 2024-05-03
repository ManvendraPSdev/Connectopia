
// import { useState } from "react";
// import { useAuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const useLogout = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { setAuthUser } = useAuthContext();

// 	const logout = async () => {
// 		setLoading(true);
// 		try {
// 			const res = await fetch("/api/auth/logout", {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 			});
// 			const data = await res.json();
// 			if (data.error) {
// 				throw new Error(data.error);
// 			}

// 			localStorage.removeItem("chat-user");
// 			setAuthUser(null);
// 		} catch (error) {
// 			toast.error(error.message);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return { loading, logout };
// };
// export default useLogout;

// wrong api implemeted 


//Corrected the API 

import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
