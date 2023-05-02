import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
	hideLoadingAction,
	showLoadingAction,
} from "../../actions/LoadingAction";
import { CLOSE_DRAWER } from "../../types/DrawerCyberbugsType";
import {
	CREATE_PROJECT_SAGA,
	DELETE_PROJECT_SAGA,
	GET_ALL_PROJECT,
	GET_ALL_PROJECT_SAGA,
	GET_PROJECT_CATEGORY,
	GET_PROJECT_CATEGORY_SAGA,
	GET_PROJECT_DETAIL,
	GET_PROJECT_DETAIL_SAGA,
	UPDATE_PROJECT_SAGA,
} from "../../types/ProjectCyberbugsType";
import { GET_USERS_BY_PROJECT_SAGA } from "../../types/UserCyberbugType";
import { notificationFunction } from "../../../utils/Notification/Notification";

function* getAllProjectSaga(action) {
	try {
		const { data } = yield call(() => cyberbugsService.getAllProject());

		yield put({
			type: GET_ALL_PROJECT,
			arrAllProject: data.content,
		});

		yield put({
			type: GET_USERS_BY_PROJECT_SAGA,
			projectId: data.content[0].id,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetAllProject() {
	yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

function* getProjectCategorySaga(action) {
	try {
		const { data } = yield call(() => cyberbugsService.getAllProjectCategory());

		yield put({
			type: GET_PROJECT_CATEGORY,
			arrProjectCategory: data.content,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetProjectCategory() {
	yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategorySaga);
}

function* createProjectSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		yield call(() => {
			return cyberbugsService.createProject(action.newProject);
		});

		notificationFunction("success", "Create project successfully!");

		let history = yield select((state) => state.HistoryReducer.history);
		history("/projectmanagement");
	} catch (err) {
		alert(err.response?.data.message);
	}
	yield put(hideLoadingAction());
}

export function* theoDoiCreateProjectSaga() {
	yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

function* updateProjectSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		yield call(() => {
			return cyberbugsService.updateProject(action.projectUpdate);
		});

		yield notificationFunction("success", "Create project successfully!");

		yield put({
			type: CLOSE_DRAWER,
		});
		yield put({
			type: GET_ALL_PROJECT_SAGA,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
	yield put(hideLoadingAction());
}

export function* theoDoiUpdateProjectSaga() {
	yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

function* deleteProjectSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		yield call(() => {
			return cyberbugsService.deleteProject(action.projectId);
		});

		notificationFunction("success", "Delete project successfully!");

		yield call(getAllProjectSaga);
	} catch (err) {
		notificationFunction("error", "Delete project failed!");
	}
	yield put(hideLoadingAction());
}

export function* theoDoiDeleteProjectSaga() {
	yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

function* getProjectDetailSaga(action) {
	try {
		const { data } = yield call(() => {
			return cyberbugsService.getProjectDetail(action.projectId);
		});

		yield put({
			type: GET_PROJECT_DETAIL,
			projectDetail: data.content,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetProjectDetailSaga() {
	yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}
