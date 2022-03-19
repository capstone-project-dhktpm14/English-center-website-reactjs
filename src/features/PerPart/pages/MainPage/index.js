import { List, Row, Typography, Col, Divider } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch,useParams } from "react-router-dom";
import "./style.scss";
import { fetchBooks } from "features/PerPart/perPartSlice";
import TestPartList from "features/PerPart/components/TestPartList";

const { Text, Title } = Typography;

MainPage.propTypes = {};

function MainPage(props) {
	const params = useParams();
	const dispatch = useDispatch();
	const { numberPart } = params;
	const { books } = useSelector((state) => state.perPart);

	useEffect(() => {
		document.title = `Đề thi part ${numberPart}`;
	});

	useEffect(() => {
		if (books.length > 0) return;
		dispatch(fetchBooks());
	}, []);

	return (
		<div id="per-part-main-page">
			<div className="main">
				<div className="logo" style={{alignItems:"left",textAlign:"left"}}>
				<img src="https://www.ets.org/rsc/img/logo/toeic.svg" alt="logo_man"></img>
				</div>
				<Title level={3}>Đề Thi Part {numberPart}</Title>
				<Divider></Divider>
				<TestPartList books={books} numberPart={numberPart} />
			</div>
		</div>
	);
}

export default MainPage;
