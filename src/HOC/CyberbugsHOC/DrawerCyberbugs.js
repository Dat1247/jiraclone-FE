import React from "react";
import { Drawer, Button, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/types/DrawerCyberbugsType";

export default function DrawerCyberbugs(props) {
	const { visible, ComponentContentDrawer, callBackSubmit, Title, NameButton } =
		useSelector((state) => state.DrawerCyberbugsReducer);
	const dispatch = useDispatch();

	const onClose = () => {
		dispatch({
			type: CLOSE_DRAWER,
		});
	};
	return (
		<>
			<Drawer
				title={Title}
				width={720}
				onClose={onClose}
				open={visible}
				extra={
					<Space>
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={callBackSubmit} type='primary'>
							{NameButton}
						</Button>
					</Space>
				}>
				{ComponentContentDrawer}
			</Drawer>
		</>
	);
}
