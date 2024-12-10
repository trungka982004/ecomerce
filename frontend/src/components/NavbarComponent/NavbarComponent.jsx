import { Checkbox, Rate } from "antd";
import React from "react";
import {WrapperLableText, WrapperTextValue, WrapperContext, WrapperTextPrice} from './style'

const NavbarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text': 
                return options.map((option) => {
                        return (
                            <WrapperTextValue>{option}</WrapperTextValue>
                        )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display:'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}> 
                        {options.map((option) => {
                            return (
                                <Checkbox style={{margin: 0}} value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{display:'flex', gap: '4px'}}>
                            <Rate style={{fontSize: '12px' }}disabled defaultValue={option} />
                            <span>{`from ${option} star`}</span>
                        </div>
                    )
                })  
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })  
            default: 
                return {}
        }
    }
    
    return (
        <div>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContext>
                {renderContent('text', ['Case may tinh', 'RAM', 'Graphic Card'])}
            </WrapperContext>
        </div>
    )
}

export default NavbarComponent