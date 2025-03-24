import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo, Loader } from "./componentsIndex";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../features/authSlice";

function Signup() {
	const [error, setError] = useState("");
	const [errorCode, setErrorCode] = useState();
	const [loading, setLoading] = useState(false);

	let b =0;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { register, handleSubmit, formState: {errors} } = useForm();

	const createUser = async (data) => {
		setError("");
		setLoading(true);
		try {
			const sessionData = await authService.CreateAccount(data);
			if (sessionData) {
				const userData = await authService.GetCurrentUser();
				if (userData) {
					dispatch(storeLogin(userData));
					navigate("/");
				}
			}
		} catch (error) {
			setError(error.message);
			setErrorCode(error.code);
		}
		setLoading(false);
	};

	return (
		<div className="flex items-center justify-center">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[200px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to create account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Already have an account?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{errorCode && errorCode != 409 && <p className="text-red-600 mt-4 text-center">{error}</p>}
				{errorCode && errorCode == 409 && <p className="text-red-600 mt-4 text-center">Email already exists!</p>}
				{console.log(error)}

				<form onSubmit={handleSubmit(createUser)}>
					<div className="space-y-5 mt-6">
						<Input
							label="Username: "
							placeholder="Enter your username"
							className={errors.username ? "border-red-400 border-4" : "border-green-400 border-2"} 
							{...register("username", {
								required: {value:true, message: "Username is required"}
							})}
						/>
						{errors.username && <p className="text-red-400">{errors.username?.message}</p>}
						<Input
							label="Email: "
							type="email"
							placeholder="Enter your email"
							className={errors.email || errorCode == 409 ? "border-red-400 border-4" : "border-green-400 border-2"} 
							{...register("email", {
								required: {value:true, message: "Email is required"},
								validate: {
									matchPatern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
										"Email address must be a valid address",
								},
							})}
						/>
						{errors.email && <p className="text-red-400">{errors.email?.message}</p>}
						<Input
							label="Password: "
							type="password"
							placeholder="Enter your password"
							className={errors.password ? "border-red-400 border-4" : "border-green-400 border-2"} 
							{...register("password", {
								required: {value:true, message: "Password is required"},
								minLength: {value:8, message: "Password must be at least 8 characters long"},
								maxLength: {value:25, message: "Password must be at most 25 characters long"},
							})}
						/>
						{errors.password && <p className="text-red-400">{errors.password?.message}</p>}
                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-800" disabled={loading}>
							{loading ? <Loader /> : "Create Account"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
