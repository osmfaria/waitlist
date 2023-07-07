import { Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import Image from 'next/image'
import nowait from '../public/nowait.svg'
import { useRouter } from 'next/router'

const NoWaitCard = ({ handleBackdrop }) => {
  const router = useRouter()

  const handleClick = () => {
    handleBackdrop()
    router.push('/join')
  }

  return (
    <Box>
      <Stack spacing={2} alignItems='center'>
        <Image src={nowait} height={240} width={320} alt='no wait' />
        <Typography fontSize='1.2rem' color='GrayText'>
          No waiting parties
        </Typography>
        <Button
          variant='outlined'
          color='success'
          onClick={handleClick}
          sx={{ padding: '6px 60px' }}
        >
          Add ME
        </Button>
      </Stack>
    </Box>
  )
}

export default NoWaitCard
