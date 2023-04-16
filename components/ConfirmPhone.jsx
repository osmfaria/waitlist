import { Edit, LocalPhone, ThumbUpOffAlt } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { nextapi } from '../services/api'

const ConfirmPhone = ({
  handleDialog,
  isDialogOpen,
  data,
  handleSnackBar,
  handleBackdrop,
}) => {
  const router = useRouter()

  const addTable = () => {
    handleDialog()
    handleBackdrop()

    nextapi
      .post('/tablesready', data)
      .then((_) => {
        router.push('/confirmation')
      })
      .catch((_) => {
        handleBackdrop()
        handleSnackBar()
      })
  }

  return (
    <Dialog onClose={handleDialog} open={isDialogOpen} maxWidth='sm'>
      <DialogTitle>Confirm phone number</DialogTitle>
      <DialogContent>
        <Stack direction='row' spacing={1} alignItems='center'>
          <LocalPhone />
          <Divider flexItem orientation='vertical' />
          <Typography fontSize='1.2rem'>{data.phone}</Typography>
        </Stack>
      </DialogContent>
      <DialogContentText sx={{ padding: '0 20px' }}>
        Please ensure your phone number is correct as we will use it to text you
        when your table is ready.
      </DialogContentText>
      <DialogActions>
        <Button
          variant='contained'
          startIcon={<ThumbUpOffAlt />}
          color='success'
          onClick={() => addTable()}
        >
          Confirm
        </Button>

        <Button
          onClick={handleDialog}
          variant='contained'
          color='warning'
          startIcon={<Edit />}
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmPhone
