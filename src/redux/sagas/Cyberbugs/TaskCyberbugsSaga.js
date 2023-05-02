import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
	CHANGE_ASSIGNESS_TASK_MODAL,
	CHANGE_TASK_DETAIL_MODAL,
	CLOSE_MODAL,
	CREATE_TASK_SAGA,
	DELETE_TASK_SAGA,
	GET_ALL_PRIORITY,
	GET_ALL_PRIORITY_SAGA,
	GET_ALL_STATUS_TASK,
	GET_ALL_STATUS_TASK_SAGA,
	GET_ALL_TASK_TYPE,
	GET_ALL_TASK_TYPE_SAGA,
	GET_TASK_DETAIL,
	GET_TASK_DETAIL_SAGA,
	HANDLE_CHANGE_POST_API_SAGA,
	REMOVE_USER_TASK,
	UPDATE_STATUS_TASK_SAGA,
} from "../../types/TaskCyberbugsType";
import { notificationFunction } from "../../../utils/Notification/Notification";
import { CLOSE_DRAWER } from "../../types/DrawerCyberbugsType";
import { GET_PROJECT_DETAIL_SAGA } from "../../types/ProjectCyberbugsType";
import {
	hideLoadingAction,
	showLoadingAction,
} from "../../actions/LoadingAction";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";

function* getAllPrioritySaga(action) {
	try {
		const { data } = yield call(() => {
			return cyberbugsService.getAllPriority("");
		});

		yield put({
			type: GET_ALL_PRIORITY,
			arrPriority: data.content,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetAllPrioritySaga() {
	yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}

function* getAllStatusTaskSaga(action) {
	try {
		const { data } = yield call(() => {
			return cyberbugsService.getAllStatus();
		});

		yield put({
			type: GET_ALL_STATUS_TASK,
			arrStatusTask: data.content,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetAllStatusTaskSaga() {
	yield takeLatest(GET_ALL_STATUS_TASK_SAGA, getAllStatusTaskSaga);
}

function* getAllTaskTypeSaga(action) {
	try {
		const { data } = yield call(() => {
			return cyberbugsService.getAllTaskType();
		});

		yield put({
			type: GET_ALL_TASK_TYPE,
			arrTaskType: data.content,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetAllTaskTypeSaga() {
	yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}

function* createTaskSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		const { status } = yield call(() => {
			return cyberbugsService.createTask(action.newTask);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				projectId: action.newTask.projectId,
			});
		}

		yield put({
			type: CLOSE_DRAWER,
		});

		notificationFunction("success", "Create task successfully!");
		yield put(hideLoadingAction());
	} catch (err) {
		notificationFunction(
			"error",
			"Create task failed!",
			err.response?.data.content
		);
		yield put(hideLoadingAction());
	}
}

export function* theoDoiCreateTaskSaga() {
	yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* deleteTaskSaga(action) {
	try {
		const { status } = yield call(() => {
			return cyberbugsService.deleteTask(action.taskId);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				projectId: action.projectId,
			});
			notificationFunction("success", "Delete task successfully!");

			yield put({
				type: CLOSE_MODAL,
			});
		}
	} catch (err) {
		notificationFunction(
			"error",
			"Delete task failed!",
			err.response?.data.content
		);
	}
}

export function* theoDoiDeleteTaskSaga() {
	yield takeLatest(DELETE_TASK_SAGA, deleteTaskSaga);
}

function* getTaskDetailSaga(action) {
	try {
		const { data } = yield call(() => {
			return cyberbugsService.getTaskDetail(action.taskId);
		});

		yield put({
			type: GET_TASK_DETAIL,
			taskDetailModel: data.content,
		});
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetTaskDetailSaga() {
	yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* updateStatusTaskSaga(action) {
	try {
		const { status } = yield call(() => {
			return cyberbugsService.updateStatusTask(action.statusTaskUpdate);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				projectId: action.projectId,
			});
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: action.statusTaskUpdate.taskId,
			});
		}
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiUpdateStatusTaskSaga() {
	yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga);
}

export function* handleChangePostApi(action) {
	switch (action.actionType) {
		case CHANGE_TASK_DETAIL_MODAL: {
			const { value, name } = action;
			const result = yield put({
				type: CHANGE_TASK_DETAIL_MODAL,
				name,
				value,
			});
			console.log(result);
			break;
		}
		case CHANGE_ASSIGNESS_TASK_MODAL: {
			const { userSelect } = action;
			const result = yield put({
				type: CHANGE_ASSIGNESS_TASK_MODAL,
				userSelect,
			});

			console.log(result);
			break;
		}

		case REMOVE_USER_TASK: {
			const { userId } = action;
			const result = yield put({
				type: REMOVE_USER_TASK,
				userId,
			});

			console.log(result);
			break;
		}

		default:
			break;
	}

	let { taskDetailModel } = yield select((state) => state.TaskCyberbugsReducer);

	const listUserAsign = taskDetailModel.assigness?.map((user, index) => {
		return user.id;
	});

	taskDetailModel = { ...taskDetailModel, listUserAsign };

	try {
		const { status } = yield call(() => {
			return cyberbugsService.updateTask(taskDetailModel);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				projectId: taskDetailModel.projectId,
			});
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: taskDetailModel.taskId,
			});
		}
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiHandleChangePostApi() {
	yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
