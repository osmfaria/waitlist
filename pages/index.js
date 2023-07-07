import { PersonAdd } from '@mui/icons-material'
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { nextapi } from '../services/api'
import { Fade } from 'react-awesome-reveal'
import { useRouter } from 'next/router'

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [tables, setTables] = useState([])
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setIsLoading(true)
    router.push('/join')
  }

  useEffect(() => {
    nextapi
      .get('/tables')
      .then((res) => setTables(res.data))
      .catch((_) => setIsError(true))
      .finally(() => setIsFetching(false))
  }, [])

  const handleBackdrop = () => {
    setIsLoading((prev) => !prev)
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '18vh 0',
          height: '100vh',
        }}
        onClick={handleClick}
        maxWidth='md'
      >
        <Fade triggerOnce cascade>
          <Typography
            fontSize={{ xs: '1.5rem', sm: '2.8rem', md: '3.8rem' }}
            fontWeight='600'
            m='0 0 20px'
            color={'#e3e3e3'}
          >
            Tap here to Join our Waitlist
            <Box component='span' color='#F16367'>
              !
            </Box>
          </Typography>
          <Button
            variant='contained'
            startIcon={<PersonAdd />}
            type='submit'
            color='success'
            sx={{ margin: '0 auto', fontSize: '1.2rem', padding: '6px 60px' }}
          >
            Join waitlist
          </Button>

          {tables.length > 0 && (
            <Stack direction='row' gap={1} alignSelf='center' mt='100px' alignItems='center'>
              <Typography
                fontSize={{ xs: '1rem', md: '1.4rem' }}
                fontWeight='500'
                color={'#B2BEB5'}
              >
                {tables.length > 1 ? 'There are' : 'There is'} currently
              </Typography>

              <Avatar
                variant='rounded'
                sx={{
                  background: 'linear-gradient(to right, #F16367, #D23467)',
                }}
              >
                {tables.length}
              </Avatar>
              <Typography
                fontSize={{ xs: '1rem', md: '1.4rem' }}
                fontWeight='500'
                color={'#B2BEB5'}
              >
                {tables.length > 1 ? 'tables' : 'table'} on the waitlist.
              </Typography>
            </Stack>
          )}
        </Fade>
      </Container>
    </>
  )
}

export default Landing
