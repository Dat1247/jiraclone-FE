import React from "react";
import { useSelector } from "react-redux";
import loadingImg from "../../assets/LoadingImg/loading.gif";
import styleLoading from "./LoadingComponent.module.css";

export default function LoadingComponent(props) {
	const isLoading = useSelector((state) => state.LoadingReducer.isLoading);

	if (isLoading) {
		return (
			<div className={styleLoading.bgLoading}>
				<img src={loadingImg} alt='loading' />
			</div>
		);
	} else {
		return "";
	}
}
