import { useState } from 'react'
import Link from 'next/link'
import { BiChevronLeftCircle, BiMinusCircle, BiPlusCircle } from 'react-icons/bi'

import MainLayout from 'components/MainLayout'
import Header from 'components/Header'
import FlagCurrencySelector from 'components/FlagCurrencySelector'
import Modal from 'components/Modal'
import { useWallet } from 'hooks/use-wallet'
import { getFormatPrice, getCountries, getStatesOfCountry } from 'utils'

const Wallet2Wallet = () => {
  const { wallet, getWallet, walletLoading, walletError } = useWallet()
  const [selectedFrom, setSelectedFrom] = useState('NG')
  const [selectedTo, setSelectedTo] = useState('US')
  const [sendAmount, setSendAmount] = useState(1000)
  const [receiveAmount, setReceiveAmount] = useState(450000)
  const [exchangeUnitCurrency] = useState('USD')
  const [exchangeGoalCurrency] = useState('NGN')
  const [exchangeRate, setExchangeRate] = useState(450)

  const [confirmModal, setConfirmModal] = useState(false)
  const [doneModal, setDoneModal] = useState(false)

  return (
    <MainLayout>
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="flex justify-between items-center mt-12 px-6">
        <div>
          <span className="text-gray-800 text-xl">Wallet to Wallet</span>
          <span className="block text-gray-800 text-sm mt-4">Wallet Balance: {getFormatPrice(wallet?.balance, 'USD')}</span>
        </div>
        <Link href="/dashboard">
          <div>
            <BiChevronLeftCircle className="invisible md:visible w-8 h-8 text-gray-800 cursor-pointer mr-12" />
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-col items-center mt-12 px-6">
        <div className="w-full md:w-1/2 flex flex-col items-center bg-white rounded-md p-6">
          <div className="flex justify-center items-center border-b border-gray-500">Wallet Transfer</div>

          <div className="w-full grid grid-cols-5 mt-10">
            <div className="col-span-2 flex flex-col">
              <div className="flex items-center bg-gray-100 p-1">
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
              <div className="flex items-center bg-gray-100 p-1">
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
        </div>

        <div className="w-full md:w-1/3 flex justify-center mt-6">
          <button type="submit" className="btn w-full h-10" onClick={() => setConfirmModal(true)}>Confirm</button>
        </div>
      </div>

      {
        confirmModal &&
        <Modal setOpenModal={setConfirmModal}>
          <div className="w-96"></div>
          <span className="text-gray-800 text-lg">Confirm Wallet Transfer</span>
          <span className="text-gray-800 text-md mt-10">{getFormatPrice(5000, 'USD')}</span>
          <div className="w-40 mt-2">
            <FlagCurrencySelector type="currency" selected={selectedTo} onSelect={code => setSelectedTo(code)} disabled={true} className="ml-7" />
          </div>
          <span className="text-gray-800 text-md mt-10">Chukwudi Duru  Naira Wallet</span>
          <span className="text-gray-500 text-md mt-10">Exchange Rate: 1USD = 450NGN</span>

          <div className="w-full flex justify-center mt-10">
            <button type="submit" className="btn w-full h-10" onClick={() => { setConfirmModal(false); setDoneModal(true); }}>Confirm Transfer</button>
          </div>
        </Modal>
      }
      {
        doneModal &&
        <Modal setOpenModal={setDoneModal}>
          <img src='/images/done.svg' alt="done" className="w-28 h-28" />
          <span className="text-gray-800 text-md mt-6">Your account has been funded successfully</span>
          <div className="w-full grid grid-cols-3 mt-6">
            <div className="col-span-2 flex flex-col">
              <span className="block text-gray-500 text-sm">Total Paid:</span>
              <span className="block text-gray-500 text-sm mt-6">Transaction ID:</span>
              <span className="block text-gray-500 text-sm mt-6">Receipt automatically sent to:</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="block text-gray-800 text-sm">{getFormatPrice(1000, 'USD')}</span>
              <span className="block text-gray-800 text-sm mt-6">213234GE</span>
              <span className="block text-gray-800 text-sm mt-6">chuxduru@gmail.com</span>
            </div>
          </div>
          <div className="w-full flex justify-center text-toneblue-300 mt-10">
            <img src="/icons/download.svg" alt="download" />
            <span className="text-xs ml-2">Download receipt</span>
          </div>
          <div className="w-full flex justify-center mt-10">
            <button type="submit" className="btn w-full h-10" onClick={() => { setDoneModal(false) }}>Done</button>
          </div>
        </Modal>
      }
    </MainLayout >
  )
}

export default Wallet2Wallet