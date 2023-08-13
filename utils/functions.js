// Add +1 for numbers without a country code
export const formatNumberByLocation = (phone) => {
  const hasCountryCode = phone.length > 3 ? /^\+\d{1,3}/.test(phone) : true
  const updatedphone = hasCountryCode ? phone : `+1${phone}`

  return updatedphone
}
