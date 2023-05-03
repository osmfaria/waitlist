import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { Fade } from 'react-awesome-reveal'
import { useEffect, useRef, useState } from 'react'
import { PersonAdd } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

const Confirmation = () => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)

  const router = useRouter()

  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleBackdrop = () => {
    setIsLoading((prev) => !prev)
  }
  const { width, height } = useWindowSize()

  useEffect(() => {
    import('@lottiefiles/lottie-player')
    setScreenWidth(width)  
    setScreenHeight(height)
    const timer = setTimeout(() => router.push('/'), 13000)

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timer)
    }
  }, [width, height])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleBackdrop}
      >
        {/* <CircularProgress color='inherit' /> */}
        <Box sx={{ background: 'white', borderRadius: '50%' }}>
          <lottie-player
            id='first-lottie'
            ref={ref4}
            src='https://assets10.lottiefiles.com/packages/lf20_gqn2n5rs.json'
            background='transparent'
            speed='1'
            style={{
              height: '230px',
              width: '230px',
              margin: '0 auto',
            }}
            loop
            autoplay
          ></lottie-player>
        </Box>
      </Backdrop>

      <Confetti width={screenWidth} height={screenHeight} recycle={false} />

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '50px 10px 0px',
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

        <Card sx={{ padding: '30px 20px' }}>
          <Fade triggerOnce>
            <Typography
              variant='h1'
              textAlign='center'
              fontSize='2.5rem'
              fontWeight='600'
              sx={{
                background:
                  'linear-gradient(to right, #3494E6 0%, #EC6EAD 50%, #3494E6)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Thank you!
            </Typography>
            <Typography textAlign='center' color='GrayText'>
              We look forward to seeing you.
            </Typography>
            <lottie-player
              id='first-lottie'
              ref={ref1}
              src='https://assets5.lottiefiles.com/packages/lf20_5y8HtRSAit.json'
              background='transparent'
              speed='1'
              style={{ height: '100px', width: '100px', margin: '0 auto' }}
              autoplay
            ></lottie-player>

            <Stack direction='row' alignItems='center' m='40px 0' spacing={2}>
              <lottie-player
                id='second-lottie'
                ref={ref2}
                src='https://assets10.lottiefiles.com/packages/lf20_SKC4P7.json'
                background='transparent'
                speed='1'
                style={{ height: '50px', width: '50px' }}
                loop
                autoplay
              ></lottie-player>
              <Divider flexItem orientation='vertical' />
              <Typography>
                Make sure you got a confirmation text that you joined the
                waitlist!
              </Typography>
            </Stack>

            <Stack direction='row' alignItems='center' m='40px 0' spacing={2}>
              <lottie-player
                id='third-lottie'
                ref={ref3}
                src='https://assets6.lottiefiles.com/temp/lf20_6Xbo3i.json'
                background='transparent'
                speed='1'
                style={{ height: '50px', width: '50px' }}
                loop
                autoplay
              ></lottie-player>
              <Divider flexItem orientation='vertical' />

              <Typography>
                You will receive a text when your table is ready.
              </Typography>
            </Stack>
          </Fade>
        </Card>

        <Button
          variant='contained'
          startIcon={<PersonAdd />}
          type='submit'
          color='success'
          sx={{ margin: '30px auto', fontSize: '1.2rem' }}
          onClick={() => {
            router.push('/')
            setIsLoading(true)
          }}
        >
          Add Me
        </Button>
      </Container>
    </>
  )
}

export default Confirmation
