import React, { useEffect, useRef, useState } from 'react';
import {DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons'
import { WrapperHeader } from './style';
import { Button, Form, message, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { WrapperUploadFile } from '../AdminUser/style';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import Loading from '../LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';
import { getBase64 } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';

const AdminUser =()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isPendingUpdate, setIsPendingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);

    const [stateUser, setStateUser]=useState({
        name:'',
        email:'',
        phone:'',
        isAdmin:false,
    })
    const [stateUserDetails, setStateUserDetails]=useState({
        name:'',
        Phone:'',
        desc:'',
        rating:'',
        image:'',
        Email:'',
        countInStock:''
    })

    const [form] = Form.useForm()

    const mutationUpdate = useMutationHooks(async (data) => {   
        const { id, token, ...rests } = data;
        const res = await UserService.updateUser(id, token, {...rests}); 
        return res;
    });  
    const mutationDelete = useMutationHooks(async (data) => { 
        const { id, token } = data;  // You already  // Debugging output to verify the token
        const res = await UserService.deleteUser(id, token);  // Make sure token is passed
        return res;
    });
    
    const mutation = useMutationHooks(
        (data) => {
            const {name,
                Phone,
                description,
                rating,
                image,
                Email,
                countInStock} = data
            const res =UserService.signupUser({
                name,
                Phone,
                description,
                rating,
                image,
                Email,
                countInStock})
            return res
        }
    )
    const getAllUsers = async () => {
        const res = await UserService.getAllUser()
        return res
        console.log('res',res);
        
    }

    const fetchGetDetailsUser = async (userId) => {
        try {
            const res = await UserService.getDetailsUser(userId); // Pass userId explicitly
            if (res?.data) {
                console.log("Fetched user details:", res?.data); // Debug fetched details
                setStateUserDetails({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone,
                    isAdmin: res.data.isAdmin,
                });
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
        setIsPendingUpdate(false); // Ensure loading state is updated
    };
  
    useEffect(() => {
        setStateUserDetails(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (rowSelected) {            
            setIsPendingUpdate(true);
            fetchGetDetailsUser(rowSelected); // Fetch user details based on selected ID
        }
    }, [rowSelected]);   

    const handleDetailsUser= () => {
        setIsOpenDrawer(true);
    }

    const{data,isPending,isSuccess,isError} = mutation
    const{data: dataUpdated, isPending: isPendingUpdated,isSuccess:isSuccessUpdated,isError:isErrorUpdated} = mutationUpdate
    const{data: dataDeleted, isPending: isPendingDeleted,isSuccess:isSuccessDeleted,isError:isErrorDeleted} = mutationDelete
    console.log('dataUpdated', dataUpdated);
    
    const queryUser = useQuery({queryKey: ['user'],queryFn: getAllUsers})
    const {isPending: isPendingUsers, data: users} = queryUser
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{color:'red', fontSize:'20px',cursor:'pointer'}} onClick={()=>{setIsModalOpenDelete(true)}}/>
                <EditOutlined style={{color:'blue', fontSize:'20px',cursor:'pointer'}} onClick={handleDetailsUser}/>
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
                Email="primary"
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
          title: 'Email',
          dataIndex: 'email',
          sorter: (a,b) => a.email.length - b.email.length,
          ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                  text: 'True',
                  value: true ,
                },
                {
                  text: 'False',
                  value: false ,
                },
              ],
          },
        {
          title: 'Phone',
          dataIndex: 'phone',
          sorter: (a,b) => a.phone - b.phone,
          ...getColumnSearchProps('phone'),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
      ];
      const dataTable = user?.data?.length && user.data.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
      })

    const handleCloseDrawer=()=>{
        setIsOpenDrawer(false);
        setStateUserDetails({
            name:'',
            email:'',
            phone:'',
            isAdmin: false
        })
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
    const handleDeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch();  // Refresh the user list after deletion
            },
        });
    };
    
    const handleCancel=()=>{
        setIsModalOpen(false);
        setStateUser({
            name:'',
            email:'',
            phone:'',
            isAdmin:false,
        })
        form.resetFields()
    };

    const handleOnchange=(e)=>{
        setStateUser({
            ...stateUser,
            [e.target.name]:e.target.value
        })
    }

    const handleOnchangeDetails=(e)=>{
        setStateUserDetails({
            ...stateUserDetails,
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
        setStateUser({
            ...stateUser,
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
        setStateUserDetails({
            ...stateUserDetails,
            image: file.preview
        })
    }
    console.log('user', user);
    
    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
            onSettled:()=>{
                queryUser.refetch()
            }
        })
    }

    return(
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{marginTop:'20px'}}>
            <TableComponent
                columns={columns}
                isPending={isPendingUsers}
                data={dataTable}
                onRowClick={(id) => {
                    setRowSelected(id); // Store the selected user's ID
                    console.log('Selected User ID:', id); // Log the ID for debugging
                }}
            />
            </div>
            <ModalComponent forceRender title="Tạo ngưởi dùng" open={isModalOpen}  onCancel={handleCancel} footer={null}>
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
                    onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true,message: 'Please input your name!'}]}
                    >
                        <InputComponent value='' onChange={handleOnchange} name="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUser.email} onChange={handleOnchange} name="Email"/>
                    </Form.Item>

                    {/* <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your Phone!',
                            },
                        ]}
                    >
                        <InputComponent value={stateUser.Phone} onChange={handleOnchange} name="Phone"/>
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
                            {stateUser?.image && (
                            <img src={stateUser?.image} style={{
                                height:"60px",
                                width:"60px",
                                borderRadius:"50%",
                                objectFit:"cover",
                                marginLeft:'10px'
                            }} alt="avatar"/>
                        )}
                    </WrapperUploadFile>
                    </Form.Item> */}
                    <Form.Item wrapperCol={{offset:10,span:16}}>
                    <Button Email="primary" htmlEmail="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Loading>
            </ModalComponent>
            <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
                <Loading isPending={isPendingUpdate}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 18}}
                        onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{required: true,message: 'Please input your name!'}]}
                        >
                            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name"/>
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="Email"
                            rules={[{required: true,message: 'Please input your Email!'}]}
                        >
                            <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="Email"/>
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{required: true,message: 'Please input your Phone!'}
                            ]}
                        >
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="Phone"/>
                        </Form.Item>

                        {/* <Form.Item
                            label="image"
                            name="image"
                            rules={[{required: true,message: 'Please input your image!'}]}
                        >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button>Select file</Button>
                                {stateUserDetails?.image && (
                                <img src={stateUserDetails?.image} style={{
                                    height:"60px",
                                    width:"60px",
                                    borderRadius:"50%",
                                    objectFit:"cover",
                                    marginLeft:'10px'
                                }} alt="avatar"/>
                            )}
                            </WrapperUploadFile>
                        </Form.Item> */}
                        <Form.Item wrapperCol={{offset:10,span:16}}>
                        <Button Email="primary" htmlEmail="submit">
                            Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent forceRender title="Xoá ngưởi dùng" open={isModalOpenDelete}  onCancel={handleCancelDelete} onOk = {handleDeleteUser}>
            <Loading isPending={isPendingDeleted}>
                <div>Bạn có muốn xoá ngưởi dùng này không?</div>
            </Loading>
            </ModalComponent>
        </div>
    )
}
export default AdminUser