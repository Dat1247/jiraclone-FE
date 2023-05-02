import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCyberbugs(props) {
	return (
		<div className='menu'>
			<div className='account'>
				<div className='avatar'>
					<img src={require("../../assets/img/logo.jpg")} alt='logo' />
				</div>
				<div className='account-info'>
					<p className='font-bold mb-1 text-lg'>Jira App</p>
					<p className='font-light mt-0 text-red-900 italic text-sm'>
						Report bugs
					</p>
				</div>
			</div>
			<div className='control'>
				<NavLink to='/'>
					<i className='fa fa-credit-card' />
					<span>Cyber Board</span>
				</NavLink>
				<NavLink to='/projectmanagement'>
					<i className='fab fa-buffer'></i>
					<span>Projects Management</span>
				</NavLink>
				<NavLink to='/usermanagement'>
					<i className='fa fa-users'></i>
					<span>Users Management</span>
				</NavLink>
				<NavLink to='/createproject'>
					<i className='fa fa-cog' />
					<span>Create Project</span>
				</NavLink>
			</div>
		</div>
	);
}
