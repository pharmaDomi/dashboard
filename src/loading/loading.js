import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

export const Loading = (loading) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      className="sweet-loading"
    >
      <HashLoader
        color="#36d7b7"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
