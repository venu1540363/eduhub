import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Dialog, Button, TextField } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../assets/Pdf";
import classes from "../assets/styles/courses";
import { ThemeContext } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

const CoursesDashboard = ({ selectedCourse }) => {
	const theme = useTheme();
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);

	useEffect(() => {
		setStartTime(performance.now());

		return () => {
			setEndTime(performance.now());
		};
	}, []);


	useEffect(() => {
		const handleBeforeUnload = () => {
			setEndTime(performance.now());
		};
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	useEffect(() => {
		if (selectedCourse) {
			const timer = setTimeout(() => {
				setShowPopup(true);
			}, selectedCourse.readTime * 1000); // 1 hour

			return () => clearTimeout(timer);
		}
	}, [startTime]);

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const calculateScreenTime = () => {
		if (startTime && endTime) {
			const duration = endTime - startTime;
			console.log("Time spent on this screen:", duration, "milliseconds");
		}
	};

	useEffect(() => {
		calculateScreenTime();
	}, [startTime, endTime]);

	return (
		<Box sx={{ ...classes.flex, ...classes.dashboard }}>
			{selectedCourse ? (
				<Box>
					<Box>
						<Typography variant="h4" sx={{
							borderBottom: "1px solid", borderColor: theme.colors.grey,
							height: theme.padding.extreme, lineHeight: theme.padding.extreme,
							color: theme.colors.heading, paddingLeft: theme.padding.medium,
							paddingRight: theme.padding.medium
						}}>
							{selectedCourse.name}
						</Typography>
						<Typography variant="body1" sx={{
							color: theme.colors.text,
							padding: theme.padding.medium,
						}}>
							{selectedCourse.description}
						</Typography>
					</Box>
					<iframe src="https://drive.google.com/file/d/1yKfXIiMuYgFGixktM8PUTb6ODhP8-dE9/preview?usp=sharing" style={{ width: '100%', height: '60%' }}></iframe>
				</Box>
			) : (
				<Typography variant="body1" sx={{ color: theme.colors.black }}>
					Please select a course from the list.
				</Typography>
			)}
			<Dialog open={showPopup} onClose={handleClosePopup}>
				<Typography variant="body1">
					Task completed! You have spent 1 hour on this screen.
				</Typography>
				<Button onClick={handleClosePopup}>Close</Button>
			</Dialog>
		</Box>
	);
};

export default CoursesDashboard;
