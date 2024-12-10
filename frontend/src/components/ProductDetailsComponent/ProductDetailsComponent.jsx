import { Row, Col,Image } from 'antd';
import React from 'react';
import {StarFilled,PlusOutlined, MinusOutlined} from '@ant-design/icons'
import imageProduct from '../../assets/images/test.webp';
import imageProductSmall from '../../assets/images/imagesmall.webp';
import { WrapperAddressProduct, WrapperImageSmall, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage,WrapperStyleNameProduct, WrapperStyleTextSell } from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
//import ButtonComponent from '../ButtonComponent/ButtonComponent';
const ProductDetailsComponent = () => {
    const onChange = () => {}
    return (
        <Row style={{padding: '16px', background:'#fff', borderRadius: '4px'}}>
            <Col span={10} style={{borderRight: '1px solid #e5e5e5', paddingRight: '8px'}}>
                <Image src={imageProduct} alt="image product" preview={false}/>
                <Row style={{paddingTop: '10px', justifyContent:'space-between'}}>
                    <WrapperStyleColImage span={4}>
                        <WrapperImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperImageSmall src={imageProductSmall} alt="image small" preview={false}/>
                    </WrapperStyleColImage>
                </Row>
            </Col>
            <Col span={14} style={{paddingLeft: '10px'}}>
                <WrapperStyleNameProduct>Điều Vĩ Đại Đời Thường (Tái Bản)</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253,216,54)'}} />
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253,216,54)'}} />
                    <StarFilled style={{fontSize: '12px', color: 'rgb(253,216,54)'}} />
                    <WrapperStyleTextSell>Sold 1000+</WrapperStyleTextSell>
                </div>
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Delivered to </span>
                    <span className='address'>Q Tân Bình, P. 3, TP HCM </span>
                    <span className='change-address'>Changed Address</span>
                </WrapperAddressProduct>
                <div style={{margin:'10px 0 20px',padding:'10px 0', borderTop:'1px solid #e5e5e5', borderBottom:'1px solid #e5e5e5'}}>
                    <div style={{marginBottom:'10px'}}>Quantity</div>
                    <WrapperQualityProduct>
                        <button style={{border:'none', background:'transparent'}}>
                            <MinusOutlined style={{color:'#000', fontSize:'20px'}} size="14"/>
                        </button>
                        <WrapperInputNumber defaultValue={3} onChange={onChange} size='small'/>
                        <button style={{border:'none', background:'transparent'}}>
                            <PlusOutlined style={{color:'#000', fontSize:'20px'}} size="14"/>
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{display:'flex', alignItems: 'center', gap: '12px'}}>
                    <ButtonComponent
                        
                        size={40} 
                        styleButton={{
                            background:'rgb(255,57,69)',
                            height: '48px',
                            width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }} 
                        textButton={'Buy Now'}
                        styleTextButton={{color: '#fff', fontSize: '15px', fontWeight: '700'}}
                    ></ButtonComponent>
                    <ButtonComponent
                        
                        size={40} 
                        styleButton={{
                            background:'#fff',
                            height: '48px',
                            width: '220px',
                            border: '1px solid rgb(13,92,182)',
                            borderRadius: '4px'
                        }} 
                        textButton={'Buy Later'}
                        styleTextButton={{color: 'rgb(13,92,182)', fontSize: '15px'}}
                    ></ButtonComponent>
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailsComponent