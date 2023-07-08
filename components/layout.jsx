import { Box, Container } from '@mui/material'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(/waves.svg)',
        backgroundSize: 'cover',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth='md'>
        <Header />
        {children}
      </Container>
    </Box>
  )
}

export default Layout
