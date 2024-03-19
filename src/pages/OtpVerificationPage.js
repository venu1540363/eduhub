import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import classes from "../assets/styles/Login";
import { useLocation, useNavigate } from "react-router-dom";
import APIManager from "../API/ApiManager";

const OtpVerificationPage = () => {
	const theme = useTheme();
	const [error, setError] = useState();
	const [otp, setOtp] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const verifyOtp = async () => {
		try {
			const response = await fetch(APIManager.baseUrl + `users/verify-otp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email: location.state.email, verificationCode: otp })
			})
			console.log(response)
			const data = await response.json();
			console.log(data)
			if (response.ok) {
				data.error && setError(data.error)
				data.isValidated ?
					navigate("/confirm-password") : setError(data.error || data.message)
			} else {
				setError(data.error)
			}
		} catch {
			console.log("evds")
		}
	}

	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.secondary }}
		>
			<Paper sx={classes.loginCard} elevation={10}>
				<Typography sx={{ ...classes.title }}>Enter OTP</Typography>
				<TextField
					id="standard-basic"
					label="Enter OTP"
					variant="standard"
					sx={classes.inputField}
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				></TextField>
				<Button
					variant="contained"
					sx={{
						...classes.loginButton,
						bgcolor: theme.colors.primary,
						fontSize: theme.fontSizes.large,
						"&:hover": { bgcolor: theme.colors.dark }
					}}
					onClick={() => verifyOtp()}
				>
					Validate Otp
				</Button>
				{error && <Typography variant="caption" color="error">{error}</Typography>}
			</Paper>
		</Container>
	);
};

export default OtpVerificationPage;
