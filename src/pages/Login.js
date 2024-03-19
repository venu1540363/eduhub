import {
	Box,
	Typography,
	Paper,
	TextField,
	FormControl,
	InputLabel,
	InputAdornment,
	IconButton,
	Input,
	Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import classes from "../assets/styles/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import APIManager from "../API/ApiManager";

const Login = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleLogin = async () => {
		let hasError = false;

		if (!username) {
			setUsernameError("Please enter your email");
			hasError = true;
		} else {
			setUsernameError("");
		}

		if (!password) {
			setPasswordError("Please enter your password");
			hasError = true;
		} else {
			setPasswordError("");
		}

		if (hasError) {
			return;
		}

		try {
			// console.log(JSON.stringify({ email: username, password }), "111111111")
			const response = await fetch(APIManager.baseUrl + `users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email: username, password })
			}
			);
			const data = await response.json();
			console.log(data, "hellofr11111")
			if (response.ok) {
				console.log("Login successful", data, response);
				if (data.token) {
					console.log(data, "data")
					//save auth token in local storage (similar to async storage in react native)
					localStorage.setItem("token", data.token)
					navigate("/Courses");
				} else {
					setError("Token not created. Please login again!");
				}
			} else {
				setError(data.message);
			}
		} catch (error) {
			console.error("Error:", error);
			setError("An error occurred. Please try again later.");
		}
	};

	const register = async () => {
		navigate("/Registration")
	}

	return (
		<Box
			sx={{ ...classes.container, bgcolor: theme.colors.secondary }}
		>
			<Paper sx={classes.loginCard} elevation={10}>
				<Typography sx={{ ...classes.title }}>Login</Typography>
				<TextField
					id="standard-basic"
					label="Username"
					variant="standard"
					sx={classes.inputField}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					error={!!usernameError}
					helperText={usernameError}
				/>
				<FormControl sx={classes.passwordInput} variant="standard" error={!!passwordError}>
					<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
					<Input
						id="standard-adornment-password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => handleClickShowPassword()}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					{passwordError && <Typography variant="caption" color="error">{passwordError}</Typography>}
				</FormControl>
				<Typography sx={classes.forgotContainer}>
					<Link to="/forgot-password">
						<Typography variant="inline" sx={{ color: theme.colors.primary }}>
							Forgot Password?
						</Typography>
					</Link>
				</Typography>
				{error && (
					<Typography color="error" sx={{ marginBottom: 2 }}>
						{error}
					</Typography>
				)}
				<Button
					variant="contained"
					sx={{
						...classes.loginButton,
						bgcolor: theme.colors.primary,
						fontSize: theme.fontSizes.large,
						"&:hover": { bgcolor: theme.colors.dark }
					}}
					onClick={() => handleLogin()}
				>
					LOGIN
				</Button>
				<Typography sx={{ ...classes.registerText }}>
					Don't have an account?{" "}
					<Typography onClick={() => register()} variant="inline" sx={{ color: theme.colors.primary }}>
						Register
					</Typography>
				</Typography>
			</Paper>
		</Box>
	);
};

export default Login;
