import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BiChevronLeftCircle } from 'react-icons/bi'

import MainLayout from 'components/MainLayout'
import Header from 'components/Header'
import FlagCurrencySelector from 'components/FlagCurrencySelector'
import { useBank } from 'hooks/use-bank'
import { useWallet } from 'hooks/use-wallet'
import { getFormatPrice, getCountries, getStatesOfCountry } from 'utils'

const SendMoney = () => {
  const { bank, getBank, bankLoading, bankError } = useBank()
  const { wallet, getWallet, walletLoading, walletError } = useWallet()
  const [tab, setTab] = useState('bank')
  const [selectedFrom, setSelectedFrom] = useState('US')
  const [selectedTo, setSelectedTo] = useState('NG')
  const [sendAmount, setSendAmount] = useState(1000)
  const [receiveAmount, setReceiveAmount] = useState(450000)
  const [exchangeUnitCurrency] = useState('USD')
  const [exchangeGoalCurrency] = useState('NGN')
  const [exchangeRate, setExchangeRate] = useState(450)
  const [fee, setFee] = useState(2)

  return (
    <MainLayout>
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="flex justify-between items-center mt-12 px-6">
        <div>
          <span className="text-gray-800 text-xl">Send Money</span>
          <span className="block text-gray-800 text-sm mt-4">Bank Balance: {getFormatPrice(bank?.balance, 'USD')}</span>
          <span className="block text-gray-800 text-sm mt-4">Wallet Balance: {getFormatPrice(wallet?.balance, 'USD')}</span>
        </div>
        <Link href="/dashboard">
          <div>
            <BiChevronLeftCircle className="invisible md:visible w-8 h-8 text-gray-800 cursor-pointer mr-12" />
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center mt-12 px-6">
        <div className="w-full md:w-2/3 flex flex-col items-center bg-white rounded-md p-6">
          <div className="h-10 grid grid-cols-2 gap-x-6">
            <div className={`flex justify-center items-center cursor-pointer ${tab === 'bank' ? 'border-b border-gray-500' : ''}`} onClick={() => setTab('bank')}>Bank Transfer</div>
            <div className={`flex justify-center items-center cursor-pointer ${tab === 'wallet' ? 'border-b border-gray-500' : ''}`} onClick={() => setTab('wallet')}>Wallet Transfer</div>
          </div>

          <div className="w-full grid grid-cols-5 mt-10">
            <div className="col-span-2 flex flex-col">
              <div className="flex justify-between items-center bg-gray-100 p-1">
                <span className="text-gray-500 mr-2">{'From:'}</span>
                <FlagCurrencySelector type="country" selected={selectedFrom} onSelect={code => setSelectedFrom(code)} />
              </div>
              <div className="bg-gray-100 mt-4 p-2">
                <span className="text-gray-500">{'You Send:'}</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 text-xl">{getFormatPrice(sendAmount, 'USD')}</span>
                  <span className="text-gray-800 text-sm">USD</span>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <img src="/icons/alter.svg" alt="alt" />
            </div>
            <div className="col-span-2 flex flex-col">
              <div className="flex justify-between items-center bg-gray-100 p-1">
                <span className="text-gray-500 mr-2">{'To:'}</span>
                <FlagCurrencySelector type="country" selected={selectedTo} onSelect={code => setSelectedTo(code)} />
              </div>
              <div className="bg-gray-100 mt-4 p-2">
                <span className="text-gray-500">{'Recipient gets:'}</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 text-xl">{getFormatPrice(receiveAmount, 'USD')}</span>
                  <span className="text-gray-800 text-sm">NGR</span>
                </div>
              </div>
            </div>
          </div>

          <span className="text-gray-500 text-sm mt-12">Exchange Rate: 1USD = N450</span>
          <span className="text-gray-500 text-sm mt-4">Transfer time: Within 2 working days</span>
          <span className="text-gray-500 text-sm mt-4">Our fee: $2 (N900)</span>
        </div>

        <div className="w-full md:w-2/3 flex flex-col items-center bg-white rounded-md mt-6 p-6">
          <span className="text-gray-500 text-sm">Total to Pay:</span>
          <span className="text-gray-800 text-xl mt-4">{getFormatPrice(sendAmount + fee, 'USD')}</span>
        </div>

        <div className="w-full md:w-1/3 flex justify-center mt-6">
          <Link href={`${tab === 'bank' ? '/dashboard/sendmoney/bank' : '/dashboard/sendmoney/wallet'}`}>
            <button type="submit" className="btn w-full h-10">Confirm</button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}


export default SendMoney