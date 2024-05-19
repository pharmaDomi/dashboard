import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import axios from 'axios'
import { baseUrl } from 'src/helpers/BaseUrl'
import { getToken } from 'src/helpers/RetriveToken'

const WidgetsDropdown = () => {
  const token = getToken()

  const [users, setUsers] = useState([])
  const [pharmacies, setPharmacies] = useState([])
  //get user by month
  const [userByMonth, setUsersByMonth] = useState([])

  // Function to fetch users
  const fetchUsers = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/dashboard/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Specify the content type
          Accept: 'application/json', // Specify the accepted response type
          'X-Content-Type-Options': 'nosniff', // Prevent MIME-sniffing
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', // Enforce HTTPS
          'X-Frame-Options': 'DENY', // Prevent clickjacking
          'X-XSS-Protection': '1; mode=block', // Enable XSS protection
          'Referrer-Policy': 'no-referrer', // Control referrer information
          'Cache-Control': 'no-store', // Prevent caching of sensitive data
        },
      })

      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      // Handle error states if needed
    }
  }

  //fetch pharmacies
  const fetchPharmacies = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/pharmacies`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          'Content-Type': 'application/json', // Specify the content type
          'X-Content-Type-Options': 'nosniff', // Prevent MIME-sniffing
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', // Enforce HTTPS
          'X-Frame-Options': 'DENY', // Prevent clickjacking
          'X-XSS-Protection': '1; mode=block', // Enable XSS protection
          'Referrer-Policy': 'no-referrer', // Control referrer information
          'Cache-Control': 'no-store', // Prevent caching of sensitive data
        },
      })

      setPharmacies(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching Pharmacies:', error)
      // Handle error states if needed
    }
  }
  const fetchUsersByMonth = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/dashboard/users-by-month`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json', // Specify the content type
          Accept: 'application/json', // Specify the accepted response type
          'X-Content-Type-Options': 'nosniff', // Prevent MIME-sniffing
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', // Enforce HTTPS
          'X-Frame-Options': 'DENY', // Prevent clickjacking
          'X-XSS-Protection': '1; mode=block', // Enable XSS protection
          'Referrer-Policy': 'no-referrer', // Control referrer information
          'Cache-Control': 'no-store', // Prevent caching of sensitive data
        },
      })

      setUsersByMonth(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching users by month:', error)
      // Handle error states if needed
    }
  }

  useEffect(() => {
    fetchUsers(token)
    fetchPharmacies(token)
    fetchUsersByMonth(token)
  }, [token])

  console.log(users)

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {users.length}{' '}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Users"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'augest',
                  'september',
                  'october',
                  'november',
                  'december',
                ],
                datasets: [
                  {
                    label: 'number of users',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: userByMonth,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              6.200 TND{' '}
              <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Income"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Incomes for this month',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              2.49{' '}
              <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Number of deliveries / pharmacy"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: pharmacies.map((pharmacy) => pharmacy.name),
                datasets: [
                  {
                    label: 'Number of deliveries',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: pharmacies.map((pharmacy, index) => pharmacy.deliveries.length),
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              Total of deliveries{' '}
              <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Number of deliveries / pharmacy"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                  'pharmacie 1 ',
                ],
                datasets: [
                  {
                    label: 'deliveries',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
