import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, icon, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size}
            disabled={disabled}
            {...rests}
        >
            {icon && <span>{icon}</span>}
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;
