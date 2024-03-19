import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CoursesList from "./CoursesList";
import CoursesDashboard from "./CoursesDashboard";
import classes from "../assets/styles/courses";
import { useNavigate } from 'react-router-dom'
const Courses = () => {
	const navigate = useNavigate()
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [selectedCorseProgress, setSelectedCourseProgress] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate("/login", { replace: true });
		}
	}, [])

	const handleCourseSelect = (course) => {
		setSelectedCourse(course);
	};

	return (
		<Box container sx={{ ...classes.flex }}>
			<CoursesList onSelectCourse={handleCourseSelect} selectedCorseProgress={selectedCorseProgress} selectedCourse={selectedCourse} />
			<CoursesDashboard selectedCourse={selectedCourse} setSelectedCourseProgress={setSelectedCourseProgress} />
		</Box>
	);
};

export default Courses;
