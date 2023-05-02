import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";

const { Sider } = Layout;

export default function UserLogInTemplate(props) {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	useEffect(() => {
		window.onresize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
	}, []);

	return (
		<>
			<Layout>
				<Sider
					width={size.width / 2}
					style={{
						height: size.height,
						backgroundImage: `url('https://picsum.photos/${Math.round(
							size.width / 2
						)}/${Math.round(size.height)}')`,
						backgroundSize: "100%",
					}}></Sider>
				<Layout>
					<div>
						<Outlet />
					</div>
				</Layout>
			</Layout>
		</>
	);
}
