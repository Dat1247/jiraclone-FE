import { GET_COMMENT } from "../types/CommentType";

const initialState = {
	arrComment: [],
	commentUpdate: {},
};

export const CommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_COMMENT: {
			return { ...state, arrComment: action.arrComment };
		}
		default:
			return state;
	}
};
