import styled from "styled-components"

const LabelWrapper = styled.div`
    margin: 10px 0;
`;

const LabelText = styled.h4`
    font-weight: 600;
    font-size: 16px;
    margin: 0 0 5px;
`
const LabelContent = styled.div`
    padding-left: ${({indent}) => `${indent}px`};
`

export default function Label({indent=0, children, label}) {
    return <LabelWrapper>
        <LabelText>{label}</LabelText>
        <LabelContent indent={indent}>{children}</LabelContent>
    </LabelWrapper>
}