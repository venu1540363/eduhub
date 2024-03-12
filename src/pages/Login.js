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

const Login = () => {
	const theme = useTheme();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.primary }}
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
				<Typography sx={classes.forgotContainer}>
					<Link to="/forgot-password">
						<Typography variant="inline" sx={{ color: theme.colors.primary }}>
							Forgot Password?
						</Typography>
					</Link>
				</Typography>
				<Button
					variant="contained"
					sx={{
						...classes.loginButton,
						bgcolor: theme.colors.primary,
						fontSize: theme.fontSizes.large,
						"&:hover": { bgcolor: theme.colors.dark }
					}}
				>
					<Link to="/Courses">LOGIN</Link>
				</Button>
				<Typography sx={{ ...classes.registerText }}>
					Don't have an account?{" "}
					<Link to="/Registration">
						<Typography variant="inline" sx={{ color: theme.colors.primary }}>
							Register
						</Typography>
					</Link>
				</Typography>
			</Paper>
		</Container>
	);
};

export default Login;
