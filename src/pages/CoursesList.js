import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { List, ListItemButton, ListItemText, Collapse, Typography, Button } from "@mui/material";
import { KeyboardArrowRight, ExpandMore } from "@mui/icons-material";
import classes from "../assets/styles/courses";
import { useTheme } from "@mui/material/styles";
import LinearProgress from '@mui/material/LinearProgress';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const CoursesList = ({ onSelectCourse, selectedCorseProgress, selectedCourse }) => {
	const theme = useTheme();
	const [categories, setCategories] = useState([]);
	const [courses, setCourses] = useState({});
	const [openCategories, setOpenCategories] = useState({});
	const [courseProgress, setCourseProgress] = useState({});
	const [showLoader, setShowLoader] = useState(false)

	useEffect(() => {
		console.log("changed the progress", selectedCorseProgress)
	})

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
				console.log(formattedData)
			});
			setCourses(formattedData);
			setShowLoader(false)
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

	useEffect(() => {
		setShowLoader(true)
		fetchCategories();
		setTimeout(() => {
			fetchCourses();
		}, 2000);
	}, [selectedCourse]);

	const handleLogout = () => {
		// Your logout logic here
		console.log("Logging out...");
	};

	function LinearProgressWithLabel(props) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ width: '100%', mr: 1 }}>
					<LinearProgress
						variant="determinate"
						sx={{
							color: (theme) =>
								theme.palette.grey[theme.palette.mode === 'light' ? 900 : 800],
						}}
						{...props} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant="body2" sx={{ color: theme.colors.whiteSmoke }}>{`${Math.round(
						props.value,
					)}%`}</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<Box container sx={{
			...classes.flex,
			...classes.reportsList,
			bgcolor: theme.colors.secondary
		}}>
			<List sx={classes.container}>
				{categories.map(category => (
					<Box key={category.uuid}>
						<ListItemButton
							onClick={() => handleClickCategory(category.uuid)}
							sx={{ color: theme.colors.white }}
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
												onClick={() => onSelectCourse(course)}
												sx={{ color: theme.colors.whiteSmoke }}
											>
												<ListItemText
													primary={selectedCourse && selectedCourse.uuid === course.uuid ? <strong>{course.name}</strong> : course.name} />
											</ListItemButton>
											{
												course.readTime <= courseProgress[course.uuid] ? (
													<Typography variant="body2">Complete</Typography>
												) : (
													showLoader ? <Typography sx={{ color: theme.colors.whiteSmoke }}>Loading...</Typography > :
														<LinearProgressWithLabel
															value={selectedCourse && selectedCourse.uuid === course.uuid ? (selectedCorseProgress * 100) / course.readTime : (course.progress * 100) / course.readTime} />
												)
											}
										</>
									))}
							</List>
						</Collapse>
					</Box>
				))
				}
			</List >
			<Box sx={{ padding: theme.padding.medium }}>
				<Button onClick={handleLogout} sx={{
					backgroundColor: theme.colors.secondary,
					color: theme.colors.white,
					border: `1px solid ${theme.colors.heading}`,
					borderRadius: '4px',
					letterSpacing: "2px",
					padding: '8px 16px',
					width: '100%',
					transition: 'background-color 0.3s, color 0.3s',
					'&:hover': {
						color: theme.colors.black,
						backgroundColor: theme.colors.primary, // Changed from 'bgcolor' to 'backgroundColor'
						boxShadow: '0px 0px 5px rgba(0,0,0,0.3)', // Adding box-shadow on hover
						transform: 'translateY(-2px)', // Adding translateY animation on hover
					},
					'&:active': {
						backgroundColor: theme.colors.secondaryDark, // Changing color on active state
					},
					'&:focus': {
						outline: 'none', // Removing focus outline
					},
				}}>
					<LogoutRoundedIcon sx={{ pr: 1 }} />
					Logout
				</Button>
			</Box>
		</Box >
	);
};

export default CoursesList;