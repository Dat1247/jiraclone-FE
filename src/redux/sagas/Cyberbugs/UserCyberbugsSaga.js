import { call, put, delay, takeLatest, select } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
	STATUS_CODE,
	TOKEN,
	USER_LOGIN,
} from "../../../utils/constants/settingSystem";
import { notificationFunction } from "../../../utils/Notification/Notification";
import {
	hideLoadingAction,
	showLoadingAction,
} from "../../actions/LoadingAction";
import { CLOSE_DRAWER } from "../../types/DrawerCyberbugsType";
import { GET_ALL_PROJECT_SAGA } from "../../types/ProjectCyberbugsType";

import {
	ASSIGN_USER_PROJECT,
	CREATE_USER_SAGA,
	DELETE_USER_SAGA,
	EDIT_USER_SAGA,
	GET_USERS,
	GET_USERS_BY_PROJECT,
	GET_USERS_BY_PROJECT_SAGA,
	GET_USERS_SAGA,
	GET_USERS_SEARCH,
	GET_USER_SEARCH_SAGA,
	REMOVE_USER_PROJECT_SAGA,
	USER_SIGN_IN_SAGA,
	USER_SIGN_UP_SAGA,
	US_LOGIN,
} from "../../types/UserCyberbugType";

function* signinSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		const { data } = yield call(() =>
			cyberbugsService.siginCyberbugs(action.userLogin)
		);

		localStorage.setItem(TOKEN, data.content.accessToken);
		localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

		yield put({
			type: US_LOGIN,
			userLogin: data.content,
		});
		notificationFunction("success", "Log in successfully!");
		let history = yield select((state) => state.HistoryReducer.history);
		history("/");
	} catch (err) {
		alert(err.response.data.message);
	}

	yield put(hideLoadingAction());
}

export function* theoDoiSignin() {
	yield takeLatest(USER_SIGN_IN_SAGA, signinSaga);
}

export function* getUsersSaga(action) {
	try {
		const { data, status } = yield call(() =>
			cyberbugsService.getUsers(action.keyWord)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USERS,
				arrAllUser: data.content,
			});
		}
	} catch (err) {
		alert(err.response.data.message);
	}
}

export function* theoDoiGetUsersSaga() {
	yield takeLatest(GET_USERS_SAGA, getUsersSaga);
}

export function* getUserSearchSaga(action) {
	try {
		const { data, status } = yield call(() =>
			cyberbugsService.getUsers(action.keyWord)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USERS_SEARCH,
				arrUsersSearch: data.content,
			});
		}
	} catch (err) {
		alert(err.response.data.message);
	}
}

export function* theoDoiGetUserSearchSaga() {
	yield takeLatest(GET_USER_SEARCH_SAGA, getUserSearchSaga);
}

export function* assignUserProjectSaga(action) {
	try {
		const { data, status } = yield call(() =>
			cyberbugsService.assignUserProject(action.userAssign)
		);

		yield put({
			type: GET_ALL_PROJECT_SAGA,
		});
	} catch (err) {
		alert(err.response.data.message);
	}
}

export function* theoDoiAssignUserProjectSaga() {
	yield takeLatest(ASSIGN_USER_PROJECT, assignUserProjectSaga);
}

export function* removeUserProjectSaga(action) {
	try {
		const { data, status } = yield call(() =>
			cyberbugsService.removeUserProject(action.userRemove)
		);

		yield put({
			type: GET_ALL_PROJECT_SAGA,
		});
	} catch (err) {
		alert(err.response.data.message);
	}
}

export function* theoDoiRemoveUserProjectSaga() {
	yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProjectSaga);
}

export function* getUsersByProjectSaga(action) {
	try {
		const { data, status } = yield call(() =>
			cyberbugsService.getUsersByProject(action.projectId)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USERS_BY_PROJECT,
				arrUsersProject: data.content,
			});
		}
	} catch (err) {
		if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
			yield put({
				type: GET_USERS_BY_PROJECT,
				arrUsersProject: [],
			});
		}
	}
}

export function* theoDoiGetUsersByProjectSaga() {
	yield takeLatest(GET_USERS_BY_PROJECT_SAGA, getUsersByProjectSaga);
}

function* signupSaga(action) {
	try {
		yield put(showLoadingAction());
		yield delay(1000);
		const { status } = yield call(() => {
			return cyberbugsService.signupCyberbugs(action.newUser);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put(hideLoadingAction());
			notificationFunction("success", "Register successfully!");
			let history = yield select((state) => state.HistoryReducer.history);
			history("/user/login");
		}
	} catch (err) {
		alert(err.response?.data.message);
	}

	yield put(hideLoadingAction());
}

export function* theoDoiSignupSaga() {
	yield takeLatest(USER_SIGN_UP_SAGA, signupSaga);
}

function* createUserSaga(action) {
	try {
		yield put(showLoadingAction());
		yield delay(1000);
		const { status } = yield call(() => {
			return cyberbugsService.signupCyberbugs(action.newUser);
		});

		if (status === STATUS_CODE.SUCCESS) {
			notificationFunction("success", "Create user successfully!");
			yield put({
				type: GET_USERS_SAGA,
				keyWord: "",
			});
			yield put(hideLoadingAction());
			yield put({
				type: CLOSE_DRAWER,
			});
		}
	} catch (err) {
		alert(err.response?.data.message);
		yield put(hideLoadingAction());
	}
}

export function* theoDoiCreateUserSaga() {
	yield takeLatest(CREATE_USER_SAGA, createUserSaga);
}

function* editUserSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		const { status } = yield call(() => {
			return cyberbugsService.editUser(action.userUpdate);
		});

		if (status === STATUS_CODE.SUCCESS) {
			notificationFunction("success", "Edit user successfully!");
			yield put({
				type: CLOSE_DRAWER,
			});
			yield put({
				type: GET_USERS_SAGA,
				keyWord: "",
			});
		}
	} catch (err) {
		notificationFunction("error", "Edit user failed!");
	}

	yield put(hideLoadingAction());
}

export function* theoDoiEditUserSaga() {
	yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}

function* deleteUserSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		const { status } = yield call(() => {
			return cyberbugsService.deleteUser(action.userId);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USERS_SAGA,
				keyWord: "",
			});
			yield put(hideLoadingAction());
			yield notificationFunction("success", "Delete user successfully!");
		}
	} catch (err) {
		notificationFunction("error", "Delete user failed!");
		yield put(hideLoadingAction());
	}
}

export function* theoDoiDeleteUserSaga() {
	yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
