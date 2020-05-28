
import React from 'react'
import { Redirect } from 'react-router'

export default function HomePage(props) {

    //const userData = useSelector(state => getUserData(state))

    return (
        <Redirect to='/articulos' />
    )
}