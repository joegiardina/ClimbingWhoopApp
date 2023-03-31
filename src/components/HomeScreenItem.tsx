import React from "react";
import { radii, spacing } from "../../style";
import View from "./View";
import Text from "./Text";

const HomeScreenItem = ({children}) => {
  return (
    <View container style={{marginBottom: spacing.normal}}>
      {children}
    </View>
  );
};

export default HomeScreenItem;