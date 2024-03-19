import React, { useState } from "react";
import {
	Container,
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
import classes from "../assets/styles/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import APIManager from "../API/ApiManager";

const Registration = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cnfpassword, setCnfPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showCnfPassword, setShowCnfPassword] = useState(false);
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [cnfPasswordError, setCnfPasswordError] = useState("");
	const [error, SetError] = useState("")

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowCnfPassword = () => setShowCnfPassword((show) => !show);

	const handleRegister = async () => {

		let hasError = false;

		// Validation for Username
		if (!username) {
			setUsernameError("Please enter your username");
			hasError = true;
		} else {
			setUsernameError("");
		}

		// Validation for Email
		if (!email) {
			setEmailError("Please enter your email");
			hasError = true;
		} else {
			setEmailError("");
		}

		// Validation for Password
		if (!password) {
			setPasswordError("Please enter your password");
			hasError = true;
		} else {
			setPasswordError("");
		}

		// Validation for Confirm Password
		if (!cnfpassword) {
			setCnfPasswordError("Please confirm your password");
			hasError = true;
		} else if (password !== cnfpassword) {
			setCnfPasswordError("Passwords do not match");
			hasError = true;
		} else {
			setCnfPasswordError("");
		}

		if (hasError) {
			return;
		}

		try {
			const response = await fetch(APIManager.baseUrl + `users/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				if (data.user) {
					toster()
					setTimeout(() => {
						navigate("/login");
					}, 3000);
				} else {
					console.log(data.message)
					SetError(data.message)
				}
			} else {
				// Registration failed, handle accordingly
				console.error("Registration failed");
			}
		} catch (error) {
			console.error("Error registering:", error);
		}
	};

	const toster = () => {
		toast.success('Registration Successful')
	}

	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.secondary }}
		>
			<Toaster position="bottom-right" expand={false} richColors />
			<Paper sx={classes.loginCard} elevation={10}>
				<Typography sx={{ ...classes.title }}>Register</Typography>
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
				<TextField
					id="standard-basic"
					label="Email"
					variant="standard"
					sx={classes.inputField}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					error={!!emailError}
					helperText={emailError}
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
				<FormControl sx={classes.passwordInput} variant="standard" error={!!cnfPasswordError}>
					<InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
					<Input
						id="standard-adornment-password"
						type={showCnfPassword ? "text" : "password"}
						value={cnfpassword}
						onChange={(e) => setCnfPassword(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => handleClickShowCnfPassword()}
								>
									{showCnfPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
					{cnfPasswordError && <Typography variant="caption" color="error">{cnfPasswordError}</Typography>}
				</FormControl>
				<Button
					variant="contained"
					sx={{
						...classes.loginButton,
						bgcolor: theme.colors.primary,
						fontSize: theme.fontSizes.large,
						"&:hover": { bgcolor: theme.colors.dark }
					}}
					onClick={() => {
						handleRegister()
					}}
				>
					Register
				</Button>
				{error && (
					<Typography color="error" sx={{ marginBottom: 2 }}>
						{error}
					</Typography>
				)}
				<Typography sx={classes.registerText}>
					Already have an account?{" "}
					<Link to="/login">
						<Typography variant="inline" sx={{ color: theme.colors.primary }}>
							Login
						</Typography>
					</Link>
				</Typography>
			</Paper>
		</Container>
	);
};

export default Registration;
