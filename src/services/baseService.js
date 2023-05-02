import Axios from "axios";
import { DOMAIN, TOKEN } from "../utils/constants/settingSystem";

export class baseService {
	put = (url, model) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "PUT",
			data: model,
			headers: { Authorization: `Bearer ` + localStorage.getItem(TOKEN) },
		});
	};

	get = (url) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "GET",
			headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
		});
	};

	post = (url, model) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "POST",
			data: model,
			headers: { Authorization: `Bearer ` + localStorage.getItem(TOKEN) },
		});
	};

	delete = (url) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "DELETE",
			headers: { Authorization: `Bearer ` + localStorage.getItem(TOKEN) },
		});
	};
}
