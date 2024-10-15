import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addContact,
	deleteContact,
	fetchContacts,
	selectContacts,
} from "./redux/contactsSlice";
import { selectNameFilter } from "./redux/filtersSlice";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import s from "./App.module.css";

const App = () => {
	const dispatch = useDispatch();

	const contacts = useSelector(selectContacts);
	const filter = useSelector(selectNameFilter);

	const handleAddContact = (newContact) => {
		dispatch(addContact(newContact));
	};

	const handleDeleteContact = (contactId) => {
		dispatch(deleteContact(contactId));
	};

	const filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(filter.toLowerCase())
	);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	return (
		<div className={s.container}>
			<h1 className={s.headerTitle}>Phonebook</h1>
			<ContactForm addContact={handleAddContact} />
			<SearchBox />
			<ContactList
				onDeleteContact={handleDeleteContact}
				contacts={filteredContacts}
			/>
		</div>
	);
};

export default App;
