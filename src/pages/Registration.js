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
import React, { useState } from "react";
import classes from "../assets/styles/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const Registration = () => {
	const theme = useTheme();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cnfpassword, setCnfPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showCnfPassword, setShowCnfPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowCnfPassword = () => setShowCnfPassword((show) => !show);
	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.primary }}
		>
			<Paper sx={classes.loginCard} elevation={10}>
				<Typography sx={{ ...classes.title }}>Register</Typography>
				<TextField
					id="standard-basic"
					label="Username"
					variant="standard"
					sx={classes.inputField}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				></TextField>
				<TextField
					id="standard-basic"
					label="Email"
					variant="standard"
					sx={classes.inputField}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></TextField>
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
									onClick={handleClickShowPassword}
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
									onClick={handleClickShowCnfPassword}
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
					Register
				</Button>
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
