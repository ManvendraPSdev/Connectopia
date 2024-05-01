import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

// Here we using Hooks and the name of the Hook here is useSignup

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
            //By this we get the cors error therefore in in vite.config.js we have provide the path to which we have send the post request ie, http://localhost:8005
            // //Or Somethime if it does not works then Directly use npm i cors -> import cors from 'cors' -> app.use(cors())
			const res = await fetch("/api/auth/signup", {
                // Now we want to send all these info of user like fullname , name _ _ _etc to the server for that we use Post method 
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

            // Setting the user To the local Storage after that updating the Context 
            // We are Storing the user to the local Storage because When we refresh the page we can get the value from the local storage Which will let us know if we are logged in or not 
            // And logic behid updating the context is navigating the user to the home page of the Application When they Signedup 
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}





