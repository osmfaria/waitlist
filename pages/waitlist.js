import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { PersonAdd } from '@mui/icons-material'
import { nextapi } from '../services/api'
import CustomRow from '../components/CustomRow'
import { Fade } from 'react-awesome-reveal'
import Link from 'next/link'
import NoWaitCard from '../components/NoWaitCard'
import SkeletonRow from '../components/SkeletonRow'
import TableAvatar from '../components/TableAvatar'

const Waitlist = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [tables, setTables] = useState([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    nextapi
      .get('/tables')
      .then((res) => setTables(res.data))
      .catch((_) => setIsError(true))
      .finally(() => setIsFetching(false))
  }, [])

  const handleBackdrop = useCallback(() => {
    setIsLoading((prev) => !prev)
  }, [])

  const handleSnackBar = useCallback(() => {
    setIsError((prev) => !prev)
  }, [])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key='top center'
      >
        <Alert
          onClose={handleSnackBar}
          severity='error'
          sx={{ width: '100%' }}
          variant='filled'
        >
          Something went wrong... Please speak with one of our staff
        </Alert>
      </Snackbar>

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '50px 10px 0px',
          height: '100%',
          marginBottom: '20px',
        }}
        maxWidth='sm'
      >
        <Typography
          fontSize='2.4rem'
          fontWeight='600'
          m='0 0 20px'
          color={'#e3e3e3'}
        >
          Red Umbrella Cafe
        </Typography>

        <Link href='/join' style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            startIcon={<PersonAdd />}
            type='submit'
            color='success'
            sx={{
              marginBottom: '20px',
              fontSize: '1.2rem',
              padding: '6px 60px',
            }}
            onClick={() => {
              setIsLoading(true)
            }}
          >
            Add Me
          </Button>
        </Link>

        <Card
          sx={{
            padding: '30px 30px',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <Box width={{ xs: '300px', sm: '650px' }} minHeight='400px'>
            {tables.length > 0 && (
              <Fade triggerOnce>
                <TableAvatar tables={tables}/>
              </Fade>
            )}

            {isFetching || tables.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ width: '100%' }}>
                  <TableBody>
                    {isFetching
                      ? [...Array(5)].map((_, index) => (
                          <SkeletonRow key={index} />
                        ))
                      : tables.map((table, index) => (
                          <CustomRow
                            key={index}
                            table={{ index: index + 1, ...table }}
                          />
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <NoWaitCard handleBackdrop={handleBackdrop} />
            )}
          </Box>
        </Card>
      </Container>
    </>
  )
}

export default Waitlist
