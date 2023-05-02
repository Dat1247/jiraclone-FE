import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../redux/types/DrawerCyberbugsType";
import { useFormik } from "formik";
import {
	GET_PROJECT_CATEGORY_SAGA,
	UPDATE_PROJECT_SAGA,
} from "../../../redux/types/ProjectCyberbugsType";
import { Select } from "antd";

export default function FormEditProject(props) {
	const { projectEdit, arrProjectCategory } = useSelector(
		(state) => state.ProjectReducer
	);

	const dispatch = useDispatch();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: projectEdit.id,
			projectName: projectEdit?.projectName,
			description: projectEdit?.description,
			categoryId: projectEdit?.categoryId,
		},
		onSubmit: (values) => {
			dispatch({
				type: UPDATE_PROJECT_SAGA,
				projectUpdate: values,
			});
		},
	});

	const { values, handleChange, handleSubmit, setFieldValue } = formik;

	useEffect(() => {
		dispatch({
			type: GET_PROJECT_CATEGORY_SAGA,
		});
		dispatch({
			type: SET_SUBMIT_EDIT_PROJECT,
			submitFunction: handleSubmit,
		});
	}, []);
	const handleEditorChange = (e) => {
		setFieldValue("description", e.target.getContent());
	};

	const handleChangeCategory = (value) => {
		setFieldValue("categoryId", value);
	};

	return (
		<form action='' className='container' onSubmit={handleSubmit}>
			<div className='flex gap-4'>
				<div className='basis-1/2'>
					<div className='form-group'>
						<p className='mt-2'>Project Id</p>
						<input
							disabled
							name='id'
							className='form-control w-full p-2 text-base rounded-md border border-slate-200 bg-slate-100'
							value={values.id}
						/>
					</div>
				</div>
				<div className='basis-1/2'>
					<div className='form-group'>
						<p className='mt-2'>Project name</p>
						<input
							type='text'
							name='projectName'
							className='form-control w-full p-2 text-base rounded-md border border-slate-200'
							onChange={handleChange}
							value={values.projectName}
						/>
					</div>
				</div>
			</div>
			<div className='form-group'>
				<p>Project Category</p>

				<Select
					className='form-control w-full py-2 text-base rounded-md'
					value={values.categoryId}
					onChange={handleChangeCategory}
					options={arrProjectCategory.map((item) => {
						return {
							value: item.id,
							label: item.projectCategoryName,
						};
					})}
				/>
			</div>

			<div className='form-group'>
				<p>Description</p>
				<Editor
					apiKey='idbtfkj3ordlxl9xbkrk5x33ttajitctmzr4ipwa7emcs2kc'
					initialValue={values.description}
					name='description'
					init={{
						selector: "textarea#myTextArea",
						height: 400,
						menubar: false,
						plugins: [
							"advlist",
							"autolink",
							"lists",
							"link",
							"image",
							"charmap",
							"anchor",
							"searchreplace",
							"visualblocks",
							"code",
							"fullscreen",
							"insertdatetime",
							"media",
							"table",
							"preview",
							"help",
							"wordcount",
						],
						toolbar:
							"undo redo | formatselect | " +
							"bold italic backcolor | alignleft aligncenter " +
							"alignright alignjustify | bullist numlist outdent indent | " +
							"removeformat | help",
						content_style:
							"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					}}
					onChange={handleEditorChange}
				/>
			</div>
		</form>
	);
}
