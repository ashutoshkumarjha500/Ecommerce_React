import React, { useEffect, useState } from 'react'

export default function Profile() {
    let [data, setData] = useState({})

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setData(response)
        })()
    }, [])
    return (
        <>
         <h5 className='bg-primary text-center p-2 text-light'>Profile Details</h5>
            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{data.username}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{data.phone}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
