import { Col, Result, Row, Space, Tabs, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

function TranslateResult(props) {
	const { translateResult } = props;

	const { name, pronounce, usSound, ukSound, common, specialized, relate } =
		translateResult;

	const { isNotFound } = useSelector((state) => state.translate);

	const { TabPane } = Tabs;
	const { Title } = Typography;

	return (
		<div className="translate-result">
		Result
		</div>
	);
}

TranslateResult.propTypes = { translateResult: PropTypes.object };

TranslateResult.defaultProps = {
	translateResult: {},
};

export default TranslateResult;