import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import s from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteContact(id));
	};

	return (
		<li className={s.contactListItem}>
			<div className={s.contactDetails}>
				<span>{name}</span>
				<span>{number}</span>
			</div>
			<button className={s.deleteButton} onClick={handleDelete}>
				Delete
			</button>
		</li>
	);
};

export default Contact;
