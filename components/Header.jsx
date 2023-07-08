import { keyframes } from '@emotion/react'
import { Box } from '@mui/material'
import Image from 'next/image'

function Header() {
  const gradientAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `
  return (
    <Box
      component='div'
      sx={{
        borderRadius: '50%',
        height: '100px',
        width: '100px',
        display: 'grid',
        mt: '20px',
        placeContent: 'center',
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          inset: '-0.2rem',
          background: `conic-gradient(
              from var(--gradient-angle, 0deg),
              #FA7268,
              #DE4467,
              #001220,
              #DE4467,
              #FA7268
            )`,
          borderRadius: 'inherit',
          animation: `${gradientAnimation} 7s linear infinite`,
        },
      }}
    >
      <Box
        sx={{
          height: '100px',
          width: '100px',
          background: '#fff',
          borderRadius: '50%',
          zIndex: 1,
        }}
      >
        <Image src={'/logo.png'} height={100} width={100} alt='logo' />
      </Box>
    </Box>
  )
}

export default Header
