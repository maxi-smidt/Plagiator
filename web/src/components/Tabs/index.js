import React, { memo, useEffect, useState } from "react";
import * as S from "./styles";

const Tab = ({ children, onTabSelected }) => {
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    onTabSelected && onTabSelected(itemId);
  }, [itemId, onTabSelected]);

  return (
    <S.TabContainer>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          onClick: () => {
            const isDisabled =  child.props["disabled"] !== undefined ? child.props["disabled"] : false;
            if(isDisabled) return;
            setItemId(index);
          },
          selected: itemId === index
        });
      })}
    </S.TabContainer>
  );
};

export const TabItem = memo(({ children, ...restProps }) => (
  <S.TabItem {...restProps}>{children}</S.TabItem>
));

export default Tab;
