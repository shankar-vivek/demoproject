import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../../Components/CustomButton";

const TakeScreener = ({setIsScreener}) => {
    const onCLickTakeAssessment=()=>{
        setIsScreener(true)
    }
  return (
    <View style={{ padding: 20,backgroundColor:'white' }}>
      <Text
        style={{
          width: '100%',
          fontWeight: '400',
          fontSize: 14,
          lineHeight: 28,
        }}
      >
         You haven't completed your Screener questions yet.{"\n"}
  These questions help us personalize your experience.{"\n"}
  Please take a moment to finish the assessment.
      </Text>
      <View style={{top:'50%'}}>
      <CustomButton label="Take Assessment" onPress={onCLickTakeAssessment}/>
      </View>
    </View>
  );
};

export default TakeScreener;
