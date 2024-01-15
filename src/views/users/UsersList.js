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
  CFormSelect,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
const UsersList = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filters, setFilters] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    minAge: '',
    maxAge: '',
    gender: '',
  })
  useEffect(() => {
    // Function to fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3117/dashboard/users')
        setUsers(response.data.users)
        setFilteredUsers(response.data.users)
      } catch (error) {
        console.error('Error fetching users:', error)
        // Handle error states if needed
      }
    }

    // Call the function to fetch users
    fetchUsers()
  }, []) // Run this effect only once (on component mount)
  // Update filters for Full Name input change
  const handleFullNameChange = (e) => {
    setFilters({ ...filters, fullName: e.target.value })
  }

  // Update filters for Email input change
  const handleEmailChange = (e) => {
    setFilters({ ...filters, email: e.target.value })
  }

  // Update filters for Phone Number input change
  const handlePhoneNumberChange = (e) => {
    setFilters({ ...filters, phoneNumber: e.target.value })
  }

  // Update filters for Min Age input change
  const handleMinAgeChange = (e) => {
    setFilters({ ...filters, minAge: e.target.value })
  }

  // Update filters for Max Age input change
  const handleMaxAgeChange = (e) => {
    setFilters({ ...filters, maxAge: e.target.value })
  }
  const handleGenderChange = (e) => {
    setFilters({ ...filters, gender: e.target.value })
  }
  useEffect(() => {
    filterAndSearch()
  }, [filters])
  const filterAndSearch = () => {
    let filteredData = [...users]

    // Apply filters for full name, email, phone number, age, and gender
    filteredData = filteredData.filter(
      (user) =>
        user.fullName.toLowerCase().includes(filters.fullName.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        user.phoneNumber.includes(filters.phoneNumber) &&
        (filters.minAge === '' || parseInt(user.age) >= parseInt(filters.minAge)) &&
        (filters.maxAge === '' || parseInt(user.age) <= parseInt(filters.maxAge)) &&
        (filters.gender === '' || user.gender === filters.gender),
    )

    setFilteredUsers(filteredData)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Pharma-Domi Users</strong>
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
                          placeholder="search by Full name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handleFullNameChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by Email"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handleEmailChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CInputGroup className="mb-3">
                        <CFormInput
                          placeholder="search by phone number"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          onChange={handlePhoneNumberChange}
                        />
                      </CInputGroup>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                          <div className="mt-3">min:</div>
                          <CTableHeaderCell scope="col">
                            <CInputGroup className="mb-1 ">
                              <CFormInput
                                type="number"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={handleMinAgeChange}
                                min={0}
                              />
                            </CInputGroup>
                          </CTableHeaderCell>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="mt-3"> max:</div>
                          <CTableHeaderCell scope="col">
                            <CInputGroup className="mb-1 ">
                              <CFormInput
                                type="number"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={handleMaxAgeChange}
                                min={0}
                              />
                            </CInputGroup>
                          </CTableHeaderCell>
                        </div>
                      </div>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      <CFormSelect
                        aria-label="Default select example"
                        onChange={handleGenderChange}
                      >
                        <option>filter by gender</option>
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </CFormSelect>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Age</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredUsers.map((user, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{user.fullName}</CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.phoneNumber}</CTableDataCell>
                      <CTableDataCell>{user.age}</CTableDataCell>
                      <CTableDataCell>{user.gender}</CTableDataCell>
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
