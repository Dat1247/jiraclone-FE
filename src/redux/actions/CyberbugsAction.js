import { USER_SIGN_IN_SAGA } from "../types/UserCyberbugType";

export const signinAction = (values) => ({
	type: USER_SIGN_IN_SAGA,
	userLogin: {
		email: values.email,
		passWord: values.passWord,
	},
});
