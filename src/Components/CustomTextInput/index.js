/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import useAppTheme from '../../CustomHooks/useAppTheme';
import { heightPixel,widthPixel } from '../../utils/UiUtils';
import { SVG } from '../../assets/svg';
import getStyles from './styles';
import CustomText from '../CustomText';

function CustomTextInput({
  HeaderLabel = '',
  showPassword = false,
  labelStyle = {},
  inputContainerStyle = {},
  value,
  placeholder,
  isRequired = false,
  keyboardType = 'num-pad',
  blurOnSubmit = true,
  returnKeyType = 'default',
  maxLength,
  secureTextEntry = false,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  hideFocusedBorder = false,
  inputRef,
  errorMessage,
  containerStyles = {},
  onChangeText,
  onBlur = () => {},
  onFocus = () => {},
  onPressPassWordShow = () => {},
}) {
  const COLORS = useAppTheme();
  const style = useMemo(() => getStyles(COLORS), [COLORS]);
  const handleBlur = () => {
    onBlur();
  };

  const handleFocus = () => {
    onFocus();
  };

  const EveIcon = useMemo(
    () => (showPassword ? SVG.EyeOpen : SVG.EyeClosed),
    [showPassword],
  );

  return (
    <View style={[style.container, containerStyles]}>
      {HeaderLabel && (
        <View style={{flexDirection: 'row'}}>
          <Text style={[style.label, labelStyle]}>{HeaderLabel}</Text>
          {isRequired && <Text style={[style.required]}>*</Text>}
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          ref={inputRef}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          style={[
            style.txtInput,
            inputContainerStyle,
            errorMessage ? style?.showBorder : {},
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || ''}
          placeholderTextColor={COLORS.gray}
          multiline={multiline}
          blurOnSubmit={blurOnSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={editable}
          autoCapitalize="none"
          returnKeyType={returnKeyType}
        />
        {secureTextEntry && (
          <TouchableOpacity
            hitSlop={5}
            onPress={() => onPressPassWordShow()}
            style={[style.iconStyles]}>
            {showPassword ? (
              <CustomText label='hide'/>
            ) : (
              <CustomText label='show'/>
            )}
            {/* {showPassword ? (
              <SVG.EyeOpen
                color={COLORS.gray}
                width={widthPixel(18)}
                height={heightPixel(18)}
              />
            ) : (
              <SVG.EyeClosed
                color={COLORS.gray}
                width={widthPixel(18)}
                height={heightPixel(18)}
              />
            )} */}
          </TouchableOpacity>
        )}
      </View>
      {Boolean(errorMessage) && (
        <Text style={[style.error]}>
          {errorMessage?.length ? errorMessage : 'This field is required'}
        </Text>
      )}
    </View>
  );
}

export default CustomTextInput;
