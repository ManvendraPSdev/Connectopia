import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: ""
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'>ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					{/* Form fields */}
					<div>
 						<label className='label p-2'>
 							<span className='text-base label-text'>Full Name</span>
 						</label>
 						<input type='text' placeholder='name' className='w-full input input-bordered  h-10'
							// 						value = {inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='xyz@gmail.com' className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700'
						disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Sign up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;




// import { Link } from "react-router-dom";
// import GenderCheckbox from "./GenderCheckbox";
// import {useState} from "react" ;
// import useSignup from "../../hooks/useSignup.js" ;

// const SignUp = () => {

// 	//Writing the Signup Functionality 
// 	const[inputs , setInputs] = useState({
// 		fullName : "",
// 		username : "",
// 		password : "",
// 		confirmPassword : "",
// 		gender : ""

// 	});

// 	// Here the hook that we have made for signup we use that hook here 
// 	// Calling the function signup 
// 	const {loading , signup} = useSignup() // Here we call the useSignup function in the useSignup hook

// 	const handleCheckboxChange = (gender)=>{
// 		setInputs({...inputs , gender})
// 	}

// 	const handleSubmit = async(e)=>{
// 		//When we Submit the form it refreshes the signup page so we use preventdefault 
// 		e.preventDefault() ;
// 		await signup(inputs);
// 	}

// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Sign Up <span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form onSubmit={handleSubmit}>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Full Name</span>
// 						</label>
// 						<input type='text' placeholder='name' className='w-full input input-bordered  h-10'
// 						value = {inputs.fullName}
// 						onChange={(e)=>setInputs({...inputs , fullName : e.target.value})} />
// 					</div>

// 					<div>
// 						<label className='label p-2 '>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='xyz@gmail.com' className='w-full input input-bordered h-10' 
// 						value = {inputs.username}
// 						onChange={(e)=>setInputs({...inputs , username : e.target.value})}
// 						/>
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 							value = {inputs.password}
// 							onChange = {(e)=>setInputs({...inputs , password: e.target.value })}
// 						/>
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Confirm Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Confirm Password'
// 							className='w-full input input-bordered h-10'
// 							value = {inputs.confirmPassword}
// 							onChange={(e) =>setInputs({...inputs , confirmPassword: e.target.value})}
// 						/>
// 					</div>

// 					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender = {inputs.gender}/>

// 					<Link to = {"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
// 						Already have an account?
// 					</Link>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default SignUp;