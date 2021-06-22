import React, { useState, useEffect } from "react"

import { useAuth } from "hooks/use-auth";

import MainLayout from "components/MainLayout"
import Header from "components/Header"

const Account = () => {
  const user = useAuth()
  const [clientInfo, setClientInfo] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    if (user?.finClusiveId) {
      // getClientInfo(user?.finClusiveId);
    }
  }, [user])

  const getClientInfo = async () => {
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
        setError(error);
      });

    await fetch("/api/get-client-info", {
      body: JSON.stringify({ finClusiveId: user.finClusiveId }),
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
        let clientInfo = responseJSON.data;
        setClientInfo(clientInfo);
        setLoading(false);
      })
      .catch((error) => {
        console.log("get client error: ", error);
        setError(error);
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      <div className="h-16 flex justify-end items-center px-6">
        <Header />
      </div>
      <div className="flex flex-col mt-10 px-12 text-md text-gray-800">
        {
          user && /*clientInfo &&*/
          <>
            <span className="">User Type: {user.type}</span>
            {
              user.type === "Individual" &&
              <>
                <span className="mt-4">User Name: {user.firstName} {user.lastName}</span>
                <span className="mt-4">Date of birth: {user.dateOfBirth}</span>
              </>
            }
            {
              user.type === "Entity" &&
              <span className="mt-4">Company Name: {user.companyName}</span>
            }
            {
              user.type === "Individual" &&
              <span className="mt-4">PhoneNumber Type: {user.phoneNumberType}</span>
            }
            <span className="mt-4">Phone Number: {user.phoneNumber}</span>
            <span className="mt-4">Email: {user.email}</span>

            <hr className="border border-gray-400 my-10" />
            <span className="">Address1: {user.address?.address1}</span>
            <span className="mt-4">Address2: {user.address?.address2}</span>
            <span className="mt-4">City: {user.address?.city}</span>
            <span className="mt-4">State: {user.address?.state}</span>
            <span className="mt-4">Postal Code: {user.address?.postalCode}</span>

            <hr className="border border-gray-400 my-10" />
            {
              user.type === "Individual" &&
              <>
                <span className="">Document Type: {user.document?.documentType}</span>
                <span className="mt-4">Identification Number: {user.document?.identificationNumber}</span>
              </>
            }
            {
              user.type === "Entity" &&
              <>
                <span className="">Incorporation Document Type: {user.incorporationDocument?.documentType}</span>
                <span className="mt-4">Identification Number: {user.incorporationDocument?.identificationNumber}</span>

                <span className="mt-4">Jurisdiction Document Type: {user.jurisdictionDocument?.documentType}</span>
                <span className="mt-4">Identification Number: {user.jurisdictionDocument?.identificationNumber}</span>
              </>
            }
          </>
        }
      </div>
    </MainLayout>
  )
}

export default Account