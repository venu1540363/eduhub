import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import classes from "../assets/styles/Login";
import { Link } from "react-router-dom";

const OtpVerificationPage = () => {
	const theme = useTheme();
	const [otp, setOtp] = useState("");

	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.primary }}
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
				>
					<Link to="/confirm-password">Validate Otp</Link>
				</Button>
			</Paper>
		</Container>
	);
};

export default OtpVerificationPage;
