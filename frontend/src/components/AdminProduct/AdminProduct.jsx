import { Button, Form, Modal, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { createProduct, updateProduct,deleteProduct } from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../../components/Message/Message'
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct =()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    console.log("road",rowSelected)
    const [stateProduct, setStateProduct]=useState({
        name:'',
        price:'',
        desc:'',
        rating:'',
        image:'',
        type:'',
        countInStock:''
    })
    const [stateProductDetails, setStateProductDetails]=useState({
        name:'',
        price:'',
        desc:'',
        rating:'',
        image:'',
        type:'',
        countInStock:''
    })

    const [form] = Form.useForm()

    const mutationUpdate = useMutationHooks(async (data) => {   
        const { id, token, ...rests } = data;
        const res = await updateProduct(id, token, {...rests}); 
        return res;
    });  
    const mutationDelete = useMutationHooks(async (data) => { 
        const { id, token } = data;  // You already  // Debugging output to verify the token
        const res = await deleteProduct(id, token);  // Make sure token is passed
        return res;
    });
    
    const mutation = useMutationHooks(
        (data) => {
        const {name,
            price,
            description,
            rating,
            image,
            type,
            countInStock} = data
        const res =createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock})
        return res
    })
    const getAllproducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async (productId) => {
        try {
            const res = await ProductService.getDetailsProduct(productId); // Pass productId explicitly
            if (res?.data) {
                console.log("Fetched product details:", res?.data); // Debug fetched details
                setStateProductDetails({
                    name: res.data.name,
                    price: res.data.price,
                    desc: res.data.desc,
                    rating: res.data.rating,
                    image: res.data.image,
                    type: res.data.type,
                    countInStock: res.data.countInStock
                });
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
        setIsPendingUpdate(false); // Ensure loading state is updated
    };
  
    useEffect(() => {
        setStateProductDetails(stateProductDetails)
    }, [form, stateProductDetails])

    useEffect(() => {
        if (rowSelected) {            
            setIsPendingUpdate(true);
            fetchGetDetailsProduct(rowSelected); // Fetch product details based on selected ID
        }
    }, [rowSelected]);   

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true);
    }

    const{data,isPending,isSuccess,isError} = mutation
    const{data: dataUpdated,isPending:isPendingUpdated,isSuccess:isSuccessUpdated,isError:isErrorUpdated} = mutationUpdate
    const{data: dataDeleted,isPending:isPendingDeleted,isSuccess:isSuccessDeleted,isError:isErrorDeleted} = mutationDelete
    console.log('dataUpdated', dataUpdated);
    
    const queryProduct = useQuery({queryKey: ['products'],queryFn: getAllproducts})
    const {isPending: isPendingProducts, data: products} = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{color:'red', fontSize:'20px',cursor:'pointer'}} onClick={()=>{setIsModalOpenDelete(true)}}/>
                <EditOutlined style={{color:'blue', fontSize:'20px',cursor:'pointer'}} onClick={handleDetailsProduct}/>
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        //setSearchText(selectedKeys[0]);
        //setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        //setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: (a,b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name')
        },
        {
          title: 'Price',
          dataIndex: 'price',
          sorter: (a,b) => a.price - b.price,
          filters: [
            {
              text: '>= 50',
              value: '>=',
            },
            {
              text: '<= 50',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            if(value === '>=') {
                return record.price >= 50
            }
            return record.price <= 50
          }
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          sorter: (a,b) => a.rating - b.rating,
          filters: [
            {
              text: '>= 3.0',
              value: '>=',
            },
            {
              text: '<= 3.0',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            if(value === '>=') {
                return Number(record.rating) >= 3.0
            }
            return Number(record.rating) <= 3.0
          }

        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
      ];
      const dataTable = products?.data?.length
      ? products.data.map((product) => ({ ...product, key: product._id }))
      : [];
 
    useEffect(()=>{
        if(isSuccess && data?.status === 'OK'){
            message.success()
            handleCancel()
        }else if (isError){
            message.error()
        }
    },[isSuccess])

    const handleCloseDrawer=()=>{
        setIsOpenDrawer(false);
        setStateProductDetails(
            {
                name:'',
                price:'',
                description:'',
                rating:'',
                image:'',
                type:'',
                countInStock:''
            }
        )
    };

    useEffect(()=>{
        if(isSuccessUpdated && dataUpdated?.status === 'OK'){
            message.success()
            handleCloseDrawer()
        }else if (isErrorUpdated){
            message.error()
        }
    },[isSuccessUpdated, dataUpdated, isErrorUpdated])

    useEffect(()=>{
        if(isSuccessDeleted && dataDeleted?.status === 'OK'){
            message.success()
            handleCancelDelete()
        }else if (isErrorDeleted){
            message.error()
        }
    },[isSuccessDeleted])

    const handleCancelDelete = () =>{
        setIsModalOpenDelete(false)
    }
    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch();  // Refresh the product list after deletion
            },
        });
    };
    

    const handleCancel=()=>{
        setIsModalOpen(false);
        setStateProduct(
            {
                name:'',
                price:'',
                description:'',
                rating:'',
                image:'',
                type:'',
                countInStock:''
            }
        )
    };
    const onFinish=()=>{
        mutation.mutate(stateProduct, {
            onSettled:()=>{
                queryProduct.refetch()
            }
        })
    } 

    const handleOnchange=(e)=>{
        setStateProduct({
            ...stateProduct,
            [e.target.name]:e.target.value
        })
    }

    const handleOnchangeDetails=(e)=>{
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]:e.target.value
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList?.[0];
        if (!file) {
          console.error("No file selected.");
          return;
        }
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList?.[0];
        if (!file) {
          console.error("No file selected.");
          return;
        }
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    console.log('user', user);
    
    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
            onSettled:()=>{
                queryProduct.refetch()
            }
        })
    }
    
    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
                <Button style={{height:'150px', width:'150px',borderRadius:'6px', borderStyle:'dashed'}} onClick={()=>setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}}></PlusOutlined></Button>
            </div>
            <div style={{marginTop:'20px'}}>
            <TableComponent
                columns={columns}
                isPending={isPendingProducts}
                data={dataTable}
                onRowClick={(id) => {
                    setRowSelected(id); // Store the selected product's ID
                    console.log('Selected Product ID:', id); // Log the ID for debugging
                }}
            />
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel} footer={null}>
            <Loading isPending={isPendingUpdated}>
                <Form
                    name="basic"
                    labelCol={{
                    span: 6,
                    }}
                    wrapperCol={{
                    span: 18,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your name!',
                            },
                        ]}
                    >
                        <InputComponent value='' onChange={handleOnchange} name="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your type!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type"/>
                    </Form.Item>

                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your inStock!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock"/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"/>
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="Rating"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your rating!',
                            },
                        ]}
                    >
                            <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"/>
                    </Form.Item>
                    <Form.Item
                        label="description"
                        name="description"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your description!',
                            },
                        ]}
                    >
                    <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description"/>
                    </Form.Item>
                    <Form.Item
                        label="image"
                        name="image"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your image!',
                            },
                        ]}
                    >
                    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                        <Button>Select file</Button>
                            {stateProduct?.image && (
                            <img src={stateProduct?.image} style={{
                                height:"60px",
                                width:"60px",
                                borderRadius:"50%",
                                objectFit:"cover",
                                marginLeft:'10px'
                            }} alt="avatar"/>
                        )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:10,span:16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Loading>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
                <Loading isPending={isPendingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 18}}
                        onFinish={onUpdateProduct}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="Name"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name"/>
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="Type"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your type!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type"/>
                        </Form.Item>

                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your inStock!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails} name="countInStock"/>
                        </Form.Item>

                        <Form.Item
                            label="price"
                            name="price"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price"/>
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="Rating"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your rating!',
                                },
                            ]}
                        >
                                <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating"/>
                        </Form.Item>
                        <Form.Item
                            label="description"
                            name="description"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your description!',
                                },
                            ]}
                        >
                        <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description"/>
                        </Form.Item>
                        <Form.Item
                            label="image"
                            name="image"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your image!',
                                },
                            ]}
                        >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button>Select file</Button>
                                {stateProductDetails?.image && (
                                <img src={stateProductDetails?.image} style={{
                                    height:"60px",
                                    width:"60px",
                                    borderRadius:"50%",
                                    objectFit:"cover",
                                    marginLeft:'10px'
                                }} alt="avatar"/>
                            )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset:10,span:16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xoá sản phẩm" open={isModalOpenDelete}  onCancel={handleCancelDelete} onOk = {handleDeleteProduct}>
            <Loading isPending={isPendingDeleted}>
                <div>Bạn có muốn xoá sản phẩm này không?</div>
            </Loading>
            </ModalComponent>
        </div>
    )
}
export default AdminProduct