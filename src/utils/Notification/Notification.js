import { notification } from "antd";

export const notificationFunction = (type, message, description = "") => {
	notification[type]({
		message: message,
		description: description,
	});
};
