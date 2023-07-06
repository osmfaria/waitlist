import { Box, Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import nowait from '../public/nowait.svg'

const NoWaitCard = ({ handleBackdrop }) => {
  return (
    <Box>
      <Stack spacing={2} alignItems='center'>
        <Image src={nowait} height={240} width={320} alt='no wait' />
        <Typography fontSize='1.2rem' color='GrayText'>
          No waiting parties
        </Typography>
        <Link href='/join' style={{ textDecoration: 'none' }}>
          <Button variant='outlined' color='success' onClick={handleBackdrop}>
            Add yourself
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default NoWaitCard
