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
const UsersList = () => {
  const [pharmacies, setPharmacies] = useState([])
  const [filteredPharmacies, setFilteredPharmacies] = useState([])
  const [filters, setFilters] = useState({
    name: '',
    owner: '',
    phone: '',
  })
  useEffect(() => {
    // Function to fetch users
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('http://localhost:3117/pharmacies')
        setPharmacies(response.data)
        setFilteredPharmacies(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
        // Handle error states if needed
      }
    }

    // Call the function to fetch users
    fetchPharmacies()
  }, []) // Run this effect only once (on component mount)
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

  useEffect(() => {
    filterAndSearch()
  }, [filters])

  const filterAndSearch = () => {
    let filteredData = [...pharmacies]

    // Apply filters for name, owner, and phone number
    filteredData = filteredData.filter(
      (pharmacy) =>
        pharmacy.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        pharmacy.owner.toLowerCase().includes(filters.owner.toLowerCase()) &&
        pharmacy.phone?.includes(filters.phone),
    )

    setFilteredPharmacies(filteredData)
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
                      <CTableDataCell>Actions...</CTableDataCell>
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
