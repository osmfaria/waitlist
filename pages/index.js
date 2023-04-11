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

const tablesready = axios.create({
  baseURL: '/api',
})

export default function Home() {
  const router = useRouter()

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
    sharedTable: yup.string().required(),
    sittingPreference: yup.string(),
  })

  const handlePhoneInput = (event, formik) => {
    formik.setFieldError('phone', 'invalid phone number')

    const input = event.target.value

    const hasCountryCode = input.length > 3 ? /^\+\d{1,3}/.test(input) : true

    const modfiedInput = hasCountryCode ? input : `+1${input}`

    const formattedInternationalPhone = formatIncompletePhoneNumber(input)
    const parsedNationalPhone = findNumbers(modfiedInput)

    const isValidNumber = isValidPhoneNumber(modfiedInput)
    if (!isValidNumber) {
      formik.setFieldError('phone', 'invalid phone number')
    }

    if (
      parsedNationalPhone.length > 0 &&
      (parsedNationalPhone[0].country === 'CA' ||
        parsedNationalPhone[0].country === 'US')
    ) {
      const numberObj = parsePhoneNumber(modfiedInput)

      const nationalPhone = numberObj.format('NATIONAL', {
        nationalPrefix: false,
      })
      formik.setFieldValue('phone', nationalPhone)
    } else {
      formik.setFieldValue('phone', formattedInternationalPhone)
    }
  }

  const validatePhone = (input) => {
    let errorMessage
    const hasCountryCode = input.length > 3 ? /^\+\d{1,3}/.test(input) : true
    const modfiedInput = hasCountryCode ? input : `+1${input}`
    const isValidNumber = isValidPhoneNumber(modfiedInput)
    if (!isValidNumber) {
      errorMessage = 'invalid phone number'
    }

    return errorMessage
  }

  const handleClear = (formik) => {
    formik.resetForm()
  }

  const onSubmit = (userInput) => {
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
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Container
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '50px',
        }}
        maxWidth='sm'
      >
        <Typography
          color='white'
          fontSize='2.2rem'
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
                    <InputLabel id='demo-simple-select-label'>
                      Shared table
                    </InputLabel>
                    <Select
                      value={formik.values.sharedTable}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.sharedTable &&
                        !!formik.errors.sharedTable
                      }
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      name='sharedTable'
                      label='Shared table'
                    >
                      <MenuItem value={'yes'}>Sure</MenuItem>
                      <MenuItem value={'no'}>Prefer not</MenuItem>
                    </Select>
                    <FormHelperText>
                      Sharing a table with others can result in a shorter wait
                      time. <br /> *Please note that the shared tables are large
                      tables located in the center of the restaurant.
                    </FormHelperText>
                  </FormControl>

                  <Field name='sittingPreference'>
                    {({ field }) => (
                      <FormControl>
                        <FormLabel id='demo-row-radio-buttons-group-label'>
                          Sitting preference
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby='demo-row-radio-buttons-group-label'
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
                            label='Both are okay'
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </Field>

                  <Stack
                    direction='row'
                    justifyContent='center'
                    spacing={4}
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
