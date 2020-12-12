import React, { Route } from "react";
import Form from "./components/Form";

const App = () => {
	return (
		<>
			<header>
				<h1>Lambda Eats</h1>
				<button>Home</button>
				<button>Help</button>
			</header>

			<div>
				<Route path="/" component={Form}>
					Pizza?
				</Route>
			</div>
			<p>Have some pie!</p>
		</>
	);
};
export default App;
