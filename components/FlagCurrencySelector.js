import ReactFlagsSelect from 'react-flags-select'
import { s_countries, s_countryLabels, s_currencyLabels } from 'const'

const FlagCurrencySelector = ({type, selected, onSelect, disabled, className}) => {
  return (
    <ReactFlagsSelect 
      countries={s_countries} 
      customLabels={type === 'country' ? s_countryLabels : s_currencyLabels} 
      selected={selected} 
      onSelect={code => onSelect(code)} 
      disabled={disabled} 
      className={`${className} ${disabled ? "disabled" : ""}`}
    />
  )
}

export default FlagCurrencySelector