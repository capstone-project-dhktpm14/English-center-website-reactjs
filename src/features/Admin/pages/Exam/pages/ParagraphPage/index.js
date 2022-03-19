import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import NotFoundPage from "components/NotFoundPage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ParagraphDetailModal from "../../components/ParagraphDetailModal";
import ParagraphModal from "../../components/ParagraphModal";
import ParagraphTable from "../../components/ParagraphTable";
import { fetchQuestions } from "../../examSlice";
import { useQuery } from "../../hooks";
import { paragraphValues } from "../../initialAndValidateValues";

ParagraphPage.propTypes = {};

function ParagraphPage(props) {
	const query = useQuery();
	const dispatch = useDispatch();
	const history = useNavigate();

	const { questions } = useSelector((state) => state.exam);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [initialValue, setInitialValue] = useState(paragraphValues.initial);
	const [isDetailViewMode, setIsDetailViewMode] = useState(false);

	const examId = +query.get("examId");
	const type = +query.get("part");

	//chuyển hướng trang
	useEffect(() => {
		if (typeof examId === "number" && typeof type === "number") {
			if (type < 1) {
				history(`/admin/exams/questions?examId=${examId}&part=1`);
			} else if (type > 7) {
				history(`/admin/exams/paragraphs?examId=${examId}&part=7`);
				dispatch(fetchQuestions({ examId, type: 7 }));
			} else {
				if (![1, 2, 5].includes(type)) {
					dispatch(fetchQuestions({ examId, type }));
				} else {
					history(`/admin/exams/questions?examId=${examId}&part=${type}`);
				}
			}
		}
	}, []);
	return examId && type ? (
		<div>
			<Divider orientation="left">
				<Title level={3}>{`Part ${query.get("part")}`} ParagraphPage</Title>
			</Divider>
			<ParagraphTable
				paragraphs={questions}
				setInitialValue={setInitialValue}
				setIsModalVisible={setIsModalVisible}
				setIsDetailViewMode={setIsDetailViewMode}
				part={type}
				examId={examId}
			/>

			{isModalVisible && (
				<ParagraphModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					initialValue={initialValue}
				/>
			)}

			{isDetailViewMode && (
				<ParagraphDetailModal
					isDetailViewMode={isDetailViewMode}
					setIsDetailViewMode={setIsDetailViewMode}
					paragraph={initialValue}
				/>
			)}
		</div>
	) : (
		<NotFoundPage />
	);
}

export default ParagraphPage;
