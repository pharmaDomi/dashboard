import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { baseUrl } from 'src/helpers/BaseUrl'
import { getToken } from 'src/helpers/RetriveToken'
const UsersList = () => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dq4bfwxbx',
    },
  })

  const [filteredPharmacies, setFilteredPharmacies] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    owner: '',
    phone: '',
  })
  // Function to fetch users
  const fetchPharmacies = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/pharmacies`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Content-Type-Options': 'nosniff',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'no-referrer',
          'Cache-Control': 'no-store',
        },
      })

      setFilteredPharmacies(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      // Handle error states if needed
    }
  }
  const token = getToken()
  useEffect(() => {
    // Call the function to fetch users
    fetchPharmacies(token)
  }, [token]) // Run this effect only once (on component mount)
  // Update filters for Full Name input change
  const handleNameChange = (e) => {
    setFilters({ ...filters, name: e.target.value })
  }

  // Update filters for Email input change
  const handleOwnerChange = (e) => {
    setFilters({ ...filters, owner: e.target.value })
  }
  const handlePhoneChange = (e) => {
    setFilters({ ...filters, phone: e.target.value })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Pharma-Domi Pharmacies</strong>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by Pharmacy name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handleNameChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by owner name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handleOwnerChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>

                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by phone number"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handlePhoneChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>

                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col"> Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
                    <CTableHeaderCell scope="col">phone number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredPharmacies?.map((pharmacy, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{pharmacy.name}</CTableDataCell>
                      <CTableDataCell>{pharmacy.owner}</CTableDataCell>
                      <CTableDataCell>{pharmacy.phone}</CTableDataCell>
                      <CTableDataCell>
                        {pharmacy.latitude}, {pharmacy.longitude}
                      </CTableDataCell>
                      <CTableDataCell>
                        <AdvancedImage
                          style={{ width: '10%', height: '10%' }}
                          cldImg={cloudinary.image(pharmacy.image)}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default UsersList
