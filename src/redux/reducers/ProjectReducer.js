import {
	EDIT_PROJECT,
	GET_ALL_PROJECT,
	GET_PROJECT_CATEGORY,
	GET_PROJECT_DETAIL,
} from "../types/ProjectCyberbugsType";

const initialState = {
	arrAllProject: [],
	arrProjectCategory: [],
	projectEdit: {
		id: 0,
		projectName: "string",
		creator: 0,
		description: "string",
		categoryId: 1,
	},
	projectDetail: {},
};

export const ProjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROJECT_CATEGORY: {
			let arrCategories = action.arrProjectCategory;
			let newArrProjectCategory = [];
			arrCategories.forEach((category) => {
				let newCategoryItem = {};
				let categoryName = "";
				if (category.id === 1) {
					categoryName = "Web Project";
				} else if (category.id === 2) {
					categoryName = "Software Project";
				} else {
					categoryName = "Mobile Project";
				}
				newCategoryItem = { ...category, projectCategoryName: categoryName };
				newArrProjectCategory.push(newCategoryItem);
			});
			state.arrProjectCategory = newArrProjectCategory;
			return { ...state };
		}
		case GET_ALL_PROJECT: {
			state.arrAllProject = action.arrAllProject;
			return { ...state };
		}
		case EDIT_PROJECT: {
			return { ...state, projectEdit: action.editProject };
		}
		case GET_PROJECT_DETAIL: {
			return { ...state, projectDetail: action.projectDetail };
		}
		default:
			return { ...state };
	}
};
