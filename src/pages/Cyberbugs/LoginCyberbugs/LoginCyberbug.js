import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import {
	UserOutlined,
	LockOutlined,
	FacebookOutlined,
	TwitterOutlined,
} from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

import { signinAction } from "../../../redux/actions/CyberbugsAction";
import { NavLink } from "react-router-dom";
import { TOGGLE_PASSWORDS } from "../../../redux/types/UserCyberbugType";

export default function LoginCyberbug(props) {
	const { isShowPassWord } = useSelector((state) => state.UserCyberbugsReducer);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: "",
			passWord: "",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required("Email is required!")
				.email("email invalid!"),
			passWord: Yup.string()
				.min(4, "Password too short!")
				.max(30, "Password is too long!")
				.required("Password is required!"),
		}),
		onSubmit: (values) => {
			dispatch(signinAction(values));
		},
	});
	const { values, touched, errors, handleChange, handleSubmit } = formik;

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div
				className='flex flex-col justify-center items-center'
				style={{ height: window.innerHeight }}>
				<h3 className='text-lg font-bold tracking-widest'>Login Jira-clone</h3>
				<div style={{ width: "50%" }}>
					<Input
						className='mt-3'
						name='email'
						size='large'
						placeholder='Enter your email'
						prefix={<UserOutlined />}
						onChange={handleChange}
						value={values.email}
					/>
					{errors.email && touched.email ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.email}
						</div>
					) : null}
				</div>
				<div className='relative w-1/2'>
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

				<Button
					style={{
						width: "50%",
						backgroundColor: "rgb(102,117,223)",
						color: "white",
					}}
					size='large'
					className='mt-3'
					htmlType='submit'>
					Login
				</Button>
				<hr
					style={{
						backgroundColor: "rgba(0,0,0,0.7)",
						width: "50%",
						marginTop: "10px",
					}}
				/>
				<p
					className='mb-0'
					style={{
						fontSize: "0.8rem",
						color: "rgba(0,0,0,0.8)",
					}}>
					You don't have account ?{" "}
					<NavLink className='text-blue-500 font-bold' to='/user/register'>
						Register
					</NavLink>
				</p>
				<div className='social mt-3'>
					<Button
						shape='circle'
						icon={<FacebookOutlined />}
						size='large'
						className='mr-2'
						style={{ backgroundColor: "rgb(59,89,152)", color: "white" }}
					/>
					<Button
						type='primary'
						shape='circle'
						icon={<TwitterOutlined />}
						size={"large"}
						className='bg-blue-400'
					/>
				</div>
			</div>
		</form>
	);
}
