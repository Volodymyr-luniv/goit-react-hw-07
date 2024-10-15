import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import s from "./SearchBox.module.css";

const SearchBox = () => {
	const dispatch = useDispatch();
	const filter = useSelector(selectNameFilter);

	const handleFilterChange = (e) => {
		dispatch(changeFilter(e.target.value));
	};

	return (
		<div className={s.searchBox}>
			<label htmlFor="search">Search Contacts</label>
			<input
				type="text"
				id="search"
				value={filter}
				onChange={handleFilterChange}
			/>
		</div>
	);
};

export default SearchBox;
