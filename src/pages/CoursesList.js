import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { List, ListItemButton, ListItemText, Collapse, Button, Typography } from "@mui/material";
import { KeyboardArrowRight, ExpandMore, Logout } from "@mui/icons-material";
import classes from "../assets/styles/courses";
import { useTheme } from "@mui/material/styles";
// import { useHistory } from "react-router-dom";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const CoursesList = ({ onSelectCourse }) => {
	const theme = useTheme();
	// const history = useHistory();
	const [categories, setCategories] = useState([]);
	const [courses, setCourses] = useState({});
	const [openCategories, setOpenCategories] = useState({});
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [courseProgress, setCourseProgress] = useState({});

	const increment = (60 * 60) / 1000

	useEffect(() => {
		fetchCategories();
		fetchCourses();
	}, []);

	useEffect(() => {
		const activeCourse = selectedCourse;
		if (activeCourse) {
			const timer = setInterval(() => {
				setCourseProgress(prevProgress => ({
					...prevProgress,
					[activeCourse.uuid]: Math.min(
						prevProgress[activeCourse.uuid] + increment, // Update by calculated increment
						activeCourse.readTime
					)
				}));
			}, 1000); // Update every second

			return () => clearInterval(timer);
		}
	}, [selectedCourse]);

	const fetchCategories = async () => {
		try {
			const response = await fetch("http://localhost:5002/api/course_categories");
			const data = await response.json();
			setCategories(data.response);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	const fetchCourses = async () => {
		try {
			const response = await fetch("http://localhost:5002/api/courses");
			const data = await response.json();
			let formattedData = {};
			data.response.forEach(course => {
				const categoryId = course.courseCategory;
				if (!formattedData[categoryId]) {
					formattedData[categoryId] = [];
				}
				formattedData[categoryId].push(course);
			});
			console.log("formattedData", formattedData)
			setCourses(formattedData);
		} catch (error) {
			console.log("Error fetching courses:", error);
		}
	};

	const handleClickCategory = categoryId => {
		setOpenCategories(prevOpenCategories => ({
			...Object.fromEntries(categories.map(category => [category.uuid, false])), // Close all categories
			[categoryId]: !prevOpenCategories[categoryId] // Toggle the clicked category
		}));
	};

	// const handleSelectCourse = course => {
	// 	// setSelectedCourse(course);
	// 	setCourseProgress(prevProgress => ({
	// 		...prevProgress,
	// 		[course.uuid]: 0
	// 	}));
	// };

	const handleLogout = () => {
		// Clear all state
		setCategories([]);
		setCourses({});
		setOpenCategories({});
		setSelectedCourse(null);
		// Navigate to login screen
		// history.push("/login"); // Change "/login" to your actual login route
	};

	return (
		<Box container sx={{
			...classes.flex,
			...classes.reportsList,
			bgcolor: theme.colors.primary
		}}>
			<List sx={classes.container}>
				{categories.map(category => (
					<Box key={category.uuid}>
						<ListItemButton
							onClick={() => handleClickCategory(category.uuid)}
							sx={{ color: theme.colors.black }}
						>
							<ListItemText
								primary={category.name}
							/>
							{openCategories[category.uuid] ? <ExpandMore /> : <KeyboardArrowRight />}
						</ListItemButton>
						<Collapse in={openCategories[category.uuid]} timeout="auto" unmountOnExit >
							<List sx={{ paddingLeft: theme.padding.medium }}>
								{courses && courses[category.categoryId] &&
									courses[category.categoryId].map(course => (
										<>
											<ListItemButton
												key={course.uuid}
												sx={{ color: theme.colors.lightText }}
												onClick={() => onSelectCourse(course)}
											>
												<ListItemText primary={course.name} />
											</ListItemButton>
											{
												course.readTime <= courseProgress[course.uuid] ? (
													<Typography variant="body2">Complete</Typography>
												) : (
													<LinearProgressWithLabel value={courseProgress[course.uuid] * 100 / course.readTime} />
												)
											}
										</>
									))}
							</List>
						</Collapse>
					</Box>
				))
				}
				{/* <Button
					variant="text"
					startIcon={<Logout />}
					onClick={handleLogout}
					sx={{ marginTop: "auto", color: "#000" }}
				>
					Logout
				</Button> */}
			</List >
		</Box >
	);
};

export default CoursesList;
