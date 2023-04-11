import { Button, Card, Divider, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Fade } from 'react-awesome-reveal'
import { useEffect, useRef } from 'react'
import { PersonAdd } from '@mui/icons-material'
import { useRouter } from 'next/router'

const Confirmation = () => {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const router = useRouter()

  useEffect(() => {
    import('@lottiefiles/lottie-player')
    setTimeout(() => router.push('/'), 10000)
  }, [])

  return (
    <>
      <Container sx={{ padding: '50px 0' }} maxWidth='sm'>
        <Typography
          color='white'
          fontSize='2.2rem'
          fontWeight='600'
          m='0 0 20px'
          sx={{
            background:
              'linear-gradient(to right, red, orange, yellow, green, blue, violet)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
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
            <Typography textAlign='center'>
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
                loop={true}
                autoplay
              ></lottie-player>
              <Divider flexItem orientation='vertical' />

              <Typography>
                You will receive another text when your table is ready.
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
          onClick={() => router.push('/')}
        >
          Add Me
        </Button>
      </Container>
    </>
  )
}

export default Confirmation
