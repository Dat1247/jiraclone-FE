import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import HTMLReactParser from "html-react-parser";
import {
	CHANGE_ASSIGNESS_TASK_MODAL,
	CHANGE_TASK_DETAIL_MODAL,
	CLOSE_MODAL,
	DELETE_TASK_SAGA,
	GET_ALL_PRIORITY_SAGA,
	GET_ALL_STATUS_TASK_SAGA,
	GET_ALL_TASK_TYPE_SAGA,
	HANDLE_CHANGE_POST_API_SAGA,
	REMOVE_USER_TASK,
} from "../../../redux/types/TaskCyberbugsType";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Popconfirm, Progress, Select } from "antd";
import {
	CREATE_COMMENT_SAGA,
	DELETE_COMMENT_SAGA,
	EDIT_COMMENT_SAGA,
} from "../../../redux/types/CommentType";

const { Option } = Select;

export default function ModalCyberbugs(props) {
	const [isDesc, setIsDesc] = useState(true);
	const [visibleCommentInput, setVisibleCommentInput] = useState(false);
	const [visibleChangeCommentInput, setVisibleChangeCommentInput] =
		useState(false);
	const { taskDetailModel, arrPriority, arrStatusTask, arrTaskType } =
		useSelector((state) => state.TaskCyberbugsReducer);
	const { arrComment, commentUpdate } = useSelector(
		(state) => state.CommentReducer
	);
	const dispatch = useDispatch();
	const [contentDesc, setContentDesc] = useState(taskDetailModel.description);
	const [objCommentUpdate, setObjCommentUpdate] = useState(commentUpdate);
	const [contentComment, setContentComment] = useState("");
	const [updateComment, setUpdateComment] = useState("");

	const { userLogin, arrUsersProject } = useSelector(
		(state) => state.UserCyberbugsReducer
	);

	useEffect(() => {
		dispatch({
			type: GET_ALL_PRIORITY_SAGA,
		});
		dispatch({
			type: GET_ALL_STATUS_TASK_SAGA,
		});
		dispatch({
			type: GET_ALL_TASK_TYPE_SAGA,
		});
	}, [dispatch]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch({
			type: HANDLE_CHANGE_POST_API_SAGA,
			actionType: CHANGE_TASK_DETAIL_MODAL,
			name,
			value,
		});
	};

	const handleChangeTaskType = (e) => {
		dispatch({
			type: HANDLE_CHANGE_POST_API_SAGA,
			actionType: CHANGE_TASK_DETAIL_MODAL,
			name: "typeId",
			value: e,
		});
	};

	const handleChangeStatusTask = (e) => {
		dispatch({
			type: HANDLE_CHANGE_POST_API_SAGA,
			actionType: CHANGE_TASK_DETAIL_MODAL,
			name: "statusId",
			value: e,
		});
	};

	const handleChangePriorityTask = (e) => {
		dispatch({
			type: HANDLE_CHANGE_POST_API_SAGA,
			actionType: CHANGE_TASK_DETAIL_MODAL,
			name: "priorityId",
			value: e,
		});
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

	const renderPriorityTask = (arrPriorityTask) => {
		const newArrPriorityTask = changeArrPriorityTask(arrPriorityTask);
		return (
			<Select
				className='my-2 text-base rounded-md w-full bg-slate-500'
				value={taskDetailModel.priorityId}
				onChange={handleChangePriorityTask}
				options={newArrPriorityTask}
			/>
		);
	};

	const renderTaskType = (arrTaskType) => {
		const newArrTaskType = changeArrTaskType(arrTaskType);
		return (
			<Select
				className='mx-1 text-base rounded-md  bg-slate-500'
				style={{ minWidth: "96px" }}
				value={taskDetailModel.typeId}
				onChange={handleChangeTaskType}
				options={newArrTaskType}
			/>
		);
	};

	const renderStatusTask = (arrStatusTask) => {
		const newArrStatusTask = changeArrStatusTask(arrStatusTask);
		return (
			<Select
				className='my-2 text-base rounded-md w-full bg-slate-500'
				value={taskDetailModel.statusId}
				onChange={handleChangeStatusTask}
				options={newArrStatusTask}
			/>
		);
	};

	const renderTimeTracking = () => {
		let totalTimeTracking =
			Number(taskDetailModel.timeTrackingSpent) +
			Number(taskDetailModel.timeTrackingRemaining);
		let percent = Math.round(
			(Number(taskDetailModel.timeTrackingSpent) / totalTimeTracking) * 100
		);
		return (
			<>
				<div className='flex'>
					<i className='fa fa-clock' />
					<div className='w-full'>
						<div className='progress'>
							<div
								className='progress-bar'
								role='progressbar'
								style={{
									width: `${percent}%`,
								}}
								aria-valuenow={taskDetailModel.timeTrackingSpent}
								aria-valuemin={0}
								aria-valuemax={totalTimeTracking}
							/>
						</div>
						<Progress percent={`${percent}`} showInfo={false} />
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}>
							<p className='logged'>
								{taskDetailModel.timeTrackingSpent
									? taskDetailModel.timeTrackingSpent
									: 0}
								h logged
							</p>
							<p className='estimate-time'>
								{taskDetailModel.timeTrackingRemaining
									? taskDetailModel.timeTrackingRemaining
									: 0}
								h estimated
							</p>
						</div>
					</div>
				</div>
				<div className='flex gap-2'>
					<div className='basis-1/2'>
						<input
							className='form-control w-full p-1 text-sm rounded-md border border-slate-200'
							type='number'
							name='timeTrackingSpent'
							value={taskDetailModel.timeTrackingSpent}
							onChange={handleChange}
						/>
					</div>
					<div className='basis-1/2'>
						<input
							className='form-control w-full p-1 text-sm rounded-md border border-slate-200'
							type='number'
							name='timeTrackingRemaining'
							value={taskDetailModel.timeTrackingRemaining}
							onChange={handleChange}
						/>
					</div>
				</div>
			</>
		);
	};

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const renderDescription = () => {
		let jsxDescription = taskDetailModel.description;
		return (
			<>
				<p className='mt-3 font-bold text-lg'>Description</p>
				{isDesc ? (
					<div
						onClick={() => {
							setIsDesc(false);
						}}>
						{" "}
						{HTMLReactParser(jsxDescription)}{" "}
					</div>
				) : (
					<div>
						<Editor
							apiKey='idbtfkj3ordlxl9xbkrk5x33ttajitctmzr4ipwa7emcs2kc'
							initialValue={taskDetailModel.description}
							name='description'
							init={{
								selector: "textarea#myTextArea",
								height: 200,

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
						<div className='flex justify-end my-3'>
							<Button
								type='primary'
								onClick={() => {
									dispatch({
										type: HANDLE_CHANGE_POST_API_SAGA,
										actionType: CHANGE_TASK_DETAIL_MODAL,
										name: "description",
										value: contentDesc,
									});
									setIsDesc(true);
								}}>
								Save
							</Button>
							<Button
								className='ml-2'
								danger
								onClick={() => {
									setIsDesc(true);
								}}>
								Cancel
							</Button>
						</div>
					</div>
				)}
			</>
		);
	};

	const renderComment = () => {
		return arrComment?.map((item, index) => {
			let jsxComment = HTMLReactParser(item.contentComment);

			return (
				<div className='comment-item mt-2' key={index}>
					<div className='display-comment flex'>
						<div className='avatar'>
							<img src={item.user.avatar} alt={item.user.avatar} />
						</div>
						<div>
							<p className='mb-1 font-semibold'>{item.user.name}</p>
							<div className='mb-1'>{jsxComment}</div>
							<div>
								<span
									style={{
										color: "rgb(66, 88, 216)",
										cursor: "pointer",
									}}
									onClick={() => {
										setVisibleCommentInput(true);
										setVisibleChangeCommentInput(true);
										setObjCommentUpdate({ ...item });
									}}>
									Edit
								</span>
								<span className='mx-1'>•</span>

								<Popconfirm
									placement='bottom'
									title={"Are you sure to delete this task?"}
									onConfirm={() => {
										dispatch({
											type: DELETE_COMMENT_SAGA,
											idComment: item.id,
											taskId: item.taskId,
										});
									}}
									okText='Yes'
									cancelText='No'>
									<span
										style={{ cursor: "pointer", color: "rgb(218, 49, 49)" }}>
										Delete
									</span>
								</Popconfirm>
							</div>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className='modal'>
			<div className='modal-dialog modal-info'>
				<div className='modal-content'>
					<div className='modal-header'>
						<div className='task-title basis-2/3'>
							{taskDetailModel.typeId == 2 ? (
								<i className='fa fa-bookmark' />
							) : (
								<i className='fa fa-exclamation-circle'></i>
							)}
							{renderTaskType(arrTaskType)}

							<p className='font-bold italic'>{taskDetailModel.taskId}</p>
						</div>
						<div className='task-click basis-1/3 flex items-center justify-between'>
							<div>
								<i className='fab fa-telegram-plane mr-2' />
								<span style={{ paddingRight: 20 }}>Give feedback</span>
							</div>
							<div>
								<i className='fa fa-link mr-2' />
								<span style={{ paddingRight: 20 }}>Copy link</span>
							</div>

							<Popconfirm
								className='text-lg text-red-800'
								placement='bottom'
								title={"Are you sure to delete this task?"}
								onConfirm={() => {
									dispatch({
										type: DELETE_TASK_SAGA,
										taskId: taskDetailModel.taskId,
										projectId: taskDetailModel.projectId,
									});
								}}
								okText='Yes'
								cancelText='No'>
								<DeleteOutlined />
							</Popconfirm>

							<CloseOutlined
								className='text-lg font-bold'
								onClick={() => {
									dispatch({
										type: CLOSE_MODAL,
									});
								}}
							/>
						</div>
					</div>
					<div className='modal-body px-8'>
						<div className=' flex gap-4'>
							<div className='basis-2/3 modal_content_left pr-1'>
								<p className='issue'>{taskDetailModel.taskName}</p>
								<div className='description'>{renderDescription()}</div>

								<div className='comment mt-3 pr-2'>
									<h6 className='text-lg font-semibold'>Comment</h6>
									<div className='block-comment flex gap-2'>
										<div className='avatar flex justify-center items-center'>
											<img src={userLogin.avatar} alt={userLogin.avatar} />
										</div>
										<div className='input-comment'>
											{visibleCommentInput ? (
												visibleChangeCommentInput ? (
													<>
														<Editor
															apiKey='idbtfkj3ordlxl9xbkrk5x33ttajitctmzr4ipwa7emcs2kc'
															initialValue={objCommentUpdate.contentComment}
															init={{
																height: 150,
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
															onChange={(e) => {
																setUpdateComment(e.target.getContent());
															}}
														/>
														<div className='flex justify-end my-3'>
															<Button
																type='primary'
																onClick={() => {
																	dispatch({
																		type: EDIT_COMMENT_SAGA,
																		updateComment: {
																			...objCommentUpdate,
																			contentComment: updateComment,
																		},
																	});
																	setVisibleCommentInput(false);
																	setVisibleChangeCommentInput(false);
																}}>
																Update
															</Button>
															<Button
																danger
																className='ml-2'
																onClick={() => {
																	setVisibleCommentInput(false);
																	setVisibleChangeCommentInput(false);
																}}>
																Cancel
															</Button>
														</div>
													</>
												) : (
													<>
														<Editor
															apiKey='idbtfkj3ordlxl9xbkrk5x33ttajitctmzr4ipwa7emcs2kc'
															initialValue={""}
															init={{
																selector: "textarea#myTextArea",
																height: 150,
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
															onChange={(e) => {
																setContentComment(e.target.getContent());
															}}
														/>
														<div className='flex justify-end my-3'>
															<Button
																type='primary'
																onClick={() => {
																	dispatch({
																		type: CREATE_COMMENT_SAGA,
																		newComment: {
																			taskId: taskDetailModel.taskId,
																			contentComment: contentComment,
																		},
																	});
																	setVisibleCommentInput(false);
																}}>
																Save
															</Button>
															<Button
																danger
																className='ml-2'
																onClick={() => {
																	setVisibleCommentInput(false);
																}}>
																Cancel
															</Button>
														</div>
													</>
												)
											) : (
												<input
													type='text'
													placeholder='Add a comment ...'
													onClick={() => {
														setVisibleCommentInput(true);
													}}
												/>
											)}
										</div>
									</div>
									<div className='lastest-comment mt-3'>{renderComment()}</div>
								</div>
							</div>
							<div className='basis-1/3'>
								<div className='status'>
									<h6 className='text-xs font-semibold'>STATUS</h6>
									{renderStatusTask(arrStatusTask)}
								</div>
								<div className='assignees'>
									<h6 className='text-xs font-semibold'>ASSIGNEES</h6>
									<div style={{ display: "flex" }}>
										{taskDetailModel.assigness.map((item, index) => {
											return (
												<div className='item' key={index}>
													<div className='avatar'>
														<Avatar
															style={{
																color: "#f56a00",
																backgroundColor: "#fde3cf",
															}}
															src={item.avatar}></Avatar>
													</div>
													<p className='name'>{item.name}</p>
													<i
														className='fa fa-times'
														style={{ marginLeft: 5, cursor: "pointer" }}
														onClick={() => {
															dispatch({
																type: HANDLE_CHANGE_POST_API_SAGA,
																actionType: REMOVE_USER_TASK,
																userId: item.id,
															});
														}}
													/>
												</div>
											);
										})}
										<Select
											options={arrUsersProject
												?.filter((mem) => {
													let index = taskDetailModel.assigness?.findIndex(
														(us) => us.id === mem.userId
													);
													if (index !== -1) {
														return false;
													}
													return true;
												})
												.map((mem, index) => {
													return { value: mem.userId, label: mem.name };
												})}
											optionFilterProp='label'
											name='lstUser'
											value='+ Add more'
											onSelect={(value) => {
												let userSelect = arrUsersProject.find(
													(user) => user.userId == value
												);
												userSelect = { ...userSelect, id: userSelect.userId };

												dispatch({
													type: HANDLE_CHANGE_POST_API_SAGA,
													actionType: CHANGE_ASSIGNESS_TASK_MODAL,
													userSelect,
												});
											}}>
											{arrUsersProject
												?.filter((mem) => {
													let index = taskDetailModel.assigness?.findIndex(
														(us) => us.id === mem.userId
													);
													if (index !== -1) {
														return false;
													}
													return true;
												})
												.map((mem, index) => {
													return (
														<Option value={mem.userId} key={index}>
															{mem.name}
														</Option>
													);
												})}
										</Select>
									</div>
								</div>

								<div className='priority' style={{ margin: "20px 0" }}>
									<h6 className='text-xs font-semibold'>PRIORITY</h6>

									{renderPriorityTask(arrPriority)}
								</div>
								<div className='estimate'>
									<h6 className='text-xs font-semibold'>
										ORIGINAL ESTIMATE (HOURS)
									</h6>
									<input
										type='number'
										className='estimate-hours my-2 text-base rounded-md w-full'
										name='originalEstimate'
										value={taskDetailModel.originalEstimate}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</div>
								<div className='time-tracking'>
									<h6 className='text-xs font-semibold'>TIME TRACKING</h6>
									{renderTimeTracking()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
