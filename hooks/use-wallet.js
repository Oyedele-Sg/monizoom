import { useState } from 'react'

export const useWallet = () => {
  const [wallet, setWallet] = useState({
    balance: 200000
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getWallet = () => {
    setLoading(true)
    setError(null)

    setWallet({})
  };

  return {
    wallet,
    walletLoading: loading,
    walletError: error,
    getWallet,
  };
};

export default useWallet
