import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Popconfirm, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	DELETE_USER_SAGA,
	EDIT_USER,
	GET_USERS_SAGA,
} from "../../../redux/types/UserCyberbugType";
import { OPEN_FORM } from "../../../redux/types/DrawerCyberbugsType";
import FormEditUser from "../../../components/Forms/FormEditUser/FormEditUser";
import FormCreateUser from "../../../components/Forms/FormCreateUser/FormCreateUser";
import HeaderCyberbugs from "../../../components/Cyberbugs/HeaderCyberbugs/HeaderCyberbugs";

const { Search } = Input;

export default function UserManagement(props) {
	const { arrAllUser } = useSelector((state) => state.UserCyberbugsReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: GET_USERS_SAGA,
			keyWord: "",
		});
	}, [dispatch]);

	const handleChange = (pagination, filters, sorter) => {};

	const columns = [
		{
			title: "ID",
			dataIndex: "userId",
			key: "userId",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone number",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Action",
			dataIndex: "",
			key: "action",
			render: (text, record) => {
				return (
					<div>
						<Button
							className='mr-2 '
							onClick={() => {
								dispatch({
									type: OPEN_FORM,
									Component: <FormEditUser />,
									Title: "Edit User",
									NameButton: "Save",
								});
								dispatch({
									type: EDIT_USER,
									userEdit: record,
								});
							}}>
							<EditOutlined />
						</Button>
						<Popconfirm
							title='Are you sure to delete this user?'
							onConfirm={() => {
								dispatch({
									type: DELETE_USER_SAGA,
									userId: record.userId,
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
		},
	];
	const handleSubmitSearch = (e) => {
		dispatch({
			type: GET_USERS_SAGA,
			keyWord: e,
		});
	};

	return (
		<div style={{ width: "100%" }}>
			<HeaderCyberbugs />

			<div className='container'>
				<h3 className='mt-3 mb-2 text-2xl font-bold tracking-wider'>
					Users Management
				</h3>
				<Button
					type='primary'
					className='my-3'
					onClick={() => {
						const action = {
							type: OPEN_FORM,
							Title: "Create User",
							Component: <FormCreateUser />,
							NameButton: "Create",
						};
						dispatch(action);
					}}>
					Create user
				</Button>

				<Search
					placeholder='Search...'
					allowClear
					enterButton='Search'
					onSearch={handleSubmitSearch}
					style={{ marginBottom: "10px" }}
				/>
				<Table
					columns={columns}
					dataSource={arrAllUser}
					onChange={handleChange}
					rowKey={"userId"}
				/>
			</div>
		</div>
	);
}
