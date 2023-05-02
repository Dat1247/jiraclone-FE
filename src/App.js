import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";
import RegisterCyberbugs from "./pages/Cyberbugs/RegisterCyberbugs/RegisterCyberbugs";
import UserManagement from "./pages/Cyberbugs/UserManagement/UserManagement";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent";
import LoginCyberbug from "./pages/Cyberbugs/LoginCyberbugs/LoginCyberbug";
import UserLogInTemplate from "./templates/UserLogInTemplate";
import CyberBugsTemplate from "./templates/CyberbugsTemplate";
import CreateProject from "./pages/Cyberbugs/CreateProject/CreateProject";
import { ProjectDetail } from "./pages/Cyberbugs/ProjectDetail/ProjectDetail";
import ProjectManagement from "./pages/Cyberbugs/ProjectManagement/ProjectManagement";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_HISTORY } from "./redux/types/HistoryType";

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: ADD_HISTORY,
			history: navigate,
		});
	}, [dispatch, navigate]);

	return (
		<>
			<LoadingComponent />
			<DrawerCyberbugs />
			<Routes>
				<Route path='/' element={<CyberBugsTemplate />}>
					<Route index element={<ProjectManagement />} />
					<Route path='projectmanagement' element={<ProjectManagement />} />
					<Route path='usermanagement' element={<UserManagement />} />
					<Route path='createproject' element={<CreateProject />} />
					<Route path='projectdetail/:projectId' element={<ProjectDetail />} />
				</Route>
				<Route path='/user' element={<UserLogInTemplate />}>
					<Route path='login' element={<LoginCyberbug />} />
					<Route path='register' element={<RegisterCyberbugs />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
