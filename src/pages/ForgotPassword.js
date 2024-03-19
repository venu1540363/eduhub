import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import classes from "../assets/styles/Login";
import { useNavigate } from "react-router-dom";
import APIManager from "../API/ApiManager";

const ForgotPasswordPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const submitemail = async () => {
		try {
			const response = await fetch(APIManager.baseUrl + `users/forgot-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email })
			});

			if (response.ok) {
				navigate("/otp-verification", { state: { email: email } });
			} else {
				const data = await response.json();
				setError(data.error || "Token not created. Please login again!");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.secondary }}
		>
			<Paper sx={classes.loginCard} elevation={10}>
				<Typography sx={{ ...classes.title }}>Reset Password</Typography>
				<TextField
					id="standard-basic"
					label="Registered Email"
					variant="standard"
					sx={classes.inputField}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Button
					variant="contained"
					sx={{
						...classes.loginButton,
						bgcolor: theme.colors.primary,
						fontSize: theme.fontSizes.large,
						color: theme.colors.white,
						"&:hover": { bgcolor: theme.colors.dark },
					}}
					onClick={() => submitemail()}
				>
					Send Verification Email
				</Button>
				{error && <Typography variant="caption" color="error">{error}</Typography>}
			</Paper>
		</Container>
	);
};

export default ForgotPasswordPage;
