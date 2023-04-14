import { Avatar, styled, TableCell, TableRow, Typography } from '@mui/material'
import ordinal from 'ordinal'

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const CustomRow = ({ table }) => {
  const encodedPhone = !!table.phone ? `*****${table.phone.slice(-4)}` : ''
  const ordinalNumber = ordinal(table.index)

  return (
    <StyledTableRow>
      <TableCell>
        <Avatar
          sx={{
            backgroundImage:
              'linear-gradient(to top, #f43b47 0%, #453a94 100%);',
          }}
        >
          <Typography>{ordinalNumber}</Typography>
        </Avatar>
      </TableCell>
      <TableCell>
        <Typography variant='body1'>{table.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{encodedPhone}</Typography>
      </TableCell>
    </StyledTableRow>
  )
}

export default CustomRow
