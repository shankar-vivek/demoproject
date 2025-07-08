import React from 'react';
import {
  View,
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import CustomText from '../../Components/CustomText';
import CustomButton from '../../Components/CustomButton';
import useAppTheme from '../../CustomHooks/useAppTheme';
import { SVG } from '../../assets/svg';
import getStyles from './styles';
import CheckinScreenViewModel from './ViewModel';

const CheckinScreen = () => {
  const COLORS = useAppTheme();
  const styles = getStyles(COLORS);

  const {
    questionList,
    responses,
    handleSelectAnswer,
    handleSubmit,
    forDataDetails,
    finishedSurvey,
    previousResponse,
  } = CheckinScreenViewModel();

  const allQuestionsAnswered =
    questionList.length > 0 &&
    questionList.every(q =>
      responses.some(r => r.questionID === q['Sr. No'] && r.option !== ''),
    );

  const onSubmitPress = () => {
    if (!allQuestionsAnswered) {
      Alert.alert(
        'Incomplete',
        'Please answer all questions before submitting.',
      );
      return;
    }
    handleSubmit();
  };

  const renderQuestion = ({ item }) => {
    const selectedOption = (previousResponse || responses).find(
      res => res.questionID === item['Sr. No'],
    )?.option;

    const options = item.options.split('\n');
    const scores = item.Score.split('\n');

    return (
      <View style={styles.questionContainer}>
        <CustomText
          label={`${item['Sr. No']}. ${item.question}`}
          style={styles.questionText}
        />
        {options.map((opt, idx) => {
          const optionKey = opt.split(':')[0].trim();
          const optionText = opt.split(':')[1].trim();
          const scoreValue = scores[idx].trim();
          const isSelected = selectedOption === scoreValue;

          return (
            <TouchableOpacity
              key={`${item['Sr. No']}_${optionKey}`}
              disabled={finishedSurvey}
              onPress={() => handleSelectAnswer(item['Sr. No'], scoreValue)}
              style={styles.optionRow}
            >
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: isSelected
                      ? COLORS.Blue
                      : COLORS.selectionField,
                  },
                ]}
              >
                {isSelected && <SVG.TickIcon />}
              </View>
              <CustomText label={optionText} style={styles.optionText} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={questionList}
        keyExtractor={item => item['Sr. No'].toString()}
        renderItem={renderQuestion}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      />
      {allQuestionsAnswered && (
        <CustomButton
          label="Submit"
          onPress={() => {
            handleSubmit();
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default CheckinScreen;
