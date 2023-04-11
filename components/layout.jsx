import { Box } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Box>
      <Box
        sx={{
          position: 'absolute',
          zIndex: -10,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/waves.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Box>
      {children}
    </Box>
  )
}

export default Layout
