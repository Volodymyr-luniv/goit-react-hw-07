import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchContacts,
	selectFilteredContacts,
} from "../../redux/contactsSlice";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";

const ContactList = () => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectFilteredContacts);
	const loading = useSelector((state) => state.contacts.loading);
	const error = useSelector((state) => state.contacts.error);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	return (
		<div className={s.searchBox}>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>Error: {error}</p>}{" "}
			<ul className={s.contactList}>
				{contacts.map((contact) => (
					<Contact key={contact.id} {...contact} />
				))}
			</ul>
		</div>
	);
};

export default ContactList;
