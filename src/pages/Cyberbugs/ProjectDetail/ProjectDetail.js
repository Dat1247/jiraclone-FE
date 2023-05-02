import React, { useEffect } from "react";
import ContentMain from "../../../components/Cyberbugs/MainCyberbugs/ContentMain";
import HeaderMain from "../../../components/Cyberbugs/MainCyberbugs/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/MainCyberbugs/InfoMain";
import HTMLReactParser from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../../redux/types/ProjectCyberbugsType";
import { useParams } from "react-router-dom";

export const ProjectDetail = (props) => {
	const dispatch = useDispatch();
	const params = useParams();

	const { projectDetail } = useSelector((state) => state.ProjectReducer);

	useEffect(() => {
		dispatch({
			type: GET_PROJECT_DETAIL_SAGA,
			projectId: params.projectId,
		});
	}, []);

	return (
		<div className='main'>
			<HeaderMain projectName={projectDetail.projectName} />
			<h3 className='text-lg font-bold'>{projectDetail.projectName}</h3>
			<div>
				{projectDetail.description &&
					HTMLReactParser(projectDetail.description)}
			</div>
			<InfoMain members={projectDetail.members} />
			<ContentMain projectDetail={projectDetail} />
		</div>
	);
};
