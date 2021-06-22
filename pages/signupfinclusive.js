import { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import { Formik, ErrorMessage } from "formik"
import * as Yup from "yup"
import { parseCookies } from 'nookies'

import { useRouter } from "next/router"
import moment from "moment"

import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

import { useAuth } from "hooks/use-auth"
import { toastify } from "utils"
import { getCountries, getStatesOfCountry } from "utils"

import Loading from "components/Loading"
import SelectBox from "components/SelectBox"

const SignupFinClusive = () => {
  const { user, setUser } = useAuth()
  const router = useRouter()
  useEffect(()=>{
    if(user?.finClusiveId) router.push('/dashboard')
  }, [user])

  return (
    <div className="flex flex-col lg:flex-row justify-center w-screen h-screen">
      <div className="relative w-full h-full lg:w-1/2 hidden lg:flex">
        <img src="/images/auth-background.svg" className="object-cover w-full h-full" />
        <div className="absolute w-full h-full flex justify-center items-center">
          <ReactSVG src="/logo.svg" onClick={()=>{router.push('/')}} className="cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-screen lg:w-1/2 flex flex-col px-6 md:px-20 lg:px-36 py-12 overflow-y-auto">
        <span className="text-gray-900 text-xl font-bold">Need more information</span>
        <SignupFinClusiveForm />
      </div>
    </div>
  )
}

const SignupFinClusiveForm = () => {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const clientTypes = [
    { label: "Individual", value: "Individual" },
    { label: "Entity", value: "Entity" },
  ];
  const [clientType, setClientType] = useState(clientTypes[0]) //init value must be existed

  const [dateOfBirth, setDateOfBirth] = useState()

  const phoneNumberTypes = [
    { label: "Mobile", value: 0 },
    { label: "Home", value: 1 },
  ];
  const [phoneNumberType, setPhoneNumberType] = useState(phoneNumberTypes[0])
  const [phoneNumber, setPhoneNumber] = useState("")

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

  const idTypes = [
    { label: "Driver License", value: 1 },
    { label: "Passport", value: 2 },
    { label: "IdCard", value: 3 },
    { label: "Residence Permit", value: 4 },
    { label: "Jurisdiction", value: 5 },
    { label: "Incorporation", value: 6 },
    { label: "None", value: 7 },
  ];
  const [idType, setIdType] = useState(idTypes.find(item => item.value == 7))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    if (error) {
      toastify(error)
      setError(null)
    }
  }, [error])

  const signupFinClusive = async (client, type) => {
    let token;
    setLoading(true)
    await fetch("/api/get-token")
      .then((response) => {
        if (response.ok) return response.json()
        else throw response.statusText
      })
      .then((responseJSON) => {
        token = responseJSON.data
        // console.log("token", token);
      })
      .catch((error) => {
        console.log("get token error: ", error)
        // setError(error);
      });

    const apiRoute =
      type === "Individual"
        ? "/api/add-individual-client"
        : "/api/add-entity-client";

    await fetch(apiRoute, {
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) return response.json()
        else throw response.statusText
      })
      .then((responseJSON) => {
        let finClusiveId = responseJSON.data
        console.log("finClusiveId", finClusiveId)

        const uid = user?.uid
        let newUser = { uid, type, finClusiveId, ...client }
        updateFirebaseUser(newUser)
      })
      .catch((error) => {
        console.log("add client error: ", error)
        setError(error)
        setLoading(false)
      });
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
      country: country,
      firstName: user?.firstName,
      lastName: user?.lastName,
      companyName: "",
      dateOfBirth: "",
      phoneNumberType: phoneNumberType,
      phoneNumber: phoneNumber,
      email: user?.email,
      ssn: "",
      bvn: "",
      ein: "",
      address1: "",
      address2: "",
      city: "",
      state: state,
      postalCode: "",
      idType: idType,
      idNumber: "",
      idFileName: "",
      idContent: "",
      incorporationDocument: "",
      jurisdictionCertificate: "",
      significantParties: [],
      submitError: false,
    };
  };

  return (
    <div>
      <Loading loading={loading} />
      <Formik
        initialValues={initValues()}
        validationSchema={() =>
          Yup.object().shape({
            // country: Yup.string()
            //   .required("Country is required"),
            // firstName:
            //   clientType.value === "Individual" &&
            //   Yup.string()
            //     .trim()
            //     .matches(
            //       /[\w\s]$/,
            //       "Name can only contain letters, and cannot include any special characters, punctionations or start with a space"
            //     )
            //     .required("First name is required"),
            // lastName:
            //   clientType.value === "Individual" &&
            //   Yup.string()
            //     .trim()
            //     .matches(
            //       /[\w\s]$/,
            //       "Name can only contain letters, and cannot include any special characters, punctionations or start with a space"
            //     )
            //     .required("Last name is required"),
            companyName:
              clientType.value === "Entity" &&
              Yup.string()
                .trim()
                .matches(
                  /[\w\s]$/,
                  "Name can only contain letters, and cannot include any special characters, punctionations or start with a space"
                )
                .required("Company name is required"),
            dateOfBirth:
              dateOfBirth &&
              Yup.mixed().test(
                "is-of-age",
                "Age must be 18 years or older",
                (value) => moment().diff(moment(value), "years") >= 18
              ),
            // phoneNumberType: Yup.string(),
            // phoneNumber: Yup.string(),
            // email:
            //   clientType.value === "Individual" &&
            //   Yup.string().email().required("Email address is required"),
            // ssn: Yup.string(),
            // bvn: Yup.string(),
            address1: Yup.string().required("Address1 is required"),
            // address2: Yup.string(),
            city: Yup.string().required("City is required"),
            // state: Yup.string()
            //   .required("State is required"),
            postalCode: Yup.string().required("Postal code is required"),
            // idType: Yup.string(),
            // idNumber: Yup.string(),
            idFileName:
              clientType.value === "Individual" &&
              idType.value != 7 &&
              Yup.string().required("Idendification document file is required"),
            // idContent: (clientType.value === 'Individual && idType != 7) && Yup.string()
            //   .required("Identification document content is required")
            // incorporationDocument: clientType.value === 'Entity' && Yup.string()
            //   .required("Incorporation document file is required"),
            // jurisdictionCertificate: clientType.value === 'Entity' && Yup.string()
            //   .required("Jurisdiction document file is required"),
          })
        }
        onSubmit={async (
          {
            // country,
            // firstName,
            // lastName,
            dateOfBirth,
            companyName,
            // phoneNumberType,
            // email,
            ssn,
            bvn,
            ein,
            address1,
            address2,
            city,
            state,
            postalCode,
            idType,
            idNumber,
            idFileName,
            idContent,
            incorporationDocument,
            jurisdictionCertificate,
            significantParties,
          },
          { setSubmitting, setFieldValue }
        ) => {          
          let client =
            clientType.value === "Individual"
              ? {
                firstName: user.firstName,
                lastName: user.lastName,
                dateOfBirth,
                phoneNumberType: phoneNumberType.value,
                phoneNumber,
                emailAddress: user.email,
                // ssn,
                address: {
                  address1,
                  address2,
                  city,
                  state: state ? state.value : states[0]?.value,
                  postalCode,
                  isoCountryCode: country.isoCode,
                },
                // document: {
                //   documentType: idType.value,
                //   identificationNumber: idNumber,
                //   fileName: idFileName,
                //   content: idContent,
                // },
              }
              : {
                legalName: companyName,
                phoneNumber,
                companyAddress: {
                  address1: address1,
                  address2: address2,
                  city: city,
                  state: state,
                  postalCode: postalCode,
                  isoCountryCode: country.isoCode,
                },
                // incorporationDocument: {
                //   fileName: incorporationDocument,
                //   content: incorporationDocument,
                // },
                // jurisdictionDocument: {
                //   fileName: jurisdictionCertificate,
                //   content: jurisdictionCertificate,
                // },
              };
          if (country.isoCode === "NG" && bvn) {
            client["bvn"] = bvn;
          }

          signupFinClusive(client, clientType.value);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <section className="mt-6">
              <label className="block text-gray-400 text-sm">Type<span className="text-red-900"> *</span></label>
              <SelectBox id="type-selector" options={clientTypes} selectedOption={clientType} setSelectedOption={setClientType} backColor="transparent" />
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm">Country<span className="text-red-900"> *</span></label>
              <SelectBox id="country-selector" options={countries} selectedOption={country} setSelectedOption={setCountry} backColor="transparent" />
            </section>

            {
              clientType.value === 'Individual' &&
              <>
                {/* <section className="grid grid-cols-2 gap-x-2 mt-6">
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
                </section> */}

                <section className="mt-6">
                  <label className="block text-gray-400 text-sm" htmlFor="dateOfBirth">Date of birth</label>
                  <input
                    id="dateOfBirth"
                    className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                    name="dateOfBirth"
                    type="date"
                    placeholder=""
                    value={values.dateOfBirth}
                    onChange={(e) => {
                      handleChange(e);
                      setDateOfBirth(e.target.value);
                    }}
                  />
                  <ErrorMessage name="dateOfBirth">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
                </section>

                <section className="mt-6">
                  <label className="block text-gray-400 text-sm">Phone type</label>
                  <SelectBox id="phone-selector" options={phoneNumberTypes} selectedOption={phoneNumberType} setSelectedOption={setPhoneNumberType} backColor="transparent" />
                </section>
              </>
            }
            {
              clientType.value === "Entity" &&
              <section className="mt-6">
                <label className="block text-gray-400 text-sm" htmlFor="companyName">Company name<span className="text-red-900"> *</span></label>
                <input
                  id="companyName"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="companyName"
                  type="text"
                  placeholder=""
                  value={values.companyName}
                  onChange={handleChange}
                />
                <ErrorMessage name="companyName">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </section>
            }

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

            {/* <section className="mt-6">
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
            </section> */}

            {clientType.value === "Individual" && country.value === "United States" && (
              <section className="mt-6">
                <label className="block text-gray-400 text-sm" htmlFor="ssn">SSN</label>
                <input
                  id="ssn"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="ssn"
                  type="text"
                  placeholder="000-00-0000"
                  value={values.ssn}
                  onChange={handleChange}
                />
                <ErrorMessage name="ssn">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </section>
            )}

            {clientType.value === "Individual" && country.value === "Nigeria" && (
              <section className="mt-6">
                <label className="block text-gray-400 text-sm" htmlFor="ssn">BVN</label>
                <input
                  id="bvn"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="bvn"
                  type="text"
                  placeholder="e.g. 08076665555"
                  value={values.bvn}
                  onChange={handleChange}
                />
                <ErrorMessage name="bvn">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </section>
            )}

            {clientType.value === "Entity" && (
              <section className="mt-6">
                <label className="block text-gray-400 text-sm" htmlFor="ssn">EIN</label>
                <input
                  id="ein"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="ein"
                  type="text"
                  placeholder="e.g. 08076665555"
                  value={values.ein}
                  onChange={handleChange}
                />
                <ErrorMessage name="ein">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </section>
            )}

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="address1">Address Line1<span className="text-red-900"> *</span></label>
              <input
                id="address1"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="address1"
                type="text"
                placeholder=""
                value={values.address1}
                onChange={handleChange}
              />
              <ErrorMessage name="address1">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="address2">Address Line2</label>
              <input
                id="address2"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="address2"
                type="text"
                placeholder=""
                value={values.address2}
                onChange={handleChange}
              />
              <ErrorMessage name="address2">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="city">City<span className="text-red-900"> *</span></label>
              <input
                id="city"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="city"
                type="text"
                placeholder=""
                value={values.city}
                onChange={handleChange}
              />
              <ErrorMessage name="city">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm">State<span className="text-red-900"> *</span></label>
              <SelectBox id="state-selector" options={states} selectedOption={state} setSelectedOption={setState} backColor="transparent" />
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="postalCode">Postal code<span className="text-red-900"> *</span></label>
              <input
                id="postalCode"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="postalCode"
                type="number"
                placeholder=""
                value={values.postalCode}
                onChange={handleChange}
              />
              <ErrorMessage name="postalCode">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            {clientType.value === "Individual" && (
              <section className="mt-6">
                <label className="block text-gray-400 text-sm">Identification type</label>
                <SelectBox id="id-type-selector" options={idTypes} selectedOption={idType} setSelectedOption={setIdType} backColor="transparent" />
              </section>
            )}

            {clientType.value === "Individual" && idType.value != 7 && (
              <>
                <section className="mt-6">
                  <label className="block text-gray-400 text-sm" htmlFor="idNumber">Identification number</label>
                  <input
                    id="idNumber"
                    className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                    name="idNumber"
                    type="number"
                    placeholder=""
                    value={values.idNumber}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="idNumber">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
                </section>

                <section className="mt-6">
                  <label className="block text-gray-400 text-sm" htmlFor="idFileName">Identification document</label>
                  <input
                    id="idFileName"
                    className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                    name="idFileName"
                    type="text"
                    placeholder=""
                    value={values.idFileName}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="idFileName">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
                </section>
              </>
            )}

            {clientType.value === "Entity" && (
              <>
                <section className="mt-6">
                  <label className="block text-gray-400 text-sm" htmlFor="incorporationDocument">Incorporation document</label>
                  <input
                    id="incorporationDocument"
                    className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                    name="incorporationDocument"
                    type="text"
                    placeholder=""
                    value={values.incorporationDocument}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="incorporationDocument">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
                </section>

                <section className="mt-6">
                  <label className="block text-gray-400 text-sm" htmlFor="jurisdictionCertificate">Jurisdiction certificate</label>
                  <input
                    id="jurisdictionCertificate"
                    className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                    name="jurisdictionCertificate"
                    type="text"
                    placeholder=""
                    value={values.jurisdictionCertificate}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="jurisdictionCertificate">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
                </section>
              </>
            )}

            <button type="submit" className="btn w-full h-10 mt-6">Create account</button>

          </form>
        )}
      </Formik>
    </div>
  )
}

export default SignupFinClusive