import React, { useState } from "react"
import { ReactSVG } from "react-svg"
import { BiCaretDown } from "react-icons/bi"
import Link from "next/link"

import MainLayout from "components/MainLayout"
import Header from "components/Header"

import { getFormatPrice } from "utils"

const Dashboard = () => {

  return (
    <MainLayout>
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="md:flex h-full bg-gray-100">
        <div id="left-part" className="w-full md:w-1/2 lg:w-2/3 px-6">
          <div id="card-and-icon4" className="lg:flex">
            <div className="w-full lg:w-1/2">
              <WalletCard />
            </div>
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-6">
              <ControllerArea />
            </div>
          </div>
          <History />
        </div>

        <div id="right-part" className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-tl-md p-4">
          <div className="border border-gray-100 rounded-md p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-800">Your Cards</span>
              <span className="link text-xs text-gray-700">See all</span>
            </div>
            <YourCards />
            <div className="flex justify-center mt-4">
              <button className="w-2/3 h-10 flex justify-center items-center bg-toneblue-100 text-toneblue-300 rounded">Add another card</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

const WalletCard = () => {
  const item = {
    balance: '/images/card1.svg'
  }
  return (
    <div className="relative flex">
      <img src="/images/card1.svg" className="w-full" alt="walletcard" />
      <div className="absolute inset-0 flex flex-col justify-center text-white p-8">
        <span className="text-xs">Wallet Balance</span>
        <div className="flex items-center mt-2">
          <span className="text-xl font-bold">{getFormatPrice(300, 'USD')}</span>
          <ReactSVG src="/icons/card-eye-hide.svg" className="ml-8" />
        </div>

        <div className="flex justify-between mt-8">
          <div id="country-selector">
            <span className="text-xs">Wallet currency</span>
            <div className="flex items-center">
              USD
              
            </div>
          </div>
          <div id="wallet-id">
            <span className="text-xs">Wallet ID</span>
            <div className="flex items-center">
              <span className="text-md font-bold">2DS3 1GFR 1233 1235</span>
              <ReactSVG src="/icons/card-paper.svg" className="ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ControllerArea = () => {
  const controllers = [
    {
      path: 'sendmoney',
      label: 'Send Money',
      icon: '/icons/send-money.svg'
    },
    {
      path: 'requestmoney',
      label: 'Request Money',
      icon: '/icons/request-money.svg'
    },
    {
      path: 'topupwallet',
      label: 'Top Up Wallet',
      icon: '/icons/top-up-wallet.svg'
    },
    {
      path: 'wallet2wallet',
      label: 'Wallet 2 Wallet',
      icon: '/icons/wallet-to-wallet.svg'
    }
  ]

  return (
    <div className="h-full grid grid-cols-2 gap-4 lg:gap-6">
      {
        controllers.map((item, index) => (
          <Link key={index} href={`/dashboard/${item.path}`}>
            <div className="w-full flex flex-col justify-center items-center bg-white hover:bg-gray-200 rounded-md cursor-pointer py-2">
              <ReactSVG src={item.icon} />
              <span className="text-sm text-gray-500 mt-4">{item.label}</span>
            </div>
          </Link>
        ))
      }
    </div>
  )
}

const History = () => {
  const data = [
    {
      direct: 'incoming',
      detail: {
        username: 'Joseph Doe',
        type: 'Payment for package'
      },
      datetime: {
        date: '02/05/2020',
        time: '02:00PM'
      },
      price: 10000,
      transactionId: '2GH34D'
    },
    {
      direct: 'outgoing',
      detail: {
        username: 'John Doe',
        type: 'Salary payment'
      },
      datetime: {
        date: '02/05/2020',
        time: '02:00PM'
      },
      price: 15000,
      transactionId: '3GHF4D'
    },
    {
      direct: 'incoming',
      detail: {
        username: 'Joseph Doe',
        type: 'Payment for package'
      },
      datetime: {
        date: '02/05/2020',
        time: '02:00PM'
      },
      price: 10000,
      transactionId: '2GH34D'
    },
    {
      direct: 'outgoing',
      detail: {
        username: 'Joseph Doe',
        type: 'Payment for package'
      },
      datetime: {
        date: '02/05/2020',
        time: '02:00PM'
      },
      price: 10000,
      transactionId: '2GH34D'
    },
    {
      direct: 'incoming',
      detail: {
        username: 'Joseph Doe',
        type: 'Payment for package'
      },
      datetime: {
        date: '02/05/2020',
        time: '02:00PM'
      },
      price: 10000,
      transactionId: '2GH34D'
    },
  ]

  return (
    <div>
      <div className="md:flex justify-between mt-16">
        <div className="text-lg text-gray-900 font-bold">Transaction History</div>
        <div className="flex justify-between items-center bg-white rounded px-3 py-1">
          <div className="flex items-center">
            <span className="text-sm text-gray-400">Sort by</span>
            <hr className="h-4 border border-gray-300 mx-4" />
          </div>
          <div className="flex justify-center items-center text-gray-500 cursor-pointer">
            <span className="text-sm mr-3">Naira Wallet</span>
            <BiCaretDown />
          </div>
        </div>
      </div>

      <div className="bg-white rounded mt-4 p-6">
        <div className="flex text-sm text-gray-500">
          <div className="w-1/12"></div>
          <div className="w-4/12">Details</div>
          <div className="w-3/12">Date</div>
          <div className="w-2/12">Price</div>
          <div className="w-2/12">Transaction ID</div>
        </div>
        {
          data.map((item, index) => (
            <div key={index} className="flex text-md text-gray-800 hover:bg-gray-100 cursor-pointer mt-4">
              <div className="w-1/12 flex items-center"><ReactSVG src={`/icons/${item.direct}.svg`} /></div>
              <div className="w-4/12 flex flex-col">
                <span>{item.detail.username}</span>
                <span className="text-sm text-gray-500 italic">{item.detail.type}</span>
              </div>
              <div className="w-3/12 flex flex-col">
                <span>{item.datetime.date}</span>
                <span className="text-sm italic">{item.datetime.time}</span>
              </div>
              <div className="w-2/12">{item.direct === 'incoming' ? '+' : '-'}{getFormatPrice(item.price, 'USD')}</div>
              <div className="w-2/12">{item.transactionId}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const YourCards = () => {
  const cards = [
    {
      back: '/images/card2.svg'
    }
  ]

  return (
    <div>
      {
        cards.map((card, index) => (
          <div key={index} className="mt-6">
            <OneCard card={card} />
          </div>
        ))
      }
    </div>
  )
}

const OneCard = ({ card }) => {
  return (
    <div className="relative">
      <img src={card.back} className="w-full" alt="onecard" />
      <div className="absolute inset-0 flex flex-col justify-center text-white p-8">
        <div className="flex items-center mt-2">
          <span className="text-xl font-bold">123D 4322 835H 1234</span>
        </div>

        <div className="flex justify-between mt-8">
          <div id="country-selector">
            <span className="text-xs">Cardholder</span>
            <div className="flex items-center">
              Chukwudi Duru
              
            </div>
          </div>
          <div id="wallet-id">
            <span className="text-xs">Expiry</span>
            <div className="flex items-center">
              <span className="text-md font-bold">04/25/2022</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard