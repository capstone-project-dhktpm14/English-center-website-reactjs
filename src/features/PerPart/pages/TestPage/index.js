import { DoubleRightOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import Part3_4_6_7 from 'features/PerPart/components/Part3_4_6_7';
import QuestionOfPart1_2 from 'features/PerPart/components/QuestionOfPart1_2';
import QuestionOfPart5 from 'features/PerPart/components/QuestionOfPart5';
import {
  fetchQuestionsOfPart,
  restoreQuestionsDefault,
  setChoiceOfPart1_2_5,
  setChoiceOfPart3_4_6_7,
  setSelectedIndexNext,
} from 'features/PerPart/perPartSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Navigate, useParams, useRouteMatch } from 'react-router-dom';
import './style.scss';

const { Title } = Typography;

TestPage.propTypes = {};

function TestPage(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const [temp, setTemp] = useState('');

  const { examSlug, numberPart } = params;

  const { questions, selectedIndex } = useSelector((state) => state.perPart);
  const selectedQuestion = questions[selectedIndex];

  const { isChoiceOfPart1_2_5, isChoiceOfPart3_4_6_7 } = useSelector(
    (state) => state.perPart
  );

  const handleQuestionNext = () => {
    dispatch(setSelectedIndexNext());
    dispatch(setChoiceOfPart1_2_5(false));
  };

  useEffect(() => {
    document.title = ` part ${numberPart}`;
  });

  useEffect(() => {
    dispatch(fetchQuestionsOfPart({ numberPart, examSlug }));

    return () => {
      dispatch(restoreQuestionsDefault());
      console.log('test' + `${numberPart}`, examSlug);
    };
  }, []);

  return (
    <div id="test-page">
      {questions.length > 0 && selectedIndex === questions.length ? (
        <Navigate to={`${temp}finish`} />
      ) : (
        <div className="main">
          <div className="questions">
            <div style={{ marginBottom: '10px' }}>
              <Button shape="round" size="large" style={{ height: 'auto' }}>
                Câu {selectedIndex + 1}/{questions.length}.
              </Button>
            </div>

            {(numberPart === '1' || numberPart === '2') && (
              <QuestionOfPart1_2 question={selectedQuestion} />
            )}

            {numberPart === '5' && (
              <QuestionOfPart5 question={selectedQuestion} />
            )}

            {((numberPart === '3') | (numberPart === '4') ||
              numberPart === '6' ||
              numberPart === '7') && (
              <Part3_4_6_7
                questionGroup={selectedQuestion}
                numberPart={numberPart}
              />
            )}

            {(isChoiceOfPart1_2_5 || isChoiceOfPart3_4_6_7) && (
              <div className="button-next">
                <Button
                  icon={<DoubleRightOutlined />}
                  style={{ width: '100%', height: '50px' }}
                  danger
                  onClick={handleQuestionNext}
                >
                  Câu tiếp
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
