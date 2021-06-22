import React, { useState } from "react"
import { ReactSVG } from "react-svg"
import { BiCaretDown, BiDotsVerticalRounded } from "react-icons/bi"

import MainLayout from "components/MainLayout"
import Header from "components/Header"
import SearchBox from "components/SearchBox"

import { getFormatPrice } from "utils"

const Wallet = () => {
  return (
    <MainLayout>
      <div className="h-16 md:flex justify-between items-center px-6">
        <div className="w-full md:w-1/3 border border-gray-400 rounded-md">
          <SearchBox />
        </div>
        <Header />
      </div>
      <div className="flex justify-between items-center mt-16 px-6">
        <span className="text-3xl text-gray-800 font-bold">Your Wallets</span>
        <button className="flex justify-center items-center bg-gray-800 text-white rounded-md px-6 py-2">Add new Wallet</button>
      </div>
      <div className="mt-6 px-6">
        <WalletCards />
      </div>
      <div className="mt-6 px-6">
        <YourCards />
      </div>
    </MainLayout>
  )
}

const WalletCards = () => {
  const cards = [
    {
      back: '/images/card1.svg',
      balance: 300000,
      walletId: '2DS3 1GFR 1233 1235'
    },
    {
      back: '/images/card2.svg',
      balance: 300000,
      walletId: '2DS3 1GFR 1234 1235'
    },
    {
      back: '/images/card3.svg',
      balance: 300000,
      walletId: '2DS3 1GFR 1233 2245'
    },
  ]

  return (
    <div>
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-10">
        {
          cards.map((item, index) => (
            <div key={index} className="relative mt-4 sm:mt-0">
              <img src={item.back} alt="card" />
              <div className="absolute inset-0 flex flex-col text-white p-8">
                <span className="text-xs">Wallet Balance</span>
                <span className="text-xl font-bold mt-2">{getFormatPrice(item.balance, 'USD')}</span>

                <span className="text-xs mt-8">Wallet ID</span>
                <div className="flex items-center">
                  <span className="text-md font-bold mt-2">{item.walletId}</span>
                  <ReactSVG src="/icons/card-paper.svg" className="ml-4" />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="flex justify-center mt-4">
        <ReactSVG src="/icons/arrow-left.svg" className="mx-6 cursor-pointer" />
        <ReactSVG src="/icons/arrow-right.svg" className="mx-6 cursor-pointer" />
      </div>
    </div>
  )
}

const YourCards = () => {
  const data = [
    {
      type: 'mastercard',
      label: 'Mastercard',
      bank: 'GTB',
      cardNumber: '23994929939291234',
      cardName: 'Chukwudi Duru',
    },
    {
      type: 'visacard',
      label: 'Visa Card',
      bank: 'Zenith',
      cardNumber: '23994929939295687',
      cardName: 'Chukwudi Duru',
    },
  ]

  return (
    <div className="bg-white rounded mt-4 p-6">
      <div className="md:flex justify-between mt-16">
        <div className="text-lg text-gray-900 font-bold">Your Cards</div>
        <div className="flex justify-between items-center bg-gray-100 rounded px-3 py-1">
          <div className="flex items-center">
            <span className="text-sm text-gray-400">Sort by</span>
            <hr className="h-4 border border-gray-300 mx-4" />
          </div>
          <div className="flex justify-center items-center text-gray-500 cursor-pointer">
            <span className="text-sm mr-3">Newest</span>
            <BiCaretDown />
          </div>
        </div>
      </div>
      <span className="text-sx text-gray-500">Cards you've used to fund your wallet</span>

      <div className="flex text-sm text-gray-500 mt-10">
        <div className="w-1/12"></div>
        <div className="w-2/12">Card Type</div>
        <div className="w-2/12">Bank</div>
        <div className="w-2/12">Card Number</div>
        <div className="w-2/12">Card Name</div>
        <div className="w-1/12"></div>
      </div>

      {
        data.map((item, index) => (
          <div key={index} className="flex text-md text-gray-800 mt-4">
            <div className="w-1/12 flex items-center"><ReactSVG src={`/icons/${item.type}.svg`} /></div>
            <div className="w-2/12">
              <span>{item.label}</span>
            </div>
            <div className="w-2/12">
              <span>{item.bank}</span>
            </div>
            <div className="w-2/12">{item.cardNumber}</div>
            <div className="w-2/12">{item.cardName}</div>
            <div className="w-2/12 text-toneblue-300">Show Card Number</div>
            <div className="w-1/12 flex items-center"><BiDotsVerticalRounded /></div>

          </div>
        ))
      }
    </div>
  )
}

export default Wallet