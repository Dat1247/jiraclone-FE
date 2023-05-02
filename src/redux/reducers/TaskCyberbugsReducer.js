import {
	CHANGE_ASSIGNESS_TASK_MODAL,
	CHANGE_TASK_DETAIL_MODAL,
	CLOSE_MODAL,
	GET_ALL_PRIORITY,
	GET_ALL_STATUS_TASK,
	GET_ALL_TASK_TYPE,
	GET_TASK_DETAIL,
	REMOVE_USER_TASK,
	SHOW_MODAL,
} from "../types/TaskCyberbugsType";

const initialState = {
	arrPriority: [],
	arrStatusTask: [],
	arrTaskType: [],
	taskDetailModel: {
		priorityTask: {
			priorityId: 3,
			priority: "Low",
		},
		taskTypeDetail: {
			id: 2,
			taskType: "new task",
		},
		assigness: [
			{
				id: 1134,
				avatar: "https://ui-avatars.com/api/?name=hv2",
				name: "hv2",
				alias: "hv2",
			},
			{
				id: 1045,
				avatar: "https://ui-avatars.com/api/?name=hv1",
				name: "hv1",
				alias: "hv1",
			},
			{
				id: 1399,
				avatar: "https://ui-avatars.com/api/?name=Đỗ Quang Khải",
				name: "Đỗ Quang Khải",
				alias: "do-quang-khai",
			},
			{
				id: 1066,
				avatar: "https://ui-avatars.com/api/?name=Thoa Nguyen",
				name: "Thoa Nguyen",
				alias: "thoa-nguyen",
			},
		],
		lstComment: [],
		taskId: 3056,
		taskName: "task 5",
		alias: "task-5",
		description:
			'<h1><em><strong>demo </strong></em><span style="background-color: #c2e0f4;">task 5</span></h1>',
		statusId: "2",
		originalEstimate: 5,
		timeTrackingSpent: 5,
		timeTrackingRemaining: 5,
		typeId: 2,
		priorityId: 3,
		projectId: 3515,
	},
	isShowModal: false,
};

export const TaskCyberbugsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_PRIORITY: {
			return { ...state, arrPriority: action.arrPriority };
		}
		case GET_ALL_STATUS_TASK: {
			return { ...state, arrStatusTask: action.arrStatusTask };
		}
		case GET_ALL_TASK_TYPE: {
			return { ...state, arrTaskType: action.arrTaskType };
		}
		case GET_TASK_DETAIL: {
			return { ...state, taskDetailModel: action.taskDetailModel };
		}
		case CHANGE_TASK_DETAIL_MODAL: {
			const { name, value } = action;
			return {
				...state,
				taskDetailModel: { ...state.taskDetailModel, [name]: value },
			};
		}
		case CHANGE_ASSIGNESS_TASK_MODAL: {
			state.taskDetailModel.assigness = [
				...state.taskDetailModel.assigness,
				action.userSelect,
			];

			return { ...state };
		}
		case REMOVE_USER_TASK: {
			let taskDetailModelUpdate = { ...state.taskDetailModel };
			let index = taskDetailModelUpdate.assigness.findIndex(
				(item) => item.id === action.userId
			);

			if (index !== -1) {
				taskDetailModelUpdate.assigness.splice(index, 1);
			}
			state.taskDetailModel = taskDetailModelUpdate;
			return { ...state };
		}
		case SHOW_MODAL: {
			return { ...state, isShowModal: true };
		}
		case CLOSE_MODAL: {
			return { ...state, isShowModal: false };
		}
		default:
			return state;
	}
};
