import styled from"styled-components";
import {Row} from "antd";

export const WrapperHeader = styled(Row)`
    background-color: rgb(26, 146,255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    padding: 10px 0;
`
export const WrapperTextHeader = styled.span`
    front-size:18px;
    color:#fff;
    front-weight:bold;
    text-align: left;
`
export const WrapperHeaderAccount = styled.div`
    display:flex;
    align-items:center;
    color:#fff;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size:12px;
    color: #fff; 
    white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor:pointer;
    &:hover {
        color: rgb(26, 146,255);
    }
`
