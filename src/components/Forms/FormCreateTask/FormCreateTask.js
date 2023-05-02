import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import { Select, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	CREATE_TASK_SAGA,
	GET_ALL_PRIORITY_SAGA,
	GET_ALL_STATUS_TASK_SAGA,
	GET_ALL_TASK_TYPE_SAGA,
} from "../../../redux/types/TaskCyberbugsType";
import { SET_SUBMIT_CREATE_TASK } from "../../../redux/types/DrawerCyberbugsType";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/types/ProjectCyberbugsType";
import { GET_USERS_BY_PROJECT_SAGA } from "../../../redux/types/UserCyberbugType";
import { useFormik } from "formik";

const { Option } = Select;

export default function FormCreateTask(props) {
	const { arrPriority, arrStatusTask, arrTaskType } = useSelector(
		(state) => state.TaskCyberbugsReducer
	);
	const { arrAllProject } = useSelector((state) => state.ProjectReducer);
	const { arrUsersProject } = useSelector(
		(state) => state.UserCyberbugsReducer
	);

	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			listUserAsign: [],
			taskName: "",
			description: "",
			statusId: arrStatusTask[0]?.statusId,
			originalEstimate: 0,
			timeTrackingSpent: 0,
			timeTrackingRemaining: 0,
			projectId: arrAllProject[0]?.id,
			typeId: arrTaskType[0]?.id,
			priorityId: arrPriority[0]?.priorityId,
		},

		onSubmit: (values, { resetForm }) => {
			dispatch({
				type: CREATE_TASK_SAGA,
				newTask: values,
			});
			resetForm();
		},
	});
	const { values, handleChange, handleSubmit, setFieldValue } = formik;

	useEffect(() => {
		dispatch({
			type: GET_ALL_PROJECT_SAGA,
		});

		dispatch({
			type: GET_ALL_PRIORITY_SAGA,
		});
		dispatch({
			type: GET_ALL_STATUS_TASK_SAGA,
		});
		dispatch({
			type: GET_ALL_TASK_TYPE_SAGA,
		});
		dispatch({
			type: SET_SUBMIT_CREATE_TASK,
			submitFunction: handleSubmit,
		});
	}, [dispatch, handleSubmit]);

	const changeArrProject = (arrProject) => {
		let newArr = [];
		arrProject?.map((item) => {
			return newArr.push({
				value: item.id,
				label: item.projectName,
			});
		});
		return newArr;
	};

	const changeArrTaskType = (arrTaskType) => {
		let newArr = [];
		arrTaskType?.map((item) => {
			return newArr.push({
				value: item.id,
				label: item.taskType,
			});
		});
		return newArr;
	};

	const changeArrStatusTask = (arrStatusTask) => {
		let newArr = [];
		arrStatusTask?.map((item) => {
			return newArr.push({
				value: item.statusId,
				label: item.statusName,
			});
		});
		return newArr;
	};

	const changeArrPriorityTask = (arrPriorityTask) => {
		let newArr = [];
		arrPriorityTask?.map((item) => {
			return newArr.push({
				value: item.priorityId,
				label: item.priority,
			});
		});
		return newArr;
	};

	const handleChangeFieldName = (value, fieldName) => {
		if (fieldName === "projectId") {
			dispatch({
				type: GET_USERS_BY_PROJECT_SAGA,
				projectId: value,
			});
		}
		setFieldValue(fieldName, value);
	};

	const handleEditorChange = (e) => {
		setFieldValue("description", e.target.getContent());
	};

	const renderArrUsersProject = () => {
		return arrUsersProject?.map((item, index) => {
			return (
				<Option key={index} value={item.userId}>
					{item.name}
				</Option>
			);
		});
	};

	const renderProject = () => {
		const newArrProject = changeArrProject(arrAllProject);
		return (
			<Select
				className='my-2 text-base rounded-md w-full bg-slate-500'
				value={values.projectId}
				onChange={(value) => {
					handleChangeFieldName(value, "projectId");
				}}
				options={newArrProject}
			/>
		);
	};

	const renderPriorityTask = (arrPriorityTask) => {
		const newArrPriorityTask = changeArrPriorityTask(arrPriorityTask);
		return (
			<Select
				className='text-base rounded-md w-full bg-slate-500'
				value={values.priorityId}
				onChange={(value) => {
					handleChangeFieldName(value, "priorityId");
				}}
				options={newArrPriorityTask}
			/>
		);
	};

	const renderTaskType = (arrTaskType) => {
		const newArrTaskType = changeArrTaskType(arrTaskType);
		return (
			<Select
				className='w-full text-base rounded-md  bg-slate-500'
				value={values.typeId}
				onChange={(value) => {
					handleChangeFieldName(value, "typeId");
				}}
				options={newArrTaskType}
			/>
		);
	};

	const renderStatusTask = (arrStatusTask) => {
		const newArrStatusTask = changeArrStatusTask(arrStatusTask);
		return (
			<Select
				className='text-base rounded-md w-full bg-slate-500'
				value={values.statusId}
				onChange={(value) => {
					handleChangeFieldName(value, "statusId");
				}}
				options={newArrStatusTask}
			/>
		);
	};

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div className='form-group'>
				<p className='text-base'>Project</p>
				{renderProject(arrAllProject)}
			</div>
			<div className='form-group'>
				<p className='text-base'>Task name</p>
				<input
					name='taskName'
					className='form-control w-full p-2 text-base rounded-md border border-slate-600'
					value={values.taskName}
					onChange={handleChange}
				/>
			</div>
			<div className='grid grid-cols-3 gap-2'>
				<div className='col-4'>
					<div className='form-group'>
						<p className='text-base'>Task type</p>
						{renderTaskType(arrTaskType)}
					</div>
				</div>
				<div className='col-4'>
					<div className='form-group'>
						<p className='text-base'>Priority</p>
						{renderPriorityTask(arrPriority)}
					</div>
				</div>
				<div className='col-4'>
					<div className='form-group'>
						<p className='text-base'>Status</p>
						{renderStatusTask(arrStatusTask)}
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<div className='col-6'>
					<div className='form-group'>
						<p className='text-base'>Assignment</p>
						<Select
							mode='multiple'
							name='listUserAsign'
							size={"large"}
							placeholder='Please select user'
							optionFilterProp='label'
							options={arrUsersProject?.map((item, index) => {
								return { value: item.userId, label: item.name };
							})}
							value={values.listUserAsign}
							onChange={(e) => {
								handleChangeFieldName(e, "listUserAsign");
							}}
							style={{ width: "100%" }}>
							{renderArrUsersProject()}
						</Select>
					</div>
				</div>
				<div className='col-6'>
					<div className='form-group'>
						<p className='text-base'>Original Estimate</p>
						<input
							type='number'
							value={values.originalEstimate}
							min={0}
							max={100}
							name='originalEstimate'
							className='form-control w-full p-2 text-base rounded-md border border-slate-400'
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12'>
					<p className='text-base'>Time tracking (hour)</p>
					<div className='flex flex-row items-center gap-4'>
						<div className='basis-1/4'>
							<p className='my-0 font-weight-normal fst-italic'>Time spend</p>
							<input
								type='number'
								onChange={(e) => {
									setFieldValue("timeTrackingSpent", e.target.value);
								}}
								style={{ fontSize: "14px" }}
								value={Number(values.timeTrackingSpent)}
								min={0}
								max={100}
								name='timeTrackingSpent'
								className='form-control w-full p-2 text-base rounded-md border border-slate-400'
							/>
						</div>
						<div className='basis-1/2 mt-8'>
							<Slider
								value={Number(values.timeTrackingSpent)}
								max={
									Number(values.timeTrackingSpent) +
									Number(values.timeTrackingRemaining)
								}
								className='m-0'
							/>
							<div className='flex flex-row'>
								<div className='basis-1/2 font-weight-bold'>
									{values.timeTrackingSpent}h logged
								</div>
								<div className='basis-1/2 text-right font-weight-bold'>
									{values.timeTrackingRemaining}h remaining
								</div>
							</div>
						</div>
						<div className='basis-1/4'>
							<p className='my-0 font-weight-normal fst-italic'>
								Time remaining
							</p>
							<input
								type='number'
								style={{ fontSize: "14px" }}
								onChange={(e) => {
									setFieldValue("timeTrackingRemaining", e.target.value);
								}}
								value={Number(values.timeTrackingRemaining)}
								min={0}
								max={100}
								name='timeTrackingRemaining'
								className='form-control w-full p-2 text-base rounded-md border border-slate-400'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='form-group'>
				<p className='text-base'>Description</p>
				<Editor
					apiKey='idbtfkj3ordlxl9xbkrk5x33ttajitctmzr4ipwa7emcs2kc'
					initialValue={values.description}
					name='description'
					init={{
						selector: "textarea#myTextArea",
						height: 300,
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
