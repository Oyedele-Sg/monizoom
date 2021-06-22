import React, { useState } from "react"
import { ReactSVG } from 'react-svg'
import { BiCaretDown } from "react-icons/bi"

import MainLayout from "components/MainLayout"
import Header from "components/Header"
import Modal from 'components/Modal'
import SearchBox from 'components/SearchBox'

import { getFormatPrice } from "utils"

const Transaction = () => {
  return (
    <MainLayout>
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="w-full flex flex-col items-center mt-10 px-6 md:px-20">
        <div className="w-full md:w-3/4 bg-white rounded-md">
          <SearchBox />
        </div>
        <History />
      </div>
    </MainLayout>
  )
}

const History = () => {
  const data = [
    {
      direct: 'incoming',
      detail: {
        username: 'Joseph Doe',
        email: 'Josephdoe@gmail.com',
        phoneNumber: '+23404993423',
        address: '16 Hammed Kasunmu Lekki',
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
        email: 'Josephdoe@gmail.com',
        phoneNumber: '+23404993423',
        address: '16 Hammed Kasunmu Lekki',
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
        email: 'Josephdoe@gmail.com',
        phoneNumber: '+23404993423',
        address: '16 Hammed Kasunmu Lekki',
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
        email: 'Josephdoe@gmail.com',
        phoneNumber: '+23404993423',
        address: '16 Hammed Kasunmu Lekki',
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
        email: 'Josephdoe@gmail.com',
        phoneNumber: '+23404993423',
        address: '16 Hammed Kasunmu Lekki',
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

  const [showModal, setShowModal] = useState(false)
  const [showItem, setShowItem] = useState()

  return (
    <div className="w-full md:w-3/4">
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
            <div key={index} className="flex text-md text-gray-800 hover:bg-gray-100 cursor-pointer mt-4" onClick={() => { setShowModal(true); setShowItem(item) }}>
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

      {
        showModal && showItem &&
        <Modal setOpenModal={setShowModal}>
          <span className="text-xl text-toneblue-300">{showItem.direct === 'incoming' ? '+' : '-'}{getFormatPrice(showItem.price, 'USD')}</span>
          <span className="text-md text-gray-800 mt-6">{showItem.detail.username}</span>
          <span className="text-sm text-gray-500 mt-2">{showItem.detail.email}</span>
          <span className="text-sm text-gray-500 mt-2">{showItem.detail.phoneNumber}</span>
          <div className="w-full grid grid-cols-2 mt-6">
            <span className="text-sm text-gray-500">Address:</span>
            <span className="text-sm text-gray-800">{showItem.detail.address}</span>
          </div>
          <div className="w-full grid grid-cols-2 mt-6">
            <span className="text-sm text-gray-500">Transaction ID:</span>
            <span className="text-sm text-gray-800">{showItem.transactionId}</span>
          </div>

          <div className="w-full flex justify-center text-toneblue-300 mt-6">
            <img src="/icons/download.svg" alt="download" />
            <span className="text-xs ml-2">Download receipt</span>
          </div>
          <div className="w-full flex justify-center mt-10">
            <button type="submit" className="btn w-full h-10" onClick={() => { setShowModal(false) }}>Done</button>
          </div>
        </Modal>
      }
    </div>
  )
}

export default Transaction