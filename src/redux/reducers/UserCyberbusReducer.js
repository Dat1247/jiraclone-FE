import { USER_LOGIN } from "../../utils/constants/settingSystem";
import {
	EDIT_USER,
	GET_USERS,
	GET_USERS_BY_PROJECT,
	GET_USERS_SEARCH,
	TOGGLE_PASSWORDS,
	US_LOGIN,
} from "../types/UserCyberbugType";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
	usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
	userLogin: usLogin,
	arrAllUser: [],
	arrUsersSearch: [],
	arrUsersProject: [],
	isShowPassWord: false,
	userEdit: {
		userId: 1045,
		name: "hv1",
		avatar: "https://ui-avatars.com/api/?name=hv1",
		email: "cyberlearn123@gmail.com",
		phoneNumber: "023654123",
	},
};

export const UserCyberbugsReducer = (state = initialState, action) => {
	switch (action.type) {
		case US_LOGIN: {
			state.userLogin = action.userLogin;
			return { ...state };
		}
		case GET_USERS_SEARCH: {
			return { ...state, arrUsersSearch: action.arrUsersSearch };
		}
		case GET_USERS_BY_PROJECT: {
			return { ...state, arrUsersProject: action.arrUsersProject };
		}
		case GET_USERS: {
			return { ...state, arrAllUser: action.arrAllUser };
		}
		case EDIT_USER: {
			return { ...state, userEdit: action.userEdit };
		}
		case TOGGLE_PASSWORDS: {
			return { ...state, isShowPassWord: !state.isShowPassWord };
		}
		default:
			return { ...state };
	}
};
