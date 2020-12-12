import React from "react";
import Form from "./components/Form";
import { Route, useHistory } from "react-router-dom";

const App = () => {
	const history = useHistory();
	const routeToForm = (e) => {
		setTimeout(() => {
			history.push("/");
		}, 1000);
	};
	return (
		<>
			<header>
				<h1>Lambda Eats</h1>
				<button>Home</button>
				<button>Help</button>
			</header>

			<div>
				<Route path="/" component={Form} />
				{/* <Route path="/" render={(props) => <Form {...props} />} /> */}
			</div>
			<button className="goToForm" onClick={routeToForm}>
				Pizza?
			</button>
			<p>Have some pie!</p>
		</>
	);
};
export default App;
