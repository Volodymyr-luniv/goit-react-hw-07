import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import s from "./ContactForm.module.css";

const ContactForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !number) {
			setError("Please fill in all fields.");
			return;
		}

		dispatch(addContact({ name, number }));
		setName("");
		setNumber("");
		setError("");
	};

	return (
		<form onSubmit={handleSubmit} className={s.contactForm}>
			{error && <p className={s.error}>{error}</p>}{" "}
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
				className={s.input}
				required
			/>
			<input
				type="tel"
				value={number}
				onChange={(e) => setNumber(e.target.value)}
				placeholder="Phone Number"
				className={s.input}
				required
			/>
			<button type="submit" className={s.button}>
				Add Contact
			</button>{" "}
		</form>
	);
};

export default ContactForm;
