import { FlexContainer } from "./FlexContainer";

export function FlexRow({
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
  gap
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
      flexDirection="row"
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
    >
      {children}
    </FlexContainer>
  );
}
