import {
  Alert,
  Backdrop,
  Badge,
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
import { PersonAdd, Group } from '@mui/icons-material'
import { nextapi } from '../services/api'
import CustomRow from '../components/CustomRow'
import { Fade } from 'react-awesome-reveal'
import Link from 'next/link'
import NoWaitCard from '../components/NoWaitCard'
import SkeletonRow from '../components/SkeletonRow'

const Waitlist = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [tables, setTables] = useState([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    nextapi
      .get('/tables')
      .then((res) => {
        setTables(res.data)
        setIsFetching(false)
      })
      .catch((_) => {
        setIsError(true)
        setIsFetching(false)
      })
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
        }}
        maxWidth='sm'
      >
        <Typography
          fontSize='2.4rem'
          fontWeight='600'
          m='0 0 20px'
          sx={{
            background:
              'linear-gradient(to right, red, orange, yellow, green, blue, violet)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Red Umbrella Cafe - Waitlist
        </Typography>

        <Link href='/' style={{ textDecoration: 'none' }}>
          <Button
            variant='contained'
            startIcon={<PersonAdd />}
            type='submit'
            color='success'
            sx={{ marginBottom: '20px', fontSize: '1.2rem' }}
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
                <Box
                  sx={{
                    borderRadius: '50%',
                    height: '70px',
                    width: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 3,
                    position: 'absolute',
                    top: '-35px',
                    right: '-35px',
                    background: 'white',
                  }}
                >
                  <Badge
                    color='success'
                    badgeContent={tables.length}
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.9rem',
                      },
                    }}
                  >
                    <Group sx={{ height: '30px', width: '30px' }} />
                  </Badge>
                </Box>
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
