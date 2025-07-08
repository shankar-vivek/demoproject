import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CheckInAPI from '../../services/APIs/CheckinAPI';

const CheckinScreenViewModel = () => {
  const navigation = useNavigation();
  const [responses, setResponses] = useState([]);
  const [forDataDetails] = useState({ Type: 'EPDS US', Week: 0 }); // dummy default
  const [finishedSurvey] = useState(false);
  const [previousResponse] = useState(null);

  const questionList = [
    {
      'Sr. No': 1,
      question: 'How are you feeling today?',
      options: 'A:Very Good\nB:Good\nC:Okay\nD:Bad',
      Score: '3\n2\n1\n0',
    },
    {
      'Sr. No': 2,
      question: 'Do you feel anxious recently?',
      options: 'A:Not at all\nB:Sometimes\nC:Often\nD:Always',
      Score: '0\n1\n2\n3',
    },
    {
      'Sr. No': 3,
      question: 'Are you having trouble sleeping?',
      options: 'A:Never\nB:Rarely\nC:Sometimes\nD:Often',
      Score: '0\n1\n2\n3',
    },
    {
      'Sr. No': 4,
      question: 'Do you find pleasure in your daily activities?',
      options: 'A:Always\nB:Often\nC:Rarely\nD:Never',
      Score: '3\n2\n1\n0',
    },
    {
      'Sr. No': 5,
      question: 'Do you feel supported by your family/friends?',
      options: 'A:Always\nB:Often\nC:Sometimes\nD:Never',
      Score: '3\n2\n1\n0',
    },
  ];

  const handleSelectAnswer = useCallback((questionID, scoreValue) => {
    setResponses(prev => {
      const existingIndex = prev?.findIndex(
        res => res.questionID === questionID,
      );
      const updatedResponse = { questionID, option: scoreValue };

      if (existingIndex !== -1) {
        const newResponses = [...prev];
        newResponses[existingIndex] = updatedResponse;
        return newResponses;
      } else {
        return [...prev, updatedResponse];
      }
    });
  }, []);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmit = () => {
    const submission = {
      currentDate: new Date(),
      questionnarie: responses,
    };

    CheckInAPI.QuestionaryApi({ submission }, () => {});
    navigation.goBack();
  };

  return {
    questionList,
    responses,
    handleSelectAnswer,
    onPressBack,
    handleSubmit,
    forDataDetails,
    finishedSurvey,
    previousResponse,
  };
};

export default CheckinScreenViewModel;
