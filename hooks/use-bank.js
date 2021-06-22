import { useState } from 'react'

export const useBank = () => {
  const [bank, setBank] = useState({
    balance: 300000
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getBank = () => {
    setLoading(true)
    setError(null)

    setBank({})
  };

  return {
    bank,
    bankLoading: loading,
    bankError: error,
    getBank,
  };
};

export default useBank
