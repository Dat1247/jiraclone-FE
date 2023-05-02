import { baseService } from "./baseService";

const service = new baseService();
export const cyberbugsService = {
	//------------------ USER ------------------------
	siginCyberbugs: (userLogin) => {
		return service.post(`Users/signin`, userLogin);
	},

	signupCyberbugs: (newUser) => {
		return service.post(`Users/signup`, newUser);
	},

	deleteUser: (idUser) => {
		return service.delete(`Users/deleteUser?id=${idUser}`);
	},

	editUser: (userUpdate) => {
		return service.put(`Users/editUser`, userUpdate);
	},

	getUsers: (keyWord) => {
		return service.get(`Users/getUser?keyword=${keyWord}`);
	},

	assignUserProject: (userAssign) => {
		return service.post(`Project/assignUserProject`, userAssign);
	},

	removeUserProject: (userRemove) => {
		return service.post(`Project/removeUserFromProject`, userRemove);
	},

	getUsersByProject: (projectId) => {
		return service.get(`Users/getUserByProjectId?idProject=${projectId}`);
	},

	//---------------- PROJECT ----------------------

	getAllProject: () => {
		return service.get(`Project/getAllProject`);
	},

	getAllProjectCategory: () => {
		return service.get(`ProjectCategory`);
	},

	createProject: (newProject) => {
		return service.post(`Project/createProjectAuthorize`, newProject);
	},

	updateProject: (projectUpdate) => {
		return service.put(
			`Project/updateProject?projectId=${projectUpdate.id}`,
			projectUpdate
		);
	},

	deleteProject: (projectId) => {
		return service.delete(`Project/deleteProject?projectId=${projectId}`);
	},

	getProjectDetail: (projectId) => {
		return service.get(`Project/getProjectDetail?id=${projectId}`);
	},

	//--------------------- TASK -----------------------------------
	getAllPriority: (id) => {
		return service.get(`Priority/getAll?id=${id}`);
	},

	getAllStatus: () => {
		return service.get(`Status/getAll`);
	},

	getAllTaskType: () => {
		return service.get(`TaskType/getAll`);
	},

	createTask: (newTask) => {
		return service.post(`Project/createTask`, newTask);
	},

	getTaskDetail: (taskId) => {
		return service.get(`Project/getTaskDetail?taskId=${taskId}`);
	},

	updateStatusTask: (statusTaskUpdate) => {
		return service.put(`Project/updateStatus`, statusTaskUpdate);
	},

	updateTask: (taskUpdate) => {
		return service.post(`Project/updateTask`, taskUpdate);
	},

	deleteTask: (taskId) => {
		return service.delete(`Project/removeTask?taskId=${taskId}`);
	},

	//------------------------------- COMMENT -----------------------------
	getAllComment: (taskId) => {
		return service.get(`Comment/getAll?taskId=${taskId}`);
	},

	createComment: (newComment) => {
		return service.post(`Comment/insertComment`, newComment);
	},

	updateComment: (idComment, contentComment) => {
		return service.put(
			`Comment/updateComment?id=${idComment}&contentComment=${contentComment}`
		);
	},

	deleteComment: (idComment) => {
		return service.delete(`Comment/deleteComment?idComment=${idComment}`);
	},
};
