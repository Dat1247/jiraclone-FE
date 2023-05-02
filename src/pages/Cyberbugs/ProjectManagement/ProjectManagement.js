import React, { useEffect, useState, useRef } from "react";
import {
	Table,
	Tag,
	Button,
	Popconfirm,
	Avatar,
	AutoComplete,
	Popover,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	DELETE_PROJECT_SAGA,
	EDIT_PROJECT,
	GET_ALL_PROJECT_SAGA,
} from "../../../redux/types/ProjectCyberbugsType";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { OPEN_FORM } from "../../../redux/types/DrawerCyberbugsType";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";
import {
	ASSIGN_USER_PROJECT,
	GET_USER_SEARCH_SAGA,
	REMOVE_USER_PROJECT_SAGA,
} from "../../../redux/types/UserCyberbugType";
import { NavLink } from "react-router-dom";
import HeaderCyberbugs from "../../../components/Cyberbugs/HeaderCyberbugs/HeaderCyberbugs";

export default function ProjectManagement(props) {
	const [valueSearch, setValueSearch] = useState("");
	const searchRef = useRef(null);
	const arrAllProject = useSelector(
		(state) => state.ProjectReducer.arrAllProject
	);
	const { arrUsersSearch } = useSelector((state) => state.UserCyberbugsReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: GET_ALL_PROJECT_SAGA,
		});
	}, [dispatch]);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			sorter: (item2, item1) => item2.id - item1.id,

			sortDirections: ["descend"],
			width: "13%",
		},
		{
			title: "Project Name",
			dataIndex: "projectName",
			key: "projectName",
			render: (text, record, index) => {
				return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
			},
			sorter: (item2, item1) => {
				let projectName1 = item1.projectName.trim().toLowerCase();
				let projectName2 = item2.projectName.trim().toLowerCase();
				if (projectName2 < projectName1) {
					return -1;
				}
				return 1;
			},
		},

		{
			title: "Category",
			dataIndex: "categoryName",
			key: "categoryName",
			render: (text, record, index) => {
				let changeText = "";
				if (record.categoryId === 1) {
					changeText = "Web Project";
				} else if (record.categoryId === 2) {
					changeText = "Software Project";
				} else {
					changeText = "Mobile Project";
				}
				return <p>{changeText}</p>;
			},
			sorter: (item2, item1) => {
				let categoryName1 = item1.categoryName.trim().toLowerCase();
				let categoryName2 = item2.categoryName.trim().toLowerCase();
				if (categoryName2 < categoryName1) {
					return -1;
				}
				return 1;
			},
			width: "15%",
		},

		{
			title: "Creator",
			dataIndex: "",
			key: "creator",
			render: (text, record, index) => {
				return <Tag color='green'>{record.creator.name}</Tag>;
			},
			sorter: (item2, item1) => {
				let creator1 = item1.creator.name.trim().toLowerCase();
				let creator2 = item2.creator.name.trim().toLowerCase();
				if (creator2 < creator1) {
					return -1;
				}
				return 1;
			},
			width: "10%",
		},

		{
			title: "Members",
			dataIndex: "members",
			key: "members",
			render: (text, record, index) => {
				return (
					<div className='flex'>
						<Avatar.Group
							maxCount={2}
							maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
							{record.members?.map((item, index) => {
								return (
									<Popover
										key={index}
										placement='top'
										title='Members'
										content={() => {
											return (
												<table className='table'>
													<thead>
														<tr>
															<th>ID</th>
															<th>Name</th>
															<th>Avatar</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														{record.members?.map((item, index) => {
															return (
																<tr key={index}>
																	<td style={{ verticalAlign: "middle" }}>
																		{item.userId}
																	</td>
																	<td style={{ verticalAlign: "middle" }}>
																		{item.name}
																	</td>
																	<td>
																		<img
																			src={item.avatar}
																			alt={item.name}
																			width='30'
																			height='30'
																			style={{ borderRadius: "50%" }}
																		/>
																	</td>
																	<td>
																		<Button
																			type='danger'
																			shape='circle'
																			onClick={() => {
																				dispatch({
																					type: REMOVE_USER_PROJECT_SAGA,
																					userRemove: {
																						projectId: record.id,
																						userId: item.userId,
																					},
																				});
																			}}>
																			X
																		</Button>
																	</td>
																</tr>
															);
														})}
													</tbody>
												</table>
											);
										}}>
										<Avatar src={item.avatar} />
									</Popover>
								);
							})}
						</Avatar.Group>
						<Popover
							placement='bottom'
							title={"Add User"}
							content={() => {
								return (
									<AutoComplete
										options={arrUsersSearch?.map((user, index) => {
											return {
												label: user.name,
												value: user.userId.toString(),
											};
										})}
										value={valueSearch}
										style={{ width: "100%" }}
										onSelect={(value, option) => {
											setValueSearch(option.label);
											dispatch({
												type: ASSIGN_USER_PROJECT,
												userAssign: {
													projectId: record.id,
													userId: option.value,
												},
											});
										}}
										onSearch={(value) => {
											setValueSearch(value);
											if (searchRef.current) {
												clearTimeout(searchRef.current);
											}
											searchRef.current = setTimeout(() => {
												dispatch({
													type: GET_USER_SEARCH_SAGA,
													keyWord: value,
												});
											}, 300);
										}}
										onChange={(value) => {}}
										placeholder='input here'
									/>
								);
							}}
							trigger='click'>
							<Button shape='circle'>+</Button>
						</Popover>
					</div>
				);
			},
			width: "15%",
		},

		{
			title: "Action",
			dataIndex: "",
			key: "action",
			render: (text, record) => {
				return (
					<div>
						<Button
							className='mr-2'
							onClick={() => {
								dispatch({
									type: OPEN_FORM,
									Component: <FormEditProject />,
									Title: "Edit Project",
									NameButton: "Save",
								});

								dispatch({
									type: EDIT_PROJECT,
									editProject: record,
								});
							}}>
							<EditOutlined />
						</Button>
						<Popconfirm
							title='Are you sure to delete this project?'
							onConfirm={() => {
								dispatch({
									type: DELETE_PROJECT_SAGA,
									projectId: record.id,
								});
							}}
							okText='Yes'
							cancelText='No'>
							<Button danger>
								<DeleteOutlined />
							</Button>
						</Popconfirm>
					</div>
				);
			},
			width: "15%",
		},
	];

	return (
		<div style={{ width: "100%" }}>
			<HeaderCyberbugs />
			<div className='mt-3 container'>
				<h3 className='mt-3 mb-2 text-2xl font-bold tracking-wider'>
					Project Management
				</h3>

				<Table columns={columns} dataSource={arrAllProject} rowKey={"id"} />
			</div>
		</div>
	);
}
