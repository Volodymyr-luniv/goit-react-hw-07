import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://670d1820073307b4ee424315.mockapi.io";

export const fetchContacts = createAsyncThunk(
	"contacts/fetchAll",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get("/contacts");
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const addContact = createAsyncThunk(
	"contacts/addContact",
	async (newContact, thunkAPI) => {
		try {
			const response = await axios.post("/contacts", newContact);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	"contacts/deleteContact",
	async (contactId, thunkAPI) => {
		try {
			await axios.delete(`/contacts/${contactId}`);
			return contactId;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

const initialState = {
	items: [],
	loading: false,
	error: null,
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.items = action.payload;
				state.loading = false;
			})
			.addCase(fetchContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.items.push(action.payload);
				state.loading = false;
			})
			.addCase(addContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteContact.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(contact) => contact.id !== action.payload
				);
				state.loading = false;
			})
			.addCase(deleteContact.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const selectContacts = (state) => state.contacts.items;
export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
	[selectContacts, selectNameFilter],
	(contacts, filter) => {
		return contacts.filter((contact) =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		);
	}
);

export default contactsSlice.reducer;
