import React, { useState, useEffect } from "react"

import { useAuth } from "hooks/use-auth"
import MainLayout from "components/MainLayout"
import Header from "components/Header"
import Loading from "components/Loading"

const Setting = () => {
  const { user } = useAuth()
  const [accountInfo, setAccountInfo] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    if (user?.accountId) {
      getAccountInfo(user?.accountId);
    }
  }, [user]);

  const getAccountInfo = async () => {
    let token;
    setLoading(true);
    await fetch("/api/get-token")
      .then((response) => {
        if (response.ok) return response.json();
        else throw response.statusText;
      })
      .then((responseJSON) => {
        token = responseJSON.data;
        // console.log("token", token);
      })
      .catch((error) => {
        console.log("get token error: ", error);
        // setError(error);
      });

    await fetch("/api/get-account-info", {
      body: JSON.stringify({ accountId: user.accountId }),
      headers: {
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw response.statusText;
      })
      .then((responseJSON) => {
        let accountInfo = responseJSON.data;
        setAccountInfo(accountInfo);
        setLoading(false);
      })
      .catch((error) => {
        console.log("get account error: ", error);
        setError(error);
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      <Loading loading={loading} />
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="flex flex-col mt-10 px-12 text-md text-gray-800">
        {
          accountInfo &&
          <>
            <span className="">Account Name: {accountInfo.displayName}</span>
            <span className="">Account Type: {accountInfo.accountType?.accountTypeName}</span>
            <span className="">Account Number: {accountInfo.accountNumber}</span>
            <span className="mt-4">Account Status: {accountInfo.accountStatus?.accountStatusName}</span>
            <span className="">Created On: {accountInfo.createdOn}</span>

            <hr className="border border-gray-400 my-10" />
            <span className="">Bank: {accountInfo.bank?.bankName} ({accountInfo.bank?.isActive})</span>
            <span className="mt-4">Currency: {accountInfo.currency?.currencyName} ({accountInfo.currency?.currencySymbol})</span>

            <hr className="border border-gray-400 my-10" />
            <span className="">Balance: {accountInfo.accountBalance}</span>
            <span className="mt-4">Available Amount: {accountInfo.availableAmount}</span>
          </>
        }
      </div>
    </MainLayout>
  )
}

export default Setting

// import React, { useState, useEffect, useContext } from "react"
// import { Formik, ErrorMessage } from "formik"
// import * as Yup from "yup"

// import PerfectScollbar from 'react-perfect-scrollbar';
// import 'react-perfect-scrollbar/dist/css/styles.css';

// import {
//   Form,
//   FormName,
//   Error,
//   InputGroup,
//   Label,
//   TextInput,
//   SelectBox,
//   InputName,
//   RadioInputLabel, RadioInput, StyledRadioInput,
//   Account,
//   ButtonLink,
//   ButtonPrimary,
//   Row,
//   Col
// } from "components"
// import Wrapper from "./styles";
// import {useAuth} from 'libs/auth-provider'

// const AddForm = () => {
//   const {user, loading, error} = useAuth()

//   const accountTypes = [
//     { name: "ACH", value: "ACH" },
//     { name: "Wire", value: "Wire" },
//     { name: "Stellar", value: "Stellar" },
//     { name: "None", value: "None" },
//   ]

//   const createSubAccount = () => {}

//   return (
//     <Wrapper>
//       <Formik
//         initialValues={{
//           accountType: accountTypes[0].value,
//           name: "",
//           displayName: "",
//           stellarWalletId: "",
//           submitError: false
//         }}
//         validationSchema={() =>
//           Yup.object().shape({
//             name: Yup.string()
//               .required("Name is required"),
//             displayName: Yup.string()
//               .required("Display Name is required")
//           })
//         }
//         onSubmit={async (
//           { accountType, name, displayName, stellarWalletId },
//           { setSubmitting, setFieldValue }
//         ) => {
//           try {
//             const subAccount = {
//               finClusiveId: user?.finClusiveId,
//               parentAccountId: '1bb51168-06ce-4a7f-a597-25b3de9a2ec9', //master account id
//               accountType,
//               name,
//               displayName,
//               complianceStatus: 0,
//               stellarWalletId
//             }
//             setSubmitting(false)
//             createSubAccount(subAccount, user, dispatch)
//           } catch (err) {
//             setSubmitting(false)
//             setFieldValue("submitError", true)
//           }
//         }}
//       >
//         {({
//           setFieldValue,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           values
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             {/* <FormName>Add Sub Account</FormName> */}

//             <Label label="accountType" style={{ textAlign: 'left' }}>
//               <InputName>Account Type<span className="text-danger"> *</span></InputName>
//               <SelectBox
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.accountType}
//                 type="text"
//                 name="accountType"
//                 placeholder="Enter Account Type"
//               >
//                 {
//                   accountTypes.map((each, index) => (
//                     <option key={index} value={each.value}>{each.name}</option>
//                   ))
//                 }
//               </SelectBox>
//               <ErrorMessage component={Error} name="accountType" />
//             </Label>

//             <Label label="name" style={{ textAlign: 'left' }}>
//               <InputName>Name on Account<span className="text-danger"> *</span></InputName>
//               <TextInput
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 type="text"
//                 name="name"
//                 placeholder="Enter Name"
//               />
//               <ErrorMessage component={Error} name="name" />
//             </Label>

//             <Label label="displayName" style={{ textAlign: 'left' }}>
//               <InputName>Display Name<span className="text-danger"> *</span></InputName>
//               <TextInput
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 type="text"
//                 name="displayName"
//                 placeholder="Enter Display Name"
//               />
//               <ErrorMessage component={Error} name="displayName" />
//             </Label>

//             <Label label="stellarWalletId" style={{ textAlign: 'left' }}>
//               <InputName>Stellar Wallet ID<span className="text-danger"> *</span></InputName>
//               <TextInput
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 type="number"
//                 name="stellarWalletId"
//                 placeholder="Enter Stellar Wallet ID"
//               />
//               <ErrorMessage component={Error} name="stellarWalletId" />
//             </Label>

//             <a stretch type="submit">
//               Save
//               </a>
//           </Form>
//         )}
//       </Formik>

//     </Wrapper>
//   )
// }

// export default AddForm
