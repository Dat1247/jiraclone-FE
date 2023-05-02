import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import MenuCyberbugs from "../components/Cyberbugs/MenuCyberbugs";
import SidebarCyberbugs from "../components/Cyberbugs/SidebarCyberbugs";

import { USER_LOGIN } from "../utils/constants/settingSystem";
import WarningTemplate from "./WarningTemplate";
import { Layout } from "antd";
import { useSelector } from "react-redux";

export default function CyberBugsTemplate(props) {
	const [size, setSize] = useState({
		width: window.innerWidth,
	});
	const { isShowModal } = useSelector((state) => state.TaskCyberbugsReducer);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setSize({ width: window.innerWidth });
		});
	}, [isShowModal]);

	if (!localStorage.getItem(USER_LOGIN)) {
		return <Navigate to='/user/login' replace={true} />;
	}

	if (size.width >= 1300) {
		return (
			<>
				<div className='jira'>
					<Layout>
						{/* Sider Bar  */}
						<SidebarCyberbugs />
						{/* Menu */}
						<MenuCyberbugs />

						<Outlet />
					</Layout>
				</div>
			</>
		);
	} else {
		return <WarningTemplate />;
	}
}
