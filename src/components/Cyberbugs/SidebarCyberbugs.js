import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { OPEN_FORM } from "../../redux/types/DrawerCyberbugsType";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items = [
	getItem("Search", "1", <SearchOutlined />),
	getItem("Create task", "2", <PlusOutlined />),
];

export default function SidebarCyberbugs(props) {
	const [state, setState] = useState({
		collapsed: true,
	});
	const dispatch = useDispatch();

	const toggle = () => {
		setState({
			collapsed: !state.collapsed,
		});
	};

	return (
		<Sider collapsible collapsed={state.collapsed} onCollapse={toggle}>
			<Menu
				theme='dark'
				mode='inline'
				items={items}
				className='mt-3'
				style={{ fontSize: "1rem" }}
				onClick={({ key, keyPath, domEvent }) => {
					if (key === "2") {
						dispatch({
							type: OPEN_FORM,
							Component: <FormCreateTask />,
							Title: "Create Task",
							NameButton: "Create",
						});
					}
				}}></Menu>
		</Sider>
	);
}
