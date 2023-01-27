import styled from "styled-components"
import { constants } from "../styling/constants"

const ButtonWrapper = styled.button`
    border: none;
    padding: 4px;
    color: ${constants.colors.WHITE};
    background: ${constants.colors.DARK_BLUE};
    font-size: 16px;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: unset;
    }
`

export default function Button({style={}, action, children, disabled=false}){
    return <ButtonWrapper  style={style} disabled={disabled} onClick={()=>{if(action) action()}}>{children}</ButtonWrapper>
}