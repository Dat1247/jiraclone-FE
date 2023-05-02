import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingType";

export const showLoadingAction = () => ({
	type: SHOW_LOADING,
});

export const hideLoadingAction = () => ({
	type: HIDE_LOADING,
});
