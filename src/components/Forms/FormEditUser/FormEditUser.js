import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SET_SUBMIT_EDIT_USER } from "../../../redux/types/DrawerCyberbugsType";
import {
	EDIT_USER_SAGA,
	TOGGLE_PASSWORDS,
} from "../../../redux/types/UserCyberbugType";

export default function FormEditUser(props) {
	const { userEdit, isShowPassWord } = useSelector(
		(state) => state.UserCyberbugsReducer
	);
	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: userEdit.email,
			userId: userEdit.userId,
			name: userEdit.name,
			phoneNumber: userEdit.phoneNumber,
			passWord: userEdit.passWord,
			avatar: userEdit.avatar,
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.required("Email is required!")
				.email("email invalid!"),
			name: Yup.string().required("Name is required!"),
			passWord: Yup.string()
				.min(4, "Password too short!")
				.max(30, "Password is too long!")
				.required("Password is required!"),
			phoneNumber: Yup.string()
				.matches(/^\d+$/, "Phone number invalid!")
				.required("Phone number is required!"),
		}),
		onSubmit: (values) => {
			let objUser = { ...values, id: values.userId };
			dispatch({
				type: EDIT_USER_SAGA,
				userUpdate: objUser,
			});
		},
	});

	const { values, touched, errors, handleChange, handleSubmit } = formik;

	useEffect(() => {
		dispatch({
			type: SET_SUBMIT_EDIT_USER,
			submitFunction: handleSubmit,
		});
	}, [dispatch, handleSubmit]);

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div className='flex gap-4'>
				<div className='basis-2/3'>
					<div className='form-group'>
						<p>User ID</p>
						<input
							name='userId'
							className='form-control w-full p-2 text-base rounded-md border border-slate-200 bg-slate-100'
							value={values.userId}
							disabled={true}
						/>
					</div>
					<div className='form-group'>
						<p>User Name</p>
						<input
							name='name'
							className='form-control w-full p-2 text-base rounded-md border border-slate-200'
							value={values.name}
							onChange={handleChange}
						/>
						{errors.name && touched.name ? (
							<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
								{errors.name}
							</div>
						) : null}
					</div>
				</div>
				<div className='basis-1/3'>
					<div
						className='flex items-center justify-center'
						style={{ height: "100%" }}>
						<img
							src={values.avatar}
							alt={values.avatar}
							style={{ width: "100px", borderRadius: "50%" }}
						/>
					</div>
				</div>
			</div>

			<div className='form-group'>
				<p>Email</p>
				<input
					name='email'
					className='form-control w-full p-2 text-base rounded-md border border-slate-200 bg-slate-100'
					value={values.email}
					disabled={true}
				/>
			</div>
			<div className='form-group relative'>
				<p>Password</p>
				<input
					type={isShowPassWord ? "text" : "password"}
					name='passWord'
					className='form-control w-full p-2 text-base rounded-md border border-slate-200'
					value={values.passWord ? values.passWord : ""}
					onChange={handleChange}
				/>
				<div
					className='absolute'
					style={{ bottom: "15%", left: "95%", cursor: "pointer" }}
					onClick={() => {
						dispatch({
							type: TOGGLE_PASSWORDS,
						});
					}}>
					{values.passWord !== undefined ? (
						isShowPassWord ? (
							<i className='fa fa-eye-slash'></i>
						) : (
							<i className='fa fa-eye'></i>
						)
					) : (
						""
					)}
				</div>
			</div>
			{errors.passWord && touched.passWord ? (
				<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
					{errors.passWord}
				</div>
			) : null}
			<div className='form-group'>
				<p>Phone number</p>
				<input
					name='phoneNumber'
					className='form-control w-full p-2 text-base rounded-md border border-slate-200'
					value={values.phoneNumber}
					onChange={handleChange}
				/>
				{errors.phoneNumber && touched.phoneNumber ? (
					<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
						{errors.phoneNumber}
					</div>
				) : null}
			</div>
		</form>
	);
}
