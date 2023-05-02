import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "antd";
import { TOKEN, USER_LOGIN } from "../../../utils/constants/settingSystem";
import { useNavigate } from "react-router-dom";

export default function HeaderCyberbugs(props) {
	const navigate = useNavigate();
	const { userLogin } = useSelector((state) => state.UserCyberbugsReducer);
	const items = [
		{
			key: "1",
			label: (
				<span
					className='text-red-500'
					onClick={() => {
						localStorage.removeItem(USER_LOGIN);
						localStorage.removeItem(TOKEN);
						navigate("/");
						window.location.reload();
					}}>
					Sign out
				</span>
			),
		},
	];

	return (
		<div className='headerPage'>
			<div className='text-right p-3 flex items-center justify-end tracking-wider'>
				Hello!, <span className=' font-bold ml-1'> {userLogin.name}</span>
				<Dropdown menu={{ items }} placement='bottomRight' trigger={["click"]}>
					<img
						className='mx-2 cursor-pointer rounded-full'
						src={userLogin.avatar}
						alt={userLogin.name}
						style={{
							width: 35,
							height: 35,
						}}
					/>
				</Dropdown>
			</div>
		</div>
	);
}
