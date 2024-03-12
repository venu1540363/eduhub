import React, { useState } from "react";
import Box from "@mui/material/Box";
import CoursesList from "./CoursesList";
import CoursesDashboard from "./CoursesDashboard";
import classes from "../assets/styles/courses";

const Courses = () => {
	const [selectedCourse, setSelectedCourse] = useState(null);

	const updateCourse = async (updatedData) => {
		try {
			if (!selectedCourse || !selectedCourse.uuid) {
				throw new Error("No course selected or no UUID available");
			}

			const response = await fetch(`http://localhost:5002/api/courses/edit/${selectedCourse.uuid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedData)
			});

			if (!response.ok) {
				throw new Error("Failed to update course");
			}

			// You can handle success response here
		} catch (error) {
			console.error("Error updating course:", error.message);
			// You can handle error here
		}
	};

	const handleCourseSelect = (course) => {
		setSelectedCourse(course);
		updateCourse()
	};

	return (
		<Box container sx={{ ...classes.flex }}>
			<CoursesList onSelectCourse={handleCourseSelect} />
			<CoursesDashboard
				selectedCourse={selectedCourse}
				onUpdateCourse={updateCourse}
			/>
		</Box>
	);
};

export default Courses;
