import React from "react";
import { useHistory } from "react-router-dom";
import pizza from "../Assets/Pizza.jpg";

const Home = (props) => {
	const history = useHistory();
	const routeToForm = (e) => {
		setTimeout(() => {
			history.push("/form");
		}, 1000);
	};

	return (
		<div className="home-wrapper">
			<img className="pizza" src={pizza} alt="pizza" />
			<div className="button-container">
			<button className="goToForm" onClick={routeToForm}>
				Pizza?
			</button>
			</div>
		</div>
	);
};

export default Home;
