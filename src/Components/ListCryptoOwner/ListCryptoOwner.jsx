import React, { useState, useEffect } from 'react';
import './ListCryptoOwner.css';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ListCryptoOwner = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        fetch("https://www.melivecode.com/api/auth/user", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    setUser(result.user);
                    setIsLoaded(false);
                } else if (result.status === 'forbidden') {
                    MySwal.fire({
                        title: <p>{result.message}</p>,
                        icon: 'error'
                    }).then(() => {
                        navigate("/");
                    });
                }
            })
            .catch((error) => console.error(error));
    }, [])

    const columns = [
        { field: 'id', headerName: '#', width: 120 },
        { field: 'fname', headerName: 'เหรียญ', width: 180 },
        { field: 'lname', headerName: 'ราคา', width: 180 },
        {
            field: 'email',
            headerName: 'Profit/loss',
            description: 'Profit/loss calculation for the last 24 hours',
            sortable: false,
            width: 400
        },
    ];

    const rows = [
        { id: 1, fname: 'PieCoin', lname: '0.04', email: 'naphun@konmaidee' },
        { id: 2, fname: 'TopCoin', lname: '0.60', email: 'sorasit@konmaideekwa' }
    ];
    const logout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    if (isLoaded) {
        <div>
            Load อยู่จ้า
        </div>
    }
    else {
        return (
            <div>
                <div>Hello</div>
                <div>{user.fname}</div>
                <div>{user.lname}</div>
                <div>{user.email}</div>
                <div className='datagrid'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection />
                </div>
                
                <button onClick={logout}>Logout</button>
            </div>
        )
    }
}

export default ListCryptoOwner