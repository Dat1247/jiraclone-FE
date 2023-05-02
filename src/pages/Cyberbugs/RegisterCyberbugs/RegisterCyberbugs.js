import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import {
	UserOutlined,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	TOGGLE_PASSWORDS,
	USER_SIGN_UP_SAGA,
} from "../../../redux/types/UserCyberbugType";

export default function RegisterCyberbugs(props) {
	const { isShowPassWord } = useSelector((state) => state.UserCyberbugsReducer);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: "",
			passWord: "",
			name: "",
			phoneNumber: "",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required("Email is required!")
				.email("email invalid!"),
			passWord: Yup.string()
				.min(4, "Password too short!")
				.max(30, "Password is too long!")
				.required("Password is required!"),
			name: Yup.string().required("Name is required!"),
			phoneNumber: Yup.string()
				.matches(/^\d+$/, "Phone number invalid!")
				.required("Phone number is required!"),
		}),
		onSubmit: (values) => {
			dispatch({
				type: USER_SIGN_UP_SAGA,
				newUser: values,
			});
		},
	});
	const { values, touched, errors, handleChange, handleSubmit } = formik;

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div
				className='flex flex-col justify-center items-center'
				style={{ height: window.innerHeight }}>
				<h3 className='text-lg font-bold tracking-widest'>
					Sign up Jira-clone
				</h3>
				<div style={{ width: "50%" }}>
					<Input
						className='mt-3'
						name='email'
						size='large'
						placeholder='Enter your email'
						prefix={<MailOutlined />}
						onChange={handleChange}
						value={values.email}
					/>
					{errors.email && touched.email ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.email}
						</div>
					) : null}
				</div>
				<div style={{ width: "50%", position: "relative" }}>
					<Input
						type={isShowPassWord ? "text" : "password"}
						className='mt-3'
						name='passWord'
						size='large'
						placeholder='Enter your password'
						prefix={<LockOutlined />}
						onChange={handleChange}
						value={values.passWord}
					/>
					<div
						className='absolute'
						style={{
							bottom: "15%",
							left: "92%",
							cursor: "pointer",
							zIndex: "100",
						}}
						onClick={() => {
							dispatch({
								type: TOGGLE_PASSWORDS,
							});
						}}>
						{values.passWord !== "" ? (
							isShowPassWord ? (
								<i className='fa fa-eye-slash'></i>
							) : (
								<i className='fa fa-eye'></i>
							)
						) : (
							""
						)}
					</div>
					{errors.passWord && touched.passWord ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.passWord}
						</div>
					) : null}
				</div>
				<div style={{ width: "50%" }}>
					<Input
						className='mt-3'
						name='name'
						size='large'
						placeholder='Enter your name'
						prefix={<UserOutlined />}
						onChange={handleChange}
						value={values.name}
					/>
					{errors.name && touched.name ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.name}
						</div>
					) : null}
				</div>
				<div style={{ width: "50%" }}>
					<Input
						className='mt-3'
						name='phoneNumber'
						size='large'
						placeholder='Enter your phone number'
						prefix={<PhoneOutlined />}
						onChange={handleChange}
						value={values.phoneNumber}
					/>
					{errors.phoneNumber && touched.phoneNumber ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.phoneNumber}
						</div>
					) : null}
				</div>

				<Button
					style={{
						width: "50%",
						backgroundColor: "rgb(102,117,223)",
						color: "white",
					}}
					size='large'
					className='mt-3'
					htmlType='submit'>
					Sign up
				</Button>
			</div>
		</form>
	);
}
