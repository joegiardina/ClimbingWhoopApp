import React from 'react';
import {Modal as RNModal, View, Pressable} from 'react-native';
import {ModalProps as RNModalProps} from 'react-native';
import {useThemeContext} from '../contexts/themeContext';

interface ModalProps extends RNModalProps {
  setVisible: Function;
}

const Modal: React.FC<ModalProps> = ({children, setVisible, ...props}) => {
  const {themeContext} = useThemeContext();
  const {colors, spacing} = themeContext;
  const {textColor, backgroundColor} = colors;
  return (
    <RNModal transparent {...props}>
      <Pressable
        onPress={() => setVisible(false)}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor,
            borderColor: textColor,
            borderWidth: 1,
            padding: spacing.normal,
            width: '100%',
            margin: spacing.large,
          }}>
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
};

export default Modal;
