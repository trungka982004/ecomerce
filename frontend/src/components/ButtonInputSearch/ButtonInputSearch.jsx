import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const {
        size = 40,
        placeholder,
        textButton,
        backgroundColorInput = "#fff",
        BackgroundColorButton = "rgb(13,92,182)",
        colorButton = "#fff",
        bordered = false,
        disable = false, // Add a 'disable' prop to handle the button state
    } = props;

    return (
        <div style={{ display: 'flex', background: '#fff', borderRadius: '8px' }}>
            <InputComponent 
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ background: backgroundColorInput }}
            />
            <ButtonComponent
                size={size}
                styleButton={{
                    background: disable ? '#ccc' : BackgroundColorButton, // Change background color when disabled
                    border: !bordered && 'none',
                }}
                icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
                disabled={disable} // Pass 'disable' prop to ButtonComponent
            />
            
        </div>
    );
}

export default ButtonInputSearch;
