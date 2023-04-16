import { styled, TableCell, TableRow, Typography } from '@mui/material'
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
        <Typography>{ordinalNumber}</Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant='body1'
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '80px',
          }}
        >
          {table.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>{encodedPhone}</Typography>
      </TableCell>
    </StyledTableRow>
  )
}

export default CustomRow
