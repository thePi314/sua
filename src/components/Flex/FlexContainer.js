import styled from "styled-components";

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: ${({flexDirection}) => flexDirection ?? 'row'};
    flex-wrap: ${({flexWrap}) => flexWrap ?? 'unset'};
    gap: ${({gap}) => gap ?? 'unset'};
    
    max-width: ${({maxWidth}) => maxWidth ?? 'unset'};
    max-height: ${({maxHeight}) => maxHeight ?? 'unset'};
    min-width: ${({minWidth}) => minWidth ?? 'unset'};
    min-height: ${({minHeight}) => minHeight ?? 'unset'};

    width: ${({width}) => width ?? 'unset'};
    height: ${({height}) => height ?? 'unset'};

    justify-content: ${({justifyContent}) => justifyContent ?? 'unset'};
    align-items: ${({alignItems}) => alignItems ?? 'unset'};

    flex: ${(flex) => flex ?? 'unset'};

    box-sizing: border-box;

    padding: ${({padding}) => padding ?? 'unser'}; 
`