import React, { useState } from "react";

export default function Form() {
	// TODO Set up state
	const [formState, setFormState] = useState({
		size: "",
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

	// TODO Set up error state

	const [errors, setErrors] = useState({
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
	// TODO onSubmit function
	// TODO Schema
	// TODO useEffect
	// TODO JSX
}
