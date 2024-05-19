// src/components/ProtectedRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? element : <Navigate to="/login" />
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
}

export default ProtectedRoute
