import {
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Divider,
} from '@mui/material'
import {
  Person,
  PersonAdd,
  Groups,
  LocalPhone,
  Clear,
  Visibility,
} from '@mui/icons-material'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import {
  parsePhoneNumber,
  findNumbers,
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
} from 'libphonenumber-js'
import { useState } from 'react'
import { formatLocalNumber } from '../utils/functions'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import ConfirmPhone from '../components/ConfirmPhone'
import { Fade } from 'react-awesome-reveal'
import { useRouter } from 'next/router'

const poppins = Poppins({ weight: '500', subsets: ['latin'] })

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [data, setData] = useState({})
  const [isSharable, setIsSharable] = useState(false)
  const [partySize, setPartySize] = useState(0)
  const router = useRouter()

  const handleBackdrop = () => {
    setIsLoading((prev) => !prev)
  }

  const handleSnackBar = () => {
    setIsError((prev) => !prev)
  }

  const handleDialog = () => {
    setIsDialogOpen((prev) => !prev)
  }

  const handleClick = () => {
    setIsLoading(true)
    router.push('/waitlist')
  }

  const initialValues = {
    name: '',
    size: '',
    phone: '',
    sharedTable: '',
    sittingPreference: '',
  }

  const validationSchema = yup.object({
    name: yup.string().required().max(25).min(2),
    size: yup
      .number()
      .max(
        6,
        'To accommodate groups larger than 6, kindly speak with one of our servers.'
      )
      .min(1)
      .required(),
    phone: yup.string().required(),
    sharedTable: yup.string(),
    sittingPreference: yup.string().required('please select an option'),
  })

  const handlePhoneInput = (event, formik) => {
    const input = event.target.value

    const nationalPhone = formatLocalNumber(input)
    const internationalPhone = formatIncompletePhoneNumber(input)
    const parsedNationalPhone = findNumbers(nationalPhone)

    if (
      parsedNationalPhone.length > 0 &&
      (parsedNationalPhone[0].country === 'CA' ||
        parsedNationalPhone[0].country === 'US')
    ) {
      const numberObj = parsePhoneNumber(nationalPhone)
      const formattedNationalPhone = numberObj.format('NATIONAL', {
        nationalPrefix: false,
      })
      formik.setFieldValue('phone', formattedNationalPhone)
    } else {
      formik.setFieldValue('phone', internationalPhone)
    }
  }

  const validatePhone = (input) => {
    let errorMessage
    const updatedphone = formatLocalNumber(input)
    const isValidNumber = isValidPhoneNumber(updatedphone)
    if (!isValidNumber) {
      errorMessage = 'invalid phone number'
    }

    return errorMessage
  }

  const handleClear = (formik) => {
    formik.resetForm()
  }

  const onSubmit = (userInput) => {
    // Empty string or "Shared"
    const sharedTableData =
      userInput.sharedTable === 'Shared' ? userInput.sharedTable : ''

    // Empty string, "Patio" or "Both"
    const sittingPreferenceData =
      userInput.sittingPreference !== 'Inside'
        ? userInput.sittingPreference
        : ''

    // Build note
    const noteData =
      sharedTableData && sittingPreferenceData
        ? `${sharedTableData} | ${sittingPreferenceData}`
        : sharedTableData + sittingPreferenceData

    const inputData = {
      name: userInput.name,
      size: userInput.size,
      phone: userInput.phone,
      note: noteData,
    }

    // State will be passed as a prop to confirmPhone modal
    setData(inputData)

    // Open modal to confirm phone number
    handleDialog()
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleBackdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key='top center'
      >
        <Alert
          onClose={handleSnackBar}
          severity='error'
          sx={{ width: '100%' }}
          variant='filled'
        >
          Something went wrong... Please speak with one of our staff
        </Alert>
      </Snackbar>

      <ConfirmPhone
        handleDialog={handleDialog}
        isDialogOpen={isDialogOpen}
        data={data}
        handleSnackBar={handleSnackBar}
        handleBackdrop={handleBackdrop}
      />

      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '50px 10px 0px',
        }}
        maxWidth='sm'
      >
        <Typography
          fontSize='2.4rem'
          fontWeight='600'
          m='0 0 20px'
          color={'#e3e3e3'}
        >
          Red Umbrella Cafe
        </Typography>

        <Button
          variant='contained'
          startIcon={<Visibility />}
          type='submit'
          sx={{
            marginBottom: '20px',
            fontSize: '1.2rem',
            background: 'linear-gradient(to right, #F16367, #D23467)',
          }}
          onClick={handleClick}
        >
          Show Waitlist
        </Button>

        <Card
          sx={{
            padding: '40px 30px',
            boxShadow: 3,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Stack spacing={3}>
                  <Stack direction='row' spacing={3} width='100%'>
                    <TextField
                      sx={{ flexGrow: 1 }}
                      label='Name'
                      name='name'
                      autoComplete='off'
                      error={formik.touched.name && !!formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                      {...formik.getFieldProps('name')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      sx={{ flexGrow: 1 }}
                      label='Party size'
                      name='size'
                      type='number'
                      autoComplete='off'
                      {...formik.getFieldProps('size')}
                      onChange={(e) => {
                        setPartySize(e.target.value)
                        formik.setFieldValue('size', e.target.value)
                      }}
                      error={formik.touched.size && !!formik.errors.size}
                      helperText={formik.touched.size && formik.errors.size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Groups />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                  <FormControl>
                    <Field name='phone' validate={validatePhone}>
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label='Phone number'
                          autoComplete='off'
                          onChange={(event) => handlePhoneInput(event, formik)}
                          error={!!meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <LocalPhone />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                    <FormHelperText>
                      When adding an international phone number, please include
                      the country code preceded by a plus sign (e.g., +55, +44,
                      ...)
                    </FormHelperText>
                  </FormControl>

                  <Divider />

                  <Field name='sittingPreference'>
                    {({ field }) => (
                      <FormControl
                        error={
                          formik.touched.sittingPreference &&
                          !!formik.errors.sittingPreference
                        }
                        onChange={(e) => {
                          // Set the state that will control if sharaed table input will be visible
                          if (e.target.value !== 'Patio') setIsSharable(true)
                          else setIsSharable(false)
                        }}
                      >
                        <FormLabel id='buttons-group-label'>
                          Sitting preference
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby='buttons-group-label'
                          name='buttons-group'
                          {...field}
                        >
                          <FormControlLabel
                            value='Inside'
                            control={<Radio />}
                            label='Inside'
                          />
                          <FormControlLabel
                            value='Patio'
                            control={<Radio />}
                            label='Patio'
                          />
                          <FormControlLabel
                            value='Both'
                            control={<Radio />}
                            label='Either is fine'
                          />
                        </RadioGroup>
                        <FormHelperText>
                          {formik.touched.sittingPreference &&
                            formik.errors.sittingPreference && (
                              <Typography variant='caption' color='error'>
                                {formik.errors.sittingPreference}
                              </Typography>
                            )}
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>

                  {isSharable && partySize < 3 && (
                    <Fade>
                      <FormControl>
                        <InputLabel id='select-label'>Shared table</InputLabel>
                        <Select
                          value={formik.values.sharedTable}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.sharedTable &&
                            !!formik.errors.sharedTable
                          }
                          labelId='select-label'
                          id='select'
                          name='sharedTable'
                          label='Shared table'
                        >
                          <MenuItem value={'Own Table'}>
                            NO, I would like my own table
                          </MenuItem>
                          <MenuItem value={'Shared'}>
                            YES, either is fine
                          </MenuItem>
                        </Select>
                        <FormHelperText>
                          {formik.touched.sharedTable &&
                            formik.errors.sharedTable && (
                              <Typography variant='caption' color='error'>
                                {formik.errors.sharedTable}
                                <br />
                              </Typography>
                            )}
                          Sharing a table with others can result in a shorter
                          wait time. <br /> *Please note that the shared tables
                          are large tables located in the center of the
                          restaurant.
                        </FormHelperText>
                      </FormControl>
                    </Fade>
                  )}

                  <Stack
                    direction='row'
                    justifyContent='center'
                    spacing={5}
                    paddingTop='30px'
                  >
                    <Button
                      variant='contained'
                      startIcon={<PersonAdd />}
                      type='submit'
                      color='success'
                      size='large'
                      sx={{ flexGrow: '1', maxWidth: 'calc(50% - 20px)' }}
                    >
                      Add
                    </Button>

                    <Button
                      onClick={() => handleClear(formik)}
                      variant='contained'
                      color='error'
                      startIcon={<Clear />}
                      size='large'
                      sx={{ flexGrow: '1', maxWidth: 'calc(50% - 20px)' }}
                    >
                      Clear
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
        <Typography
          fontFamily={poppins.style.fontFamily}
          fontWeight='500'
          fontSize='12px'
          sx={{
            alignSelf: 'flex-end',
            color: '#d3d3d3',
            marginTop: '10px',
            letterSpacing: '1.1px',
          }}
        >
          Made with 🖤 by Osmar
        </Typography>
      </Container>
    </>
  )
}
