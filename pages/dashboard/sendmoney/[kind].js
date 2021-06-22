import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ReactSVG } from 'react-svg'
import { TiMediaRecord } from 'react-icons/ti'
import { BiChevronUp, BiChevronDown, BiChevronLeftCircle } from 'react-icons/bi'

import { toastify } from "utils"
import { Formik, ErrorMessage } from "formik"
import * as Yup from "yup"

import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

import MainLayout from 'components/MainLayout'
import Header from 'components/Header'
import Modal from 'components/Modal'
import Loading from "components/Loading"
import SelectBox from "components/SelectBox"
import FlagCurrencySelector from "components/FlagCurrencySelector"
import { useBank } from 'hooks/use-bank'

import { getFormatPrice, getCountries, getStatesOfCountry } from 'utils'

const Handler = () => {
  const { bank, getBank, loading, error } = useBank()

  return (
    <MainLayout>
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="flex justify-between items-center mt-12 px-6">
        <div>
          <span className="text-gray-800 text-xl">Send Money</span>
          <span className="block text-gray-800 text-sm mt-4">Wallet Balance: {getFormatPrice(bank?.balance, 'USD')}</span>
        </div>
        <Link href="/dashboard/sendmoney">
          <div>
            <BiChevronLeftCircle className="invisible md:visible w-8 h-8 text-gray-800 cursor-pointer mr-12" />
          </div>
        </Link>
      </div>

      <Transfer />

    </MainLayout>
  )
}

const Transfer = () => {
  const [confirmModal, setConfirmModal] = useState(false)
  const [doneModal, setDoneModal] = useState(false)

  return (
    <div className="md:flex">
      <div className="w-full md:w-2/3 mt-12 px-6">
        <FrequentRecipients />
        <AddRecipient />
        <div className="flex justify-center my-6">
          <button className="btn w-1/2 h-10" onClick={() => setConfirmModal(true)}>Make transfer</button>
        </div>
      </div>
      <div className="w-full md:w-1/3 mt-12">
        <PaymentDetail type="sidebar" />
      </div>
      {
        confirmModal &&
        <Modal setOpenModal={setConfirmModal}>
          <span className="text-gray-800 text-lg">Confirm Transfer</span>
          <span className="text-gray-800 text-md mt-10">John Doe</span>
          <span className="text-gray-800 text-md mt-2">Acct No: 0123232343</span>
          <span className="text-gray-500 text-xs italic mt-2">First Bank of Nigeria</span>
          <span className="text-gray-500 text-xs italic mt-2">Johndoe@gmail.com</span>
          <PaymentDetail type="modal" />
          <div className="w-full flex justify-center">
            <button type="submit" className="btn w-full h-10" onClick={() => { setConfirmModal(false); setDoneModal(true); }}>Confirm Transfer</button>
          </div>
        </Modal>
      }
      {
        doneModal &&
        <Modal setOpenModal={setDoneModal}>
          <img src='/images/done.svg' alt="done" className="w-28 h-28" />
          <span className="text-gray-800 text-md mt-6">Your Transfer has been created successfully</span>
          <span className="text-gray-800 text-sm mt-4">John Doe will get: N450,000</span>
          <div className="w-full grid grid-cols-3 mt-6">
            <div className="col-span-2 flex flex-col">
              <span className="block text-gray-500 text-sm">Total Paid:</span>
              <span className="block text-gray-500 text-sm mt-6">Transaction ID:</span>
              <span className="block text-gray-500 text-sm mt-6">Receipt automatically sent to:</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span className="block text-gray-800 text-sm">{getFormatPrice(1002, 'USD')}</span>
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
    </div>
  )
}

const FrequentRecipients = () => {
  const router = useRouter()
  const { kind } = router.query

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

  const kindData = kind === 'bank' ? data.filter(item => item.bankId) : kind === 'wallet' ? data.filter(item => item.walletId) : []

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-md p-6">
      <span className="text-gray-800 font-lg">Frequent recipients</span>
      <div className="w-full grid grid-cols-4">
        {
          kindData.map((item, index) => (
            <div key={index} className="flex flex-col items-center mt-6 px-2">
              {/* <ReactSVG src={item.photo ?? '/static_images/profile.svg'} /> */}
              <img src={item.photo ?? '/static_images/profile.svg'} alt="recipient" />
              <span className="text-gray-800 text-center mt-2">{item.name}</span>
              {
                kind === 'bank' &&
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <span className="">{item.bank}</span>
                  <TiMediaRecord />
                  <span>{item.bankId}</span>
                </div>
              }
              {
                kind === 'wallet' &&
                <div className="flex flex-col items-center text-xs text-gray-500">
                  <span className="mt-2">{item.walletId}</span>
                  <span className="mt-2">{item.wallet}</span>
                </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

const AddRecipient = () => {
  const [form, showForm] = useState(false)
  return (
    <div className="w-full bg-white rounded-md mt-4 p-6 mt:px-20">
      <div className="w-full flex justify-center items-center">
        <span className="text-gray-800 mr-4">Add a recipient</span>
        {
          form && <BiChevronUp className="w-6 h-6 cursor-pointer" onClick={() => showForm(false)} />
        }
        {
          !form && <BiChevronDown className="w-6 h-6 cursor-pointer" onClick={() => showForm(true)} />
        }
      </div>
      {
        form &&
        <AddRecipientForm />
      }
    </div>
  )
}

const PaymentDetail = ({ type }) => {
  const data = [
    {
      sendAmount: 1000,
      sendCurrency: 'USD',
      receiveAmount: 450000,
      receiveCurrency: 'NGN',
      exchangeUnitCurrency: 'USD',
      exchangeGoalCurrency: 'NGN',
      exchangeRate: 450,
      feeCurrency: 'USD',
      fee: 2
    }
  ]

  const [selectedFrom, setSelectedFrom] = useState('US')
  const [selectedTo, setSelectedTo] = useState('NG')

  return (
    <div className="bg-white rounded-l-md p-6">
      {
        type === 'sidebar' &&
        <span className="text-gray-800 text-md">Payment Details</span>
      }
      {
        data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="grid grid-cols-3 mt-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">You send</span>
                <span className="text-sm text-gray-800">{getFormatPrice(item.sendAmount, 'USD')}</span>
                <FlagCurrencySelector type="currency" selected={selectedFrom} onSelect={code => setSelectedFrom(code)} disabled={true} className="-ml-4"/>
              </div>
              <div className="flex flex-col p-6"></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Recipient gets</span>
                <span className="text-sm text-gray-800">{getFormatPrice(item.receiveAmount, 'NGN')}</span>
                <FlagCurrencySelector type="currency" selected={selectedTo} onSelect={code => setSelectedTo(code)} disabled={true} className="-ml-4"/>
              </div>
            </div>
            <div className={`flex flex-col ${type === 'modal' ? 'items-center' : ''}`}>
              <span className="text-xs text-gray-400 mt-4">Exchange Rate: 1{item.exchangeUnitCurrency} = {item.exchangeRate}{item.exchangeGoalCurrency}</span>
              <span className="text-xs text-gray-400 mt-4">Our Charges: {getFormatPrice(item.fee, 'USD')}({getFormatPrice(item.fee * item.exchangeRate, 'USD')})</span>
              {
                type === 'modal' && <hr className="w-full border-gray-800 mt-6" />
              }
              <span className="text-sm text-gray-800 mt-6">Total to Pay: {getFormatPrice(item.sendAmount + item.fee, 'USD')}</span>
              {
                type === 'modal' && <hr className="w-full border-gray-800 mt-6" />
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

const AddRecipientForm = () => {
  const router = useRouter()
  const { kind } = router.query

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState("")

  const [address, setAddress] = useState()
  const countries = getCountries()
  const [country, setCountry] = useState(countries.find(item => item.value == "United States"))
  const [states, setStates] = useState(getStatesOfCountry("US"))
  const [state, setState] = useState(null)

  useEffect(() => {
    if (country.value) {
      let newStates = getStatesOfCountry(country.isoCode)
      setStates(newStates)
      if (newStates.length == 0) setState(null)
      else {
        setState(newStates[0])
      }
    }
  }, [country])


  const banks = [
    { label: "Bank1", value: 'bank1' },
    { label: "Bank2", value: 'bank2' },
    { label: "Bank3", value: 'bank3' },
    { label: "Bank4", value: 'bank4' },
  ];
  const [bank, setBank] = useState(banks[0])

  const accountTypes = [
    { label: "Type1", value: 'type1' },
    { label: "Type2", value: 'type2' },
    { label: "Type3", value: 'type3' },
    { label: "Type4", value: 'type4' },
  ];
  const [accountType, setAccountType] = useState(accountTypes[0])
  const [accountNumber, setAccountNumber] = useState()
  
  const [walletId, setWalletId] = useState()
  const [description, setDescription] = useState()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    if (error) {
      toastify(error)
      setError(null)
    }
  }, [error])

  const saveRecipient = async (recipient) => {
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
      address: address,
      country: country,
      state: state,
      // city: "",
      email: email,
      phoneNumber: phoneNumber,
      bank: bank,
      accountType: accountType,
      accountNumber: accountNumber,
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
            address: kind === 'bank' && Yup.string(),
            country: kind === 'bank' && Yup.string().required("Country is required"),
            state: kind === 'bank' && Yup.string().required("State is required"),
            // city: kind === 'bank' && Yup.string().required("City is required"),
            email: Yup.string().email().required("Email is required"),
            phoneNumber: Yup.string(),
            bank: kind === 'bank' && Yup.string().required("bank is required"),
            accountType: kind === 'bank' && Yup.string().required("Account type is required"),
            accountNumber: kind === 'bank' && Yup.string().required("Account number is required"),
            walletId: kind === 'wallet' && Yup.string().required("Wallet ID is required"),
            description: Yup.string()
          })
        }
        onSubmit={async (
          {
            firstName,
            lastName,
            address,
            country,
            state,
            // city,
            email,
            phoneNumber,
            bank,
            accountType,
            accountNumber,
            walletId,
            description
          },
          { setSubmitting, setFieldValue }
        ) => {
          let recipient = {
            firstName,
            lastName,
            address,
            isoCountryCode: country.isoCode,
            state: state ? state.value : states[0]?.value,
            // city,
            email: email,
            phoneNumber,
            bank: bank?.value,
            accountType: accountType?.value,
            accountNumber,
            walletId,
            description
          }
          saveRecipient(recipient);
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
              <label className="block text-gray-400 text-sm" htmlFor="address">Address</label>
              <input
                id="address"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="address"
                type="text"
                placeholder=""
                value={values.address}
                onChange={handleChange}
              />
              <ErrorMessage name="address">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            {
              kind === 'bank' &&
              <section className="grid grid-cols-2 gap-x-2 mt-6">
                <div>
                  <label className="block text-gray-400 text-sm">Country<span className="text-red-900"> *</span></label>
                  <SelectBox id="country-selector" options={countries} selectedOption={country} setSelectedOption={setCountry} backColor="transparent" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm">State<span className="text-red-900"> *</span></label>
                  <SelectBox id="state-selector" options={states} selectedOption={state} setSelectedOption={setState} backColor="transparent" />
                </div>
              </section>
            }

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

            {
              kind === 'bank' &&
              <>
                <section className="mt-6">
                  <label className="block text-gray-400 text-sm">Bank Name<span className="text-red-900"> *</span></label>
                  <SelectBox id="bank-selector" options={banks} selectedOption={bank} setSelectedOption={setBank} backColor="transparent" />
                </section>

                <section className="grid grid-cols-2 gap-x-2 mt-6">
                  <div>
                    <label className="block text-gray-400 text-sm">Account Type<span className="text-red-900"> *</span></label>
                    <SelectBox id="accountType-selector" options={accountTypes} selectedOption={accountType} setSelectedOption={setAccountType} backColor="transparent" />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm" htmlFor="accountNumber">Account Number<span className="text-red-900"> *</span></label>
                    <input
                      id="accountNumber"
                      className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                      name="accountNumber"
                      type="text"
                      placeholder=""
                      value={values.accountNumber}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="accountNumber">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
                  </div>
                </section>
              </>
            }

            {
              kind === 'wallet' &&
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
            }

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
              <button type="submit" className="btn h-10 mt-6">Save Recipient Details</button>
            </div>

          </form>
        )}
      </Formik>
    </div>
  )
}

export default Handler