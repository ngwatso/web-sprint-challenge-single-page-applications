import React, { useState } from "react";
import Home from "./components/Home";
import Form from "./components/Form";
import Confirm from "./components/Confirm";
import { Route, Link } from "react-router-dom";

const App = () => {
	const [newOrder, setNewOrder] = useState([]);
	const newPizzaOrder = (pizza) => {
		const myOrder = {
			id: Date.now(),
			name: pizza.name,
			quantity: pizza.quantity,
			size: pizza.size,
			sauce: pizza.sauce,
			toppings: pizza.toppings,
			glutenFreeCrust: pizza.glutenFreeCrust,
			specialInstructions: pizza.specialInstructions,
		};
		setNewOrder(...newOrder, myOrder);
	};
	console.log("MY ORDER", newOrder);
	return (
		<div className="App">
			<nav>
				<h1>Lambda Eats</h1>
				<div className="nav-links">
					<Link to="/">Home</Link>
					<Link to="">Help</Link>
				</div>
			</nav>
			<Route
				path="/confirm"
				render={(props) => (
					<Confirm {...props} newOrder={newOrder} />
				)}
			/>
			<Route
				path="/form"
				render={(props) => (
					<Form {...props} newPizzaOrder={newPizzaOrder} />
				)}
			/>
			<Route exact path="/" component={Home} />

			{/* <Route path="/confirm" component={Confirm} newOrder={newOrder} /> */}
		</div>
	);
};
export default App;
