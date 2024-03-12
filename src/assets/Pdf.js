import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	text: {
		fontSize: 12,
		marginBottom: 10,
	},
});

// Create Document Component
const MyDocument = () => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text style={styles.title}>
					Embark on a Journey to Master React.js
				</Text>
				<View style={styles.section}>
					<Text style={styles.subtitle}>Course Overview:</Text>
					<Text style={styles.text}>
						Welcome to our comprehensive React.js course designed for frontend developers of all levels. Whether you're just starting or looking to enhance your skills, this course is tailored to meet your needs.
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.subtitle}>What You'll Learn:</Text>
					<Text style={styles.text}>
						- Setting up a React development environment
					</Text>
					<Text style={styles.text}>
						- Mastering advanced concepts like React Hooks
					</Text>
					<Text style={styles.text}>
						- State management with context API
					</Text>
					<Text style={styles.text}>
						- Hands-on coding exercises
					</Text>
					<Text style={styles.text}>
						- Real-world projects
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.subtitle}>Why Choose Our Course:</Text>
					<Text style={styles.text}>
						Our course offers:
					</Text>
					<Text style={styles.text}>
						- In-depth explanations to help you understand core concepts
					</Text>
					<Text style={styles.text}>
						- Practical coding exercises to reinforce your learning
					</Text>
					<Text style={styles.text}>
						- Real-world projects to apply your skills
					</Text>
					<Text style={styles.text}>
						- Guidance from experienced instructors
					</Text>
					<Text style={styles.text}>
						- Accessible anytime, anywhere
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.subtitle}>Become a Sought-After React Developer:</Text>
					<Text style={styles.text}>
						By the end of this course, you'll gain:
					</Text>
					<Text style={styles.text}>
						- Skills to tackle any frontend development challenge
					</Text>
					<Text style={styles.text}>
						- Confidence in your React.js abilities
					</Text>
					<Text style={styles.text}>
						- Recognition as a sought-after React developer in the industry
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.subtitle}>Enroll Now and Unlock Your Full Potential:</Text>
					<Text style={styles.text}>
						Don't miss out on the opportunity to master React.js and advance your career. Enroll now to unlock the full potential of React!
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.subtitle}>Enroll Now and Unlock Your Full Potential:</Text>
					<Text style={styles.text}>
						Don't miss out on the opportunity to master React.js and advance your career. Enroll now to unlock the full potential of React!
					</Text>
				</View>	<View style={styles.section}>
					<Text style={styles.subtitle}>Enroll Now and Unlock Your Full Potential:</Text>
					<Text style={styles.text}>
						Don't miss out on the opportunity to master React.js and advance your career. Enroll now to unlock the full potential of React!
					</Text>
				</View>	<View style={styles.section}>
					<Text style={styles.subtitle}>Enroll Now and Unlock Your Full Potential:</Text>
					<Text style={styles.text}>
						Don't miss out on the opportunity to master React.js and advance your career. Enroll now to unlock the full potential of React!
					</Text>
				</View>	<View style={styles.section}>
					<Text style={styles.subtitle}>Enroll Now and Unlock Your Full Potential:</Text>
					<Text style={styles.text}>
						Don't miss out on the opportunity to master React.js and advance your career. Enroll now to unlock the full potential of React!
					</Text>
				</View>	<View style={styles.section}>
					<Text style={styles.subtitle}>Enroll Now and Unlock Your Full Potential:</Text>
					<Text style={styles.text}>
						Don't miss out on the opportunity to master React.js and advance your career. Enroll now to unlock the full potential of React!
					</Text>
				</View>
			</View>
		</Page>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text style={styles.title}>
					Second Page Content
				</Text>
				<View style={styles.section}>
					<Text style={styles.subtitle}>Content for the Second Page:</Text>
					<Text style={styles.text}>
						This is the content for the second page.
					</Text>
				</View>
			</View>
		</Page>
	</Document>
);

export default MyDocument;
