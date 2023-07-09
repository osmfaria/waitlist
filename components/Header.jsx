import { keyframes } from '@emotion/react'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const gradientAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
function Header() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

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
        cursor: 'pointer',
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
          animation: `${gradientAnimation} 4s linear infinite`,
        },
      }}
      onClick={handleClick}
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
        <Image
          src={'/logo.png'}
          height={100}
          width={100}
          alt='logo'
          loading='lazy'
        />
      </Box>
    </Box>
  )
}

export default Header
