export const formatLocalNumber = (phone) => {
  const hasCountryCode = phone.length > 3 ? /^\+\d{1,3}/.test(phone) : true
  const updatedphone = hasCountryCode ? phone : `+1${phone}`

  return updatedphone
}
