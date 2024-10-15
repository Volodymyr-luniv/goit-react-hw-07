import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "//https://670d1820073307b4ee424315.mockapi.io";

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
