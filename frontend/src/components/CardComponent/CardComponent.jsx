import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText} from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { WrapperStyleTextSell } from '../ProductDetailsComponent/style'

const CardComponent = (props) => {
    const {countInStock, desc, image,  name, price, rating, type,selled, discount} = props
    return (
        <WrapperCardStyle
            hoverable
            style={{ 
                width: 240,
                header: { width: '200px', height: '200px' }, // This line is not valid for styles
            }}
            bodystyle={{padding:'10px'}}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img 
                src={logo} 
                style={{
                    width:'68px', height:'14px', position:'absolute',  top:-1, left: -1,
                    borderTopLeftRadius: '3px'
                }}
                alt='logo'
            />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>
                    <span>{rating}</span><StarFilled style={{fontSize:'12px', color:'yellow'}}/>
                </span>
                <WrapperStyleTextSell>| Sold {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{marginRight:'8px'}}>{price}</span>
                <WrapperDiscountText>
                    {discount || 5}%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent