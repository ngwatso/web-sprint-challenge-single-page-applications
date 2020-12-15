import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
// import Confirm from "./Confirm";
import { useHistory } from "react-router-dom";

export default function Form(props) {
	// TODO Set up state
	const [formState, setFormState] = useState({
		name: "",
		size: "",
		sauce: "",
		toppings: [],
		glutenFreeCrust: false,
		specialInstructions: "",
		quantity: "",
	});

	const history = useHistory();
	const routeToConfirm = (e) => {
		setTimeout(() => {
			history.push("/confirm");
			// return <Confirm order={post.data} />;
		}, 1000);
	};

	// TODO Set up serverError state

	const [serverError, setServerError] = useState("");

	// TODO Button enabled/disabled state

	const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

	// TODO response from API

	const [post, setPost] = useState([]);

	// TODO Set up error state

	const [errors, setErrors] = useState({
		name: "",
		size: "",
		sauce: "",
		toppings: "",
		glutenFreeCrust: "",
		specialInstructions: "",
		quantity: "",
	});

	// TODO validation

	const validateChange = (e) => {
		yup.reach(formSchema, e.target.name)
			.validate(
				e.target.type === "checkbox"
					? e.target.checked
					: e.target.value
			)
			.then((valid) => {
				setErrors({ ...errors, [e.target.name]: "" });
			})
			.catch((err) => {
				console.log("ERROR", err);
				setErrors({ ...errors, [e.target.name]: err.errors[0] });
			});
	};

	// const toppingsArr = () => {
	// 	if (pepperoni === true) {
	// 		toppings.push("Pepperoni");
	// 	}

	// 	if (spicyPepperoni === true) {
	// 		toppings.push("Spicy Pepperoni");
	// 	}

	// 	if (italianSausage === true) {
	// 		toppings.push("Italian Sausage");
	// 	}

	// 	if (bacon === true) {
	// 		toppings.push("Bacon");
	// 	}

	// 	if (ham === true) {
	// 		toppings.push("Ham");
	// 	}

	// 	if (hamburger === true) {
	// 		toppings.push("Hamburger");
	// 	}

	// 	if (mushrooms === true) {
	// 		toppings.push("Mushrooms");
	// 	}

	// 	if (onions === true) {
	// 		toppings.push("Onions");
	// 	}

	// 	if (greenPepper === true) {
	// 		toppings.push("Green Pepper");
	// 	}

	// 	if (pineapple === true) {
	// 		toppings.push("Pineapple");
	// 	}

	// 	if (blackOlives === true) {
	// 		toppings.push("Black Olives");
	// 	}

	// 	if (greenOlives === true) {
	// 		toppings.push("Green Olives");
	// 	}
	// };

	// TODO onSubmit function

	const handleChange = (e) => {
		e.persist();

		const newFormState = {
			...formState,
			[e.target.name]:
				e.target.type === "checkbox"
					? e.target.checked
					: e.target.value,
		};

		validateChange(e);
		setFormState(newFormState);
	};

	const formSubmit = (e) => {
		e.preventDefault();
		props.newPizzaOrder(formState);
		setFormState({
			name: "",
			size: "",
			sauce: "",
			toppings: [],
			glutenFreeCrust: "",
			specialInstructions: "",
			quantity: "",
		});

		axios.post("https://reqres.in/api/users", formState)
			.then((res) => {
				console.log("RESPONSE", res);
				setPost(res.data);
				console.log("POST", post);
				setServerError(null);
				setFormState({
					name: "",
					size: "",
					sauce: "",
					toppings: [],
					glutenFreeCrust: "",
					specialInstructions: "",
					quantity: "",
				});
			})
			.catch((err) => {
				setServerError("Oops! Something went wrong!");
			});
	};

	// TODO Schema

	const formSchema = yup.object().shape({
		name: yup.string().required("Name is required (min 2 char)"),
		size: yup
			.string()
			.oneOf(["Small", "Medium", "Large", "X-Large"])
			.required("Size is required"),
		sauce: yup
			.string()
			.oneOf([
				"Original Red",
				"Garlic Ranch",
				"BBQ",
				"Spinach Alfredo",
			])
			.required("Sauce is required"),
		pepperoni: yup.boolean(),
		spicyPepperoni: yup.boolean(),
		italianSausage: yup.boolean(),
		bacon: yup.boolean(),
		ham: yup.boolean(),
		hamburger: yup.boolean(),
		mushrooms: yup.boolean(),
		onions: yup.boolean(),
		greenPepper: yup.boolean(),
		pineapple: yup.boolean(),
		blackOlives: yup.boolean(),
		greenOlives: yup.boolean(),
		glutenFreeCrust: yup.boolean(),
		specialInstructions: yup.string(),
		quantity: yup
			.string()
			.oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
			.required("Quantity is required"),
	});

	// TODO useEffect

	useEffect(() => {
		formSchema.isValid(formState).then((valid) => {
			console.log("Is form valid?", valid);
			setButtonIsDisabled(!valid);
		});
	}, [formState]);

	// TODO JSX

	return (
		<form onSubmit={formSubmit}>
			{serverError && <p className="error">{serverError}</p>}

			<label htmlFor="name">
				Name
				<input
					id="name"
					type="text"
					name="name"
					value={formState.name}
					onChange={handleChange}
				/>
				{errors.name.length >= 2 ? (
					<p data-cy="err1" className="error">
						{errors.name}
					</p>
				) : null}
			</label>
			<label htmlFor="size">
				Size
				<select
					id="size"
					type="text"
					name="size"
					value={formState.size}
					onChange={handleChange}
				>
					<option value=""> -Select Size-</option>
					<option value="Small">Small</option>
					<option value="Medium">Medium</option>
					<option value="Large">Large</option>
					<option value="X-Large">X-Large</option>
				</select>
				{errors.size.length > 0 ? (
					<p data-cy="err2" className="error">
						{errors.size}
					</p>
				) : null}
			</label>
			<label htmlFor="sauce">
				Sauce
				<select
					id="sauce"
					type="text"
					name="sauce"
					value={formState.sauce}
					onChange={handleChange}
				>
					<option value="">-Select Sauce-</option>
					<option value="Original Red">Original Red</option>
					<option value="Garlic Ranch">Garlic Ranch</option>
					<option value="BBQ">BBQ</option>
					<option value="Spinach Alfredo">
						Spinach Alfredo
					</option>
				</select>
				{errors.sauce.length > 0 ? (
					<p data-cy="err3" className="error">
						{errors.sauce}
					</p>
				) : null}
			</label>
			<div>
				<label className="top-label">Toppings</label>
			</div>
			<div className="toppings">
				<label htmlFor="pepperoni">
					Pepperoni
					<input
						id="pepperoni"
						type="checkbox"
						name="pepperoni"
						value={formState.pepperoni}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="spicyPepperoni">
					Spicy Pepperoni
					<input
						id="spicyPepperoni"
						type="checkbox"
						name="spicyPepperoni"
						value={formState.spicyPepperoni}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="italianSausage">
					Italian Sausage
					<input
						id="italianSausage"
						type="checkbox"
						name="italianSausage"
						value={formState.italianSausage}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="bacon">
					Bacon
					<input
						id="bacon"
						type="checkbox"
						name="bacon"
						value={formState.bacon}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="ham">
					Ham
					<input
						id="ham"
						type="checkbox"
						name="ham"
						value={formState.ham}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="hamburger">
					Hamburger
					<input
						id="hamburger"
						type="checkbox"
						name="hamburger"
						value={formState.hamburger}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="mushrooms">
					Mushrooms
					<input
						id="mushrooms"
						type="checkbox"
						name="mushrooms"
						value={formState.mushrooms}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="onions">
					Onions
					<input
						id="onions"
						type="checkbox"
						name="onions"
						value={formState.onions}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="greenPepper">
					Green Pepper
					<input
						id="greenPepper"
						type="checkbox"
						name="greenPepper"
						value={formState.greenPepper}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="pineapple">
					Pineapple
					<input
						id="pineapple"
						type="checkbox"
						name="pineapple"
						value={formState.pineapple}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="blackOlives">
					Black Olives
					<input
						id="blackOlives"
						type="checkbox"
						name="blackOlives"
						value={formState.blackOlives}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="greenOlives">
					Green Olives
					<input
						id="greenOlives"
						type="checkbox"
						name="greenOlives"
						value={formState.greenOlives}
						onChange={handleChange}
					/>
				</label>
			</div>
			<div className="crust-wrapper">
				<label htmlFor="glutenFreeCrust" className="crust-l">
					Gluten Free Crust (+ 1.99)
					<input
						className="crust-c"
						id="glutenFreeCrust"
						type="checkbox"
						name="glutenFreeCrust"
						value={formState.glutenFreeCrust}
						onChange={handleChange}
					/>
					{errors.glutenFreeCrust.length > 0 ? (
						<p data-cy="err5" className="error">
							{errors.glutenFreeCrust}
						</p>
					) : null}
				</label>
			</div>
			<label htmlFor="specialInstructions">
				Special Instructions
				<textarea
					id="specialInstructions"
					type="text"
					name="specialInstructions"
					value={formState.specialInstructions}
					onChange={handleChange}
				/>
				{errors.specialInstructions.length > 0 ? (
					<p data-cy="err6" className="error">
						{errors.specialInstructions}
					</p>
				) : null}
			</label>
			<label htmlFor="quantity" className="qty">
				Qty
				<select
					id="quantity"
					type="text"
					name="quantity"
					value={formState.quantity}
					onChange={handleChange}
				>
					<option value="">-</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
				{errors.quantity.length > 0 ? (
					<p data-cy="err1" className="error">
						{errors.quantity}
					</p>
				) : null}
			</label>
			<button
				type="submit"
				className="submit"
				disabled={buttonIsDisabled}
				// onClick={(toppingsArr, routeToConfirm)}
				onClick={routeToConfirm}
			>
				Submit Order
			</button>
		</form>
	);
}
