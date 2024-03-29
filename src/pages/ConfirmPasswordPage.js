import {
	Container,
	Typography,
	Paper,
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
import { useLocation, useNavigate } from "react-router-dom";
import APIManager from "../API/ApiManager";

const ConfirmPasswordPage = () => {
	const theme = useTheme();
	const navigate = useNavigate()
	const location = useLocation()
	const [password, setPassword] = useState("");
	const [cnfpassword, setCnfPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showCnfPassword, setShowCnfPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowCnfPassword = () => setShowCnfPassword((show) => !show);

	const resetPassword = async () => {
		console.log(password)
		console.log(cnfpassword)
		console.log(location.state.email)

		if (password !== cnfpassword) {
			console.error('New password and confirm password do not match');
			// return;
		}
		else {
			try {
				const response = await fetch(APIManager.baseUrl + `users/reset-password`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email: location.state.email, newPassword: password })
				})
				console.log(location.state.email)
				console.log(response)
				const data = await response.json();
				console.log(data)
				if (response.ok) {
					// data.error && setError(data.error)
					// data.isValidated ?
					navigate("/login")
					// : setError(data.error || data.message)
				} else {
					console.error(response.error);
				}
			} catch (error) {
				console.log("evds", error)
			}
		}

	};

	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.secondary }}
		>
			<Paper sx={classes.loginCard} elevation={10}>
				<Typography sx={{ ...classes.title }}>Confirm Password</Typography>
				<FormControl sx={classes.passwordInput} variant="standard">
					<InputLabel htmlFor="standard-adornment-password">
						Password
					</InputLabel>
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
				</FormControl>
				<FormControl sx={classes.passwordInput} variant="standard">
					<InputLabel htmlFor="standard-adornment-password">
						Confirm Password
					</InputLabel>
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
				</FormControl>
				<Button
					variant="contained"
					sx={{
						...classes.loginButton,
						bgcolor: theme.colors.primary,
						fontSize: theme.fontSizes.large,
						"&:hover": { bgcolor: theme.colors.dark }
					}}
				>
					<Typography variant="inline" onClick={() => resetPassword()}>Save Password</Typography>
				</Button>
			</Paper>
		</Container>
	);
};

export default ConfirmPasswordPage;
