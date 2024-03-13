import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Dialog, Button } from "@mui/material";
import classes from "../assets/styles/courses";
import { useTheme } from "@mui/material/styles";

const CoursesDashboard = ({ selectedCourse, setSelectedCourseProgress }) => {
	const theme = useTheme();
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
	const [timer, setTimer] = useState(selectedCourse?.readTime || null)
	const [progress, setProgress] = useState(selectedCourse?.progress * 1000 || null)
	const [prevCourseId, setPrevCourseId] = useState(selectedCourse?.uuid || null)
	let myTimeout


	useEffect(() => {
		const myTimeout = setTimeout(() => {
			if (timer && progress >= timer * 1000) {
				setShowPopup(true)
				saveProgressInDb()
				setTimer(null)
			}
			else {
				setProgress((progress) + 1000)
				setSelectedCourseProgress(progress / 1000)
			}
		}, 1000);
		return () => {
			clearTimeout(myTimeout)
		}
	}, [progress, timer])

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const calculateScreenTime = () => {
		if (startTime && endTime) {
			const duration = endTime - startTime;
			console.log("Time spent on this screen:", duration, "milliseconds");
		}
	};


	const saveProgressInDb = async () => {
		try {
			const body = {
				progress: progress / 1000
			}
			console.log(body, "body of put")
			const response = await fetch(`http://localhost:5002/api/courses/edit/${prevCourseId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			const data = await response.json()
			setPrevCourseId(selectedCourse.uuid)

		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		saveProgressInDb()
		setTimer(null)
		clearTimeout(myTimeout);
		selectedCourse ? setProgress(selectedCourse.progress * 1000) : setProgress(0)
	}, [selectedCourse])

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
					<iframe src={selectedCourse.pdfUrl} style={{
						width: "100%",
						height: "100%",
						boxSizing: "border-box",
						padding: `0px ${theme.padding.medium}`,
						border: "0px"
					}}></iframe>
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
