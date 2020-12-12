import React, { useEffect, useState } from "react";

export default function Form() {
	// TODO Set up state
	const [formState, setFormState] = useState({
		name: "",
		size: "-Select Size-",
		sauce: "",
		toppings: "",
		glutenFreeCrust: false,
		specialInstructions: "",
		quantity: "",
	});

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

	// TODO onChange function

	const inputChange = (e) => {
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

	// TODO onSubmit function

	const formSubmit = (e) => {
		e.preventDefault();

		axioa.post("https://reqres.in/api/users", formState)
			.then((res) => {
				console.log("RESPONSE", res);
				setPost(res.data);
				setServerError(null);
				setFormState({
					name: "",
					size: "",
					sauce: "",
					toppings: "",
					glutenFreeCrust: "",
					specialInstructions: "",
					quantity: "",
				});
			})
			.catch((err) => {
				setServerError("Ooops! Something went wrong!");
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
		toppings: yup
			.string()
			.oneOf([
				"Pepperoni",
				"Sausage",
				"Bacon",
				"Italian Sausage",
				"Grilled Chicken",
				"Onions",
				"Green Pepper",
				"Black Olives",
				"Green Olives",
				"Pineapple",
				"Mushrooms",
			]),
		glutenFreeCrust: yup.boolean().oneOf([true]),
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
					onChange={inputChange}
				/>
				{errors.name.length > 2 ? (
					<p data-cy="err1" className="error">
						{errors.name}
					</p>
				) : null}
			</label>

			<label htmlFor="size">
				size
				<select
					id="size"
					type="text"
					name="size"
					value={formState.size}
					onChange={inputChange}
				>
					<option value=""> -Select Size-</option>
					<option value="Small">Small</option>
					<option value="Medium">Medium</option>
					<option value="Large">Large</option>
					<option value="X-Large">X-Large</option>
				</select>
				{errors.size.length > 0 ? (
					<p data-cy="err1" className="error">
						{errors.size}
					</p>
				) : null}
			</label>

			<label htmlFor="sauce">
				sauce
				<select
					id="sauce"
					type="text"
					name="sauce"
					value={formState.sauce}
					onChange={inputChange}
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
					<p data-cy="err1" className="error">
						{errors.sauce}
					</p>
				) : null}
			</label>

			<label htmlFor="toppings">
				toppings
				<input
					id="toppings"
					type="radio"
					name="toppings"
					value={formState.toppings}
					onChange={inputChange}
				/>
				{errors.toppings.length > 0 ? (
					<p data-cy="err1" className="error">
						{errors.toppings}
					</p>
				) : null}
			</label>

			<label htmlFor="glutenFreeCrust">
				Gluten Free Crust
				<input
					id="glutenFreeCrust"
					type="checkbox"
					name="glutenFreeCrust"
					value={formState.glutenFreeCrust}
					onChange={inputChange}
				/>
				{errors.glutenFreeCrust.length > 0 ? (
					<p data-cy="err1" className="error">
						{errors.glutenFreeCrust}
					</p>
				) : null}
			</label>

			<label htmlFor="specialInstructions">
				Special Instructions
				<input
					id="specialInstructions"
					type="text"
					name="specialInstructions"
					value={formState.specialInstructions}
					onChange={inputChange}
				/>
				{errors.specialInstructions.length > 0 ? (
					<p data-cy="err1" className="error">
						{errors.specialInstructions}
					</p>
				) : null}
			</label>

			<label htmlFor="quantity">
				quantity
				<select
					id="quantity"
					type="text"
					name="quantity"
					value={formState.quantity}
					onChange={inputChange}
				>
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
		</form>
	);
}
