import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo, Loader } from "./componentsIndex";
import authService from "../appwrite/auth";
import { set, useForm } from "react-hook-form";

function Login() {
	const { register, handleSubmit, formState: {errors} } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const login = async (data) => {
		setError("");
		setLoading(true);
		try {
			const sessionData = await authService.LoginUser(data);
			if (sessionData) {
				const userData = await authService.GetCurrentUser();
				if (userData) {
					dispatch(storeLogin(userData));
					navigate("/");
				}
			}
		} catch (error) {
			setError(error.message);
		}
		setTimeout(() => {console.log(loading);
		}, 10000)
		setLoading(false);
	};
	return (
		<div className="flex items-center justify-center w-full">
			<div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[200px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign Up
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				<form onSubmit={handleSubmit(login)} className="mt-8">
					<div className="space-y-5">
						<Input
							label="Email: "
							type="email"
							placeholder="Enter your email"
							className={errors.email ? "border-red-400 border-4" : "border-green-400 border-2"}
							{...register("email", {
								required: {value:true, message:"Email address is required!"},
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
								required: {value:true, message:"Password is required!"},
								minLength: {value:8, message:"Password must be at least 8 characters long!"},
								maxLength: {value:25, message:"Password must be at most 25 characters long!"},
							})}
						/>
						{errors.password && <p className="text-red-400">{errors.password?.message}</p>}
						<Button type="submit" className="w-full bg-teal-600 hover:bg-teal-800" disabled={loading}>
							{loading ? <Loader /> : "Sign In"}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
