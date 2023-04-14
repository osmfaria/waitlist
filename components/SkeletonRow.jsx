import { Skeleton, TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/system'


const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const SkeletonRow = () => {
  return (
    <StyledTableRow>
      <TableCell sx={{ width: 650 }}>
        <Skeleton variant='rectangular' width={'100%'} height={24} />
      </TableCell>
    </StyledTableRow>
  )
}

export default SkeletonRow
