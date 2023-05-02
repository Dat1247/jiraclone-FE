import { all } from "redux-saga/effects";
import * as UserCyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCyberbugs from "./Cyberbugs/ProjectCyberbugsSaga";
import * as TaskCyberbugs from "./Cyberbugs/TaskCyberbugsSaga";
import * as CommentCyberbugs from "./Cyberbugs/CommentSaga";

export function* rootSaga() {
	yield all([
		//------------------- USER ---------------------

		UserCyberbugs.theoDoiSignin(),
		UserCyberbugs.theoDoiGetUsersSaga(),
		UserCyberbugs.theoDoiAssignUserProjectSaga(),
		UserCyberbugs.theoDoiRemoveUserProjectSaga(),
		UserCyberbugs.theoDoiGetUsersByProjectSaga(),
		UserCyberbugs.theoDoiSignupSaga(),
		UserCyberbugs.theoDoiEditUserSaga(),
		UserCyberbugs.theoDoiDeleteUserSaga(),
		UserCyberbugs.theoDoiCreateUserSaga(),
		UserCyberbugs.theoDoiGetUserSearchSaga(),

		//------------------- PROJECT ---------------------
		ProjectCyberbugs.theoDoiGetProjectCategory(),
		ProjectCyberbugs.theoDoiCreateProjectSaga(),
		ProjectCyberbugs.theoDoiGetAllProject(),
		ProjectCyberbugs.theoDoiUpdateProjectSaga(),
		ProjectCyberbugs.theoDoiDeleteProjectSaga(),
		ProjectCyberbugs.theoDoiGetProjectDetailSaga(),

		//------------------- TASK ---------------------
		TaskCyberbugs.theoDoiGetAllPrioritySaga(),
		TaskCyberbugs.theoDoiGetAllStatusTaskSaga(),
		TaskCyberbugs.theoDoiGetAllTaskTypeSaga(),
		TaskCyberbugs.theoDoiCreateTaskSaga(),
		TaskCyberbugs.theoDoiDeleteTaskSaga(),
		TaskCyberbugs.theoDoiGetTaskDetailSaga(),
		TaskCyberbugs.theoDoiUpdateStatusTaskSaga(),
		TaskCyberbugs.theoDoiHandleChangePostApi(),

		//------------------- COMMENT ----------------------------
		CommentCyberbugs.theoDoiGetAllCommentSaga(),
		CommentCyberbugs.theoDoiCreateCommentSaga(),
		CommentCyberbugs.theoDoiEditCommentSaga(),
		CommentCyberbugs.theoDoiDeleteCommentSaga(),
	]);
}
