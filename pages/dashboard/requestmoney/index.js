import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BiChevronLeftCircle, BiMinusCircle, BiPlusCircle, BiChevronUp, BiChevronDown } from 'react-icons/bi'
import { toastify } from "utils"
import { Formik, ErrorMessage } from "formik"
import * as Yup from "yup"

import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

import MainLayout from 'components/MainLayout'
import Header from 'components/Header'
import Modal from 'components/Modal'
import FlagCurrencySelector from 'components/FlagCurrencySelector'
import Loading from "components/Loading"
import { useWallet } from 'hooks/use-wallet'
import { s_currencyLabels } from 'const'
import { getFormatPrice, getCountries, getStatesOfCountry } from 'utils'

const RequestMoney = () => {
  const { wallet, getWallet, walletLoading, walletError } = useWallet()
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
          <span className="text-gray-800 text-xl">Request Money</span>
          <span className="block text-gray-800 text-sm mt-4">Wallet Balance: {getFormatPrice(wallet?.balance, 'USD')}</span>
        </div>
        <Link href="/dashboard">
          <div>
            <BiChevronLeftCircle className="invisible md:visible w-8 h-8 text-gray-800 cursor-pointer mr-12" />
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-col items-center mt-12 px-6">
        <div className="w-full md:w-2/3 flex flex-col items-center bg-white rounded-md p-6">
          <div className="flex justify-center items-center border-b border-gray-500">Request Money</div>

          <span className="text-gray-500 text-sm mt-6">Select Wallet to Fund</span>
          <div className="w-40 flex items-center bg-gray-100 mt-2">
            <FlagCurrencySelector type="currency" selected={selectedWallet} onSelect={code => setSelectedWallet(code)} />
          </div>

          <span className="text-gray-500 text-sm mt-6">Amount to request</span>
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
      </div>

      <div className="w-full flex flex-col items-center mt-4 px-6">
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <FrequentRequests />
          <AddRequest />
          <div className="w-full flex justify-center my-6">
            <button className="btn w-1/2 h-10" onClick={() => setConfirmModal(true)}>Make Request</button>
          </div>
        </div>
      </div>

      {
        confirmModal &&
        <Modal setOpenModal={setConfirmModal}>
          <div className="w-96"></div>
          <span className="text-gray-800 text-lg">Confirm Request</span>
          <span className="text-gray-800 text-lg mt-6">{getFormatPrice(1000, 'USD')}</span>
          <div className="w-40 mt-2">
            <FlagCurrencySelector type="currency" selected={selectedWallet} onSelect={code => setSelectedWallet(code)} disabled={true} className="ml-7"/>
          </div>
          <span className="text-gray-800 text-lg mt-6">From</span>
          <span className="text-gray-800 text-md mt-2">John Doe</span>
          <span className="text-gray-800 text-md mt-2">Wallet ID: 0123232343</span>
          <span className="text-gray-500 text-xs italic mt-2">Johndoe@gmail.com</span>
          <div className="w-full flex justify-center mt-6">
            <button type="submit" className="btn w-full h-10" onClick={() => { setConfirmModal(false); setDoneModal(true); }}>Confirm Request</button>
          </div>
        </Modal>
      }
      {
        doneModal &&
        <Modal setOpenModal={setDoneModal}>
          <img src='/images/done.svg' alt="done" className="w-28 h-28" />
          <span className="text-gray-800 text-md mt-6">Request has been made</span>
          <div className="w-full grid grid-cols-3 mt-6">
            <div className="col-span-2 flex flex-col">
              <span className="block text-gray-500 text-sm">Total Requested:</span>
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
    </MainLayout>
  )
}

const FrequentRequests = () => {
  const data = [
    {
      name: 'Oma Beaut',
      bank: 'GTB',
      bankId: '012345678',
      photo: '/static_images/freqRecipientImg1.png',
      wallet: 'Naira Wallet',
      walletId: '2DS3 1GFR 1233 1235'
    },
    {
      name: 'Chuks Hands',
      bank: 'GTB',
      bankId: '0123325678',
      photo: '/static_images/freqRecipientImg2.png',
      wallet: 'Dollar Wallet',
      walletId: '2DS3 1GFR 1233 1236'
    },
    {
      name: 'Oma Beaut',
      bank: 'GTB',
      bankId: '012345678',
      photo: '/static_images/freqRecipientImg1.png'
    },
    {
      name: 'Chuks Hands',
      bank: 'GTB',
      bankId: '01233345678',
      photo: '/static_images/freqRecipientImg2.png'
    },
  ]

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-md p-6">
      <span className="text-gray-800 font-lg">Frequent Requests</span>
      <div className="w-full grid grid-cols-4">
        {
          data.map((item, index) => (
            <div key={index} className="flex flex-col items-center mt-6 px-2">
              {/* <ReactSVG src={item.photo ?? '/static_images/profile.svg'} /> */}
              <img src={item.photo ?? '/static_images/profile.svg'} alt="recipient" />
              <span className="text-gray-800 text-center mt-2">{item.name}</span>
              <div className="flex flex-col items-center text-xs text-gray-500">
                <span className="mt-2">{item.walletId}</span>
                <span className="mt-2">{item.wallet}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const AddRequest = () => {
  const [form, showForm] = useState(false)
  return (
    <div className="w-full bg-white rounded-md mt-4 p-6 mt:px-20">
      <div className="w-full flex justify-center items-center">
        <span className="text-gray-800 mr-4">Add another contact</span>
        {
          form && <BiChevronUp className="w-6 h-6 cursor-pointer" onClick={() => showForm(false)} />
        }
        {
          !form && <BiChevronDown className="w-6 h-6 cursor-pointer" onClick={() => showForm(true)} />
        }
      </div>
      {
        form &&
        <AddRequestForm />
      }
    </div>
  )
}

const AddRequestForm = () => {
  const router = useRouter()
  const { kind } = router.query

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [walletId, setWalletId] = useState()
  const [description, setDescription] = useState()

  const countries = getCountries()
  const [country, setCountry] = useState(countries.find(item => item.value == "United States"))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    if (error) {
      toastify(error)
      setError(null)
    }
  }, [error])

  const saveRecipient = async (request) => {
    setLoading(true)
    //
    setLoading(false)
  };

  const updateFirebaseUser = async (newUser) => {
    const cookies = parseCookies()
    const firebaseToken = cookies.token

    await fetch('/api/update-user', {
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
        token: firebaseToken
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) return response.json()
        else throw response.statusText
      })
      .then((responseJSON) => {
        const updatedUser = responseJSON.data
        setUser(updatedUser)
        setLoading(false)
        router.push('/dashboard')
      })
      .catch((error) => {
        console.log("update user error: ", error);
        setError(error);
        setLoading(false);
      });
  };

  const initValues = () => {
    return {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      walletId: walletId,
      description: description
    };
  };

  return (
    <div>
      <Loading loading={loading} />
      <Formik
        initialValues={initValues()}
        validationSchema={() =>
          Yup.object().shape({
            firstName: Yup.string().trim()
              .matches(
                /[\w\s]$/,
                "Name can only contain letters, and cannot include any special characters, punctionations or start with a space"
              ).required("First name is required"),
            lastName: Yup.string().trim()
              .matches(
                /[\w\s]$/,
                "Name can only contain letters, and cannot include any special characters, punctionations or start with a space"
              ).required("Last name is required"),
            email: Yup.string().email().required("Email is required"),
            phoneNumber: Yup.string(),
            walletId: Yup.string().required("Wallet ID is required"),
            description: Yup.string()
          })
        }
        onSubmit={async (
          {
            firstName,
            lastName,
            email,
            phoneNumber,
            walletId,
            description
          },
          { setSubmitting, setFieldValue }
        ) => {
          let request = {
            firstName,
            lastName,
            email: email,
            phoneNumber,
            walletId,
            description
          }
          saveRecipient(request);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <section className="grid grid-cols-2 gap-x-2 mt-6">
              <div>
                <label className="block text-gray-400 text-sm" htmlFor="firstName">First name<span className="text-red-900"> *</span></label>
                <input
                  id="firstName"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="firstName"
                  type="text"
                  placeholder=""
                  value={values.firstName}
                  onChange={handleChange}
                />
                <ErrorMessage name="firstName">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </div>
              <div>
                <label className="block text-gray-400 text-sm" htmlFor="lastName">Last name<span className="text-red-900"> *</span></label>
                <input
                  id="lastName"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="lastName"
                  type="text"
                  placeholder=""
                  value={values.lastName}
                  onChange={handleChange}
                />
                <ErrorMessage name="lastName">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </div>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="email">Email<span className="text-red-900"> *</span></label>
              <input
                id="email"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="email"
                type="email"
                placeholder=""
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm">Phone number</label>
              <PhoneInput
                country={country.isoCode.toLowerCase()}
                value={values.phoneNumber}
                // onChange={handleChange}
                onChange={(phone) => setPhoneNumber(phone)}
                inputStyle={{
                  width: "100%",
                  height: "100%",
                  padding: "0.810rem 0.96rem",
                  paddingLeft: 48,
                  border: "1px solid #dae1e3",
                  borderRadius: "0.25rem",
                  fontSize: "1rem",
                  color: "#656565",
                  outlineColor: "#4e89e0",
                  backgroundColor: "#ffffff",
                  backgroundClip: "padding-box",
                  transition: "border-color 0.15s ease-in-out",
                }}
              />
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="email">Wallet ID<span className="text-red-900"> *</span></label>
              <input
                id="walletId"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="walletId"
                type="text"
                placeholder=""
                value={values.walletId}
                onChange={handleChange}
              />
              <ErrorMessage name="walletId">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="description">Description</label>
              <input
                id="description"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="description"
                type="text"
                placeholder=""
                value={values.description}
                onChange={handleChange}
              />
              <ErrorMessage name="description">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <div className="flex justify-center">
              <button type="submit" className="btn h-10 mt-6">Save Request Details</button>
            </div>

          </form>
        )}
      </Formik>
    </div>
  )
}

export default RequestMoney