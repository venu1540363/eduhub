import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	{
		return (
			<div>
				<div>login page</div>
				<Link to="/login">Login</Link>
				<Link to="/forgot-password">Forgot password</Link>
				<Link to="/registration">Registration</Link>
			</div>
		)
	}
}

export default Home