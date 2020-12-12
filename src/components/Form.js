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
}
