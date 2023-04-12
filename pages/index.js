import {
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Stack,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  Person,
  PersonAdd,
  Groups,
  LocalPhone,
  Clear,
} from '@mui/icons-material'
import * as yup from 'yup'
import { Field, Form, Formik } from 'formik'
import {
  parsePhoneNumber,
  findNumbers,
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
} from 'libphonenumber-js'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { formatLocalNumber } from '../utils/functions'

const tablesready = axios.create({
  baseURL: '/api',
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleBackdrop = () => {
    setIsLoading((prev) => !prev)
  }

  const handleSnackBar = () => {
    setIsError((prev) => !prev)
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
    size: yup.number().max(10).min(1).required(),
    phone: yup.string().required(),
    sharedTable: yup.string().required('please choose one option'),
    sittingPreference: yup.string(),
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
    setIsLoading(true)

    const data = {
      name: userInput.name,
      size: userInput.size,
      phone: userInput.phone,
      note: `shared table: ${userInput.sharedTable}, sitting preference: ${userInput.sittingPreference}`,
    }

    tablesready
      .post('/walk-in', data, {
        headers: {
          appkey: 'caba572a-3bc6-4961-9612-940faa42de2f',
        },
      })
      .then((_) => {
        router.push('/confirmation')
      })
      .catch((_) => {
        setIsLoading(false)
        handleSnackBar()
      })
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
          sx={{
            background:
              'linear-gradient(to right, red, orange, yellow, green, blue, violet)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Red Umbrella Cafe - Waitlist
        </Typography>

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

                  <Field name='phone' validate={validatePhone}>
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        label='Phone number'
                        autoComplete='off'
                        {...formik.getFieldProps('phone')}
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
                      <MenuItem value={'yes'}>
                        YES, I would like to share a table
                      </MenuItem>
                      <MenuItem value={'no'}>
                        NO, I would like my own table
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
                      Sharing a table with others can result in a shorter wait
                      time. <br /> *Please note that the shared tables are large
                      tables located in the center of the restaurant.
                    </FormHelperText>
                  </FormControl>

                  <Field name='sittingPreference'>
                    {({ field }) => (
                      <FormControl>
                        <FormLabel id='buttons-group-label'>
                          Sitting preference
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby='buttons-group-label'
                          name='row-radio-buttons-group'
                          {...field}
                        >
                          <FormControlLabel
                            value='inside'
                            control={<Radio />}
                            label='Inside'
                          />
                          <FormControlLabel
                            value='patio'
                            control={<Radio />}
                            label='Patio'
                          />
                          <FormControlLabel
                            value='both'
                            control={<Radio />}
                            label='Either is fine'
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Field>

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
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => handleClear(formik)}
                      variant='contained'
                      color='error'
                      startIcon={<Clear />}
                    >
                      Clear
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </>
  )
}