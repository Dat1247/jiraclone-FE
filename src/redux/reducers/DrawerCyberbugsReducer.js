import React from "react";
import {
	CLOSE_DRAWER,
	OPEN_DRAWER,
	OPEN_FORM,
	SET_SUBMIT_EDIT_PROJECT,
	SET_SUBMIT_CREATE_TASK,
	SET_SUBMIT_EDIT_USER,
} from "../types/DrawerCyberbugsType";

const initialState = {
	visible: false,
	ComponentContentDrawer: <p>default content</p>,
	Title: "",
	NameButton: "",
	callBackSubmit: () => {
		alert("Click");
	},
};

export const DrawerCyberbugsReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DRAWER:
			return { ...state, visible: true };
		case CLOSE_DRAWER:
			return { ...state, visible: false };
		case OPEN_FORM: {
			return {
				...state,
				visible: true,
				ComponentContentDrawer: action.Component,
				Title: action.Title,
				NameButton: action.NameButton,
			};
		}
		case SET_SUBMIT_EDIT_PROJECT: {
			state.callBackSubmit = action.submitFunction;
			return { ...state };
		}
		case SET_SUBMIT_CREATE_TASK: {
			state.callBackSubmit = action.submitFunction;
			return { ...state };
		}
		case SET_SUBMIT_EDIT_USER: {
			state.callBackSubmit = action.submitFunction;
			return { ...state };
		}
		default:
			return state;
	}
};
