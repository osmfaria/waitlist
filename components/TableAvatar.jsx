import { Group } from '@mui/icons-material'
import { Badge, Box } from '@mui/material'

const TableAvatar = ({tables}) => {
  return (
    <Box
      sx={{
        borderRadius: '50%',
        height: '70px',
        width: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3,
        position: 'absolute',
        top: '-35px',
        right: '-35px',
        background: 'white',
      }}
    >
      <Badge
        color='success'
        badgeContent={tables.length}
        sx={{
          '& .MuiBadge-badge': {
            fontSize: '0.9rem',
          },
        }}
      >
        <Group sx={{ height: '30px', width: '30px' }} />
      </Badge>
    </Box>
  )
}

export default TableAvatar
