import { useState } from 'react'
import Link from 'next/link'
import { BiChevronLeftCircle, BiMinusCircle, BiPlusCircle } from 'react-icons/bi'

import MainLayout from 'components/MainLayout'
import Header from 'components/Header'
import Modal from 'components/Modal'
import SelectBox from 'components/SelectBox'
import FlagCurrencySelector from 'components/FlagCurrencySelector'
import { useWallet } from 'hooks/use-wallet'
import { s_currencyLabels } from 'const'
import { getFormatPrice, getCountries, getStatesOfCountry } from 'utils'

const TopUp = () => {
  const { wallet, getWallet, walletLoading, walletError } = useWallet()
  const banks = [
    {
      label: 'Chukwudi Duru',
      value: 'chukwudiduru'
    },
    {
      label: 'Other account1',
      value: 'otheraccount1'
    },
    {
      label: 'Other account2',
      value: 'otheraccount2'
    },
  ]
  const [bank, setBank] = useState(banks[0])
  const [selectedWallet, setSelectedWallet] = useState('US')
  const [amount, setAmount] = useState('')
  const units = [5, 50, 100, 500, 1000]
  const [currentUnitIndex, setCurrentUnitIndex] = useState(1)

  const [confirmModal, setConfirmModal] = useState(false)
  const [doneModal, setDoneModal] = useState(false)

  return (
    <MainLayout>
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="flex justify-between items-center mt-12 px-6">
        <div>
          <span className="text-gray-800 text-xl">Top Up Wallet</span>
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
          <div className="flex justify-center items-center border-b border-gray-500">Bank Transfer</div>

          <span className="text-gray-500 text-sm mt-6">Select account to transfer from</span>
          <div className="w-full md:w-2/3 mt-2">
            <SelectBox id="account-selector" options={banks} selectedOption={bank} setSelectedOption={setBank} backColor="transparent" />
          </div>

          <span className="text-gray-500 text-sm mt-6">Select Wallet to Top Up</span>
          <div className="w-40 flex items-center bg-gray-100 mt-2">
            <FlagCurrencySelector type="currency" selected={selectedWallet} onSelect={code => setSelectedWallet(code)} />
          </div>

          <span className="text-gray-500 text-sm mt-6">Amount to Top Up</span>
          <div className="w-full md:w-2/3 flex justify-between items-center mt-2">
            <BiMinusCircle className="text-toneblue-300 w-8 h-8 cursor-pointer" onClick={() => setAmount(Number(amount) - units[currentUnitIndex])} />
            <input
              id="amount"
              className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800 mx-6"
              name="amount"
              type="number"
              placeholder=""
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <BiPlusCircle className="text-toneblue-300 w-8 h-8 cursor-pointer" onClick={() => setAmount(Number(amount) + units[currentUnitIndex])} />
          </div>

          <div className="w-full grid grid-cols-5 gap-x-4 mt-6">
            {
              units.map((unit, index) => (
                <div className={`h-12 flex justify-center items-center rounded-md cursor-pointer ${currentUnitIndex == index ? 'bg-toneblue-300 hover:bg-toneblue-200 text-white' : 'bg-gray-100 hover:bg-gray-300 text-gray-800'}`} onClick={() => setCurrentUnitIndex(index)}>
                  {`${getFormatPrice(unit, s_currencyLabels[selectedWallet])}`}
                </div>
              ))
            }
          </div>
        </div>

        <div className="w-full md:w-1/3 flex justify-center mt-6">
          <button type="submit" className="btn w-full h-10" onClick={() => setConfirmModal(true)}>Confirm</button>
        </div>
      </div>

      {
        confirmModal &&
        <Modal setOpenModal={setConfirmModal}>
          <div className="w-96"></div>
          <span className="text-gray-800 text-lg">Confirm Top Up</span>
          <span className="text-gray-800 text-md mt-10">{getFormatPrice(5000, s_currencyLabels[selectedWallet])}</span>
          <div className="w-40 mt-2">
            <FlagCurrencySelector type="currency" selected={selectedWallet} onSelect={code => setSelectedWallet(code)} disabled={true} className="ml-7"/>
          </div>
          <span className="text-gray-800 text-md mt-10">Chukwudi Duru  ....1234</span>
          <span className="text-gray-500 text-md mt-10">Exchange Rate: 1USD = 450NGN</span>

          <div className="w-full flex justify-center mt-10">
            <button type="submit" className="btn w-full h-10" onClick={() => { setConfirmModal(false); setDoneModal(true); }}>Confirm Top Up</button>
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
              <span className="block text-gray-800 text-sm">{getFormatPrice(50000, 'USD')}</span>
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
    </MainLayout>
  )
}

export default TopUp