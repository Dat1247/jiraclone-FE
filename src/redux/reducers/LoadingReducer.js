import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingType";

const initialState = {
	isLoading: false,
};

export const LoadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADING: {
			state.isLoading = true;
			return { ...state };
		}
		case HIDE_LOADING: {
			state.isLoading = false;
			return { ...state };
		}

		default:
			return { ...state };
	}
};
