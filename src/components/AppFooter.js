import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://Pharmadomi.com.tn" target="_blank" rel="noopener noreferrer">
          Pharma-Domi
        </a>
        <span className="ms-1">&copy; 2024</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="https://www.facebook.com/profile.php?id=100008384925938"
          target="_blank"
          rel="noopener noreferrer"
        >
          Saadli Wissem
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
