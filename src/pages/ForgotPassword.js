import { Container, Typography, Paper, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import classes from "../assets/styles/Login";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
	const theme = useTheme();
	const [email, setEmail] = useState("");

	return (
		<Container
			maxWidth="xl"
			sx={{ ...classes.container, bgcolor: theme.colors.primary }}
		>
			<Paper sx={classes.loginCard} elevation={10}>
				<Typography sx={{ ...classes.title }}>Reset Password</Typography>
				<TextField
					id="standard-basic"
					label="Registerd Email"
					variant="standard"
					sx={classes.inputField}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></TextField>
				<Button
					variant="contained"
					sx={{
						...classes.loginButton,
						bgcolor: theme.colors.primary,
						fontSize: theme.fontSizes.large,
						color: theme.colors.white,
						"&:hover": { bgcolor: theme.colors.dark },
					}}
				>
					<Link to="/otp-verification">
						Send Verification Email
					</Link>
				</Button>
			</Paper>
		</Container>
	);
};

export default ForgotPasswordPage;
