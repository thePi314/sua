import { FlexContainer } from "./FlexContainer";

export function FlexColumn({
  children,
  width,
  maxWidth,
  height,
  maxHeight,
  minWidth,
  minHeight,
  flexWrap,
  justifyContent,
  alignItems,
  gap,
  flex,
  padding
}) {
  return (
    <FlexContainer
      width={width}
      maxWidth={maxWidth}
      height={height}
      maxHeight={maxHeight}
      minWidth={minWidth}
      minHeight={minHeight}
      flexWrap={flexWrap}
      flexDirection="column"
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      flex={flex}
      padding={padding}
    >
        {children}
    </FlexContainer>
  );
}
