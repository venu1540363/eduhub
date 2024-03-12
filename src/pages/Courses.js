import React, { useState } from "react";
import Box from "@mui/material/Box";
import CoursesList from "./CoursesList";
import CoursesDashboard from "./CoursesDashboard";
import classes from "../assets/styles/courses";

const Courses = () => {
	const [selectedCourse, setSelectedCourse] = useState(null);

	const handleCourseSelect = (course) => {
		setSelectedCourse(course);
	};

	return (
		<Box container sx={{ ...classes.flex }}>
			<CoursesList onSelectCourse={handleCourseSelect} />
			<CoursesDashboard selectedCourse={selectedCourse} />
		</Box>
	);
}

export default Courses;
