import React from "react";

export default function WarningTemplate() {
	return (
		<div className='warning-overlay'>
			<i className='fa fa-exclamation'></i>
			<p className='warning-title'>This screen size is too small!</p>
			<p className='warning-info'>
				Your screen width must be larger than 1300px!
			</p>
		</div>
	);
}
