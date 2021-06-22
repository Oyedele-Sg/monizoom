import { toast } from 'react-toastify'
import csc from "country-state-city"
import _ from "lodash"

export function toastify(error) {
  toast(error, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
}

export function getCountries() {
  const allCountries = csc.getAllCountries()
  const countries = allCountries.map((country) => {
    return Object.assign({
      isoCode: country.isoCode,
      label: country.name,
      value: country.name
    });
  })
  return countries
}

export function getStatesOfCountry(countryCode) {
  const allStates = csc.getStatesOfCountry(countryCode)
  const states = allStates.map((state) => {
    return Object.assign({
      isoCode: state.isoCode,
      label: state.name,
      value: state.name
    })
  })
  return states
}

export function getFormatPrice(price, currency) {
  if (isNaN(price)) return "-"
  const formatPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(price) // '$100.00'
  return formatPrice
}