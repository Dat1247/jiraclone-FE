import { cyberbugsService } from "../../../services/CyberbugsService";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
	CREATE_COMMENT_SAGA,
	DELETE_COMMENT_SAGA,
	EDIT_COMMENT_SAGA,
	GET_COMMENT,
	GET_COMMENT_SAGA,
} from "../../types/CommentType";
import { STATUS_CODE } from "../../../utils/constants/settingSystem";
import { notificationFunction } from "../../../utils/Notification/Notification";
import {
	hideLoadingAction,
	showLoadingAction,
} from "../../actions/LoadingAction";

function* getAllCommentSaga(action) {
	try {
		const { data, status } = yield call(() => {
			return cyberbugsService.getAllComment(action.taskId);
		});
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_COMMENT,
				arrComment: data.content,
			});
		}
	} catch (err) {
		alert(err.response?.data.message);
	}
}

export function* theoDoiGetAllCommentSaga() {
	yield takeLatest(GET_COMMENT_SAGA, getAllCommentSaga);
}

function* createCommentSaga(action) {
	yield put(showLoadingAction());
	yield delay(500);
	try {
		const { status } = yield call(() => {
			return cyberbugsService.createComment(action.newComment);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_COMMENT_SAGA,
				taskId: action.newComment.taskId,
			});
			yield put(hideLoadingAction());
		}
	} catch (err) {
		yield put(hideLoadingAction());
		alert(err.response?.data.message);
	}
}
export function* theoDoiCreateCommentSaga() {
	yield takeLatest(CREATE_COMMENT_SAGA, createCommentSaga);
}

function* editCommentSaga(action) {
	const { updateComment } = action;
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		const { status } = yield call(() => {
			return cyberbugsService.updateComment(
				updateComment.id,
				updateComment.contentComment
			);
		});

		if (status === STATUS_CODE.SUCCESS) {
			notificationFunction("success", "Update comment successfully!");
			yield put({
				type: GET_COMMENT_SAGA,
				taskId: updateComment.taskId,
			});
		}
	} catch (err) {
		alert(err.response?.data.message);
	}
	yield put(hideLoadingAction());
}

export function* theoDoiEditCommentSaga() {
	yield takeLatest(EDIT_COMMENT_SAGA, editCommentSaga);
}

function* deleteCommentSaga(action) {
	yield put(showLoadingAction());
	yield delay(1000);
	try {
		const { status } = yield call(() => {
			return cyberbugsService.deleteComment(action.idComment);
		});

		if (status === STATUS_CODE.SUCCESS) {
			notificationFunction("success", "Delete comment successfully!");

			yield put({
				type: GET_COMMENT_SAGA,
				taskId: action.taskId,
			});
		}
	} catch (err) {
		notificationFunction("error", "Delete comment failed!");
		alert(err.response?.data.message);
	}
	yield put(hideLoadingAction());
}

export function* theoDoiDeleteCommentSaga() {
	yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
