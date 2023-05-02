import React from "react";
import { Avatar } from "antd";

export default function InfoMain(props) {
	const renderMembers = () => {
		return props.members?.map((item, index) => {
			return <Avatar src={item.avatar} key={index} />;
		});
	};

	return (
		<div className='info flex items-center my-4'>
			<p>Members: </p>
			<div className='avatar-group flex'>
				<Avatar.Group
					maxCount={2}
					size='large'
					maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
					{renderMembers()}
				</Avatar.Group>
			</div>
		</div>
	);
}
