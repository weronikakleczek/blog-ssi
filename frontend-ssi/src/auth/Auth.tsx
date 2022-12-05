import axios from 'axios'
import React from 'react'
import authHeader from './AuthHeader'

const getLoggedInUser = () => {
    axios.get(`http://localhost:9000/auth/`, { headers: authHeader() })
}

export default {
    getLoggedInUser
}