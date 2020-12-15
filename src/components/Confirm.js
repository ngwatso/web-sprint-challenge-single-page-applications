import React from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

const Confirm = (props) => {
	const { newOrder } = props;
	// const [confirmOrder, setConfirmOrder] = useState([]);
	// const params = useParams();
	// const confirmOrder = props.newOrder.find((item) => {
	// 	return item.id === Number(params.id);
	// });

	// const { confirmOrder } = useParams;

	// useEffect(() => {
	// 	axios.get("https://reqres.in/api/users")
	// 		.then((res) => {
	// 			console.log("MY ORDER", res.data);
	// 			setConfirmOrder(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log("ERROR, SOMETHING WENT WRONG", err);
	// 		});
	// }, []);
	const toppings = [
		"Pepperoni",
		"Spicy Pepperoni",
		"Italian Sausage",
		"Bacon",
		"Ham",
		"Hamburger",
		"Mushrooms",
		"Onions",
		"Green Pepper",
		"Pineapple",
		"Black Olives",
		"Green Olives",
	];
	console.log(toppings);

	return (
		<div className="order-wrapper">
			<div className="my-order" key={newOrder.id}>
				<h2>Name: {newOrder.name}</h2>
				<h3>Qty: {newOrder.quantity}</h3>
				<h3>Size: {newOrder.size}</h3>
				<h3>Sauce: {newOrder.sauce}</h3>
				{/* <h3>Toppings: {newOrder.toppings}</h3> */}
				<h3>Toppings: </h3>
				<ul>
					{toppings.map((value, index) => {
						return <li key={index}>{value}</li>;
					})}
				</ul>

				<h3>
					Special Instructions: {newOrder.specialInstructions}
				</h3>
			</div>
		</div>
	);
};

export default Confirm;
