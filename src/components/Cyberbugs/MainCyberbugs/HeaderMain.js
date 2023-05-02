import { Breadcrumb } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderMain(props) {
	return (
		<div className='header'>
			<Breadcrumb
				items={[
					{
						title: (
							<NavLink to={"/projectmanagement"}>Project Management</NavLink>
						),
					},
					{
						title: `${props.projectName}`,
					},
				]}
			/>
		</div>
	);
}
