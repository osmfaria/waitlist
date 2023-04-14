import { Box } from '@mui/material'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(/waves.svg)',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
  )
}

export default Layout
