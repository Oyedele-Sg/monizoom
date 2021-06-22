import { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import { Formik, ErrorMessage } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import { useRouter } from "next/router"

import { useAuth } from "hooks/use-auth"
import { toastify } from "utils"
import Loading from "components/Loading"

const Signup = () => {
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
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-20 lg:px-36">
        <span className="text-gray-900 text-xl font-bold">Get Started with Monizoom</span>
        <span className="text-gray-500 mt-6">Join us and let's make financial transactions easy and boundless</span>
        <GoogleSignupButton />
        <OrBar />
        <SignupForm />
      </div>
    </div>
  )
}

const GoogleSignupButton = () => {
  return (
    <button className="h-10 flex justify-center items-center border border-gray-200 hover:border-gray-400 rounded mt-10">
      <ReactSVG src="/icons/google.svg" />
      <span className="text-gray-900 ml-4">Sign up with Google</span>
    </button>
  )
}

const OrBar = () => {
  return (
    <div className="flex justify-center items-center my-6">
      <hr className="w-1/3 border-gray-200" />
      <span className="text-gray-200 text-sm mx-2">OR</span>
      <hr className="w-1/3 border-gray-200" />
    </div>
  )
}

const SignupForm = () => {
  const { user, loading, error, setError, signup } = useAuth();

  useEffect(() => {    
    if (error) {
      toastify(error)
      setError(null)
    }
  }, [error])

  const [agree, setAgree] = useState(false)

  return (
    <div>
      <Loading loading={loading} />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          cpassword: "",
        }}
        validationSchema={() =>
          Yup.object().shape({
            firstName: Yup.string()
              .trim()
              .matches(
                /[\w\s]$/,
                "Name can only contain letters, and cannot include any special characters, punctionations or start with a space"
              )
              .required("First name is required"),
            lastName: Yup.string()
              .trim()
              .matches(
                /[\w\s]$/,
                "Name can only contain letters, and cannot include any special characters, punctionations or start with a space"
              )
              .required("First name is required"),
            email: Yup.string().email().required("Email address is required"),
            password: Yup.string()
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                "Password must be a minimum eight characters, with at least one uppercase letter, one lowercase letter, and one number"
              )
              .required("Password is required"),
            cpassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
          })
        }
        onSubmit={async ({ firstName, lastName, email, password }) => {
          const user = { firstName, lastName, email, password };          
          signup(user, "/signupfinclusive");
        }}
      >
        {({
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <section className="grid grid-cols-2 gap-x-2">
              <div>
                <label className="block text-gray-400 text-sm" htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="firstName"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                />
                <ErrorMessage name="firstName">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </div>
              <div>
                <label className="block text-gray-400 text-sm" htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                  name="lastName"
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                />
                <ErrorMessage name="lastName">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
              </div>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="email">Email</label>
              <input
                id="email"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="email"
                type="text"
                placeholder=""
                onChange={handleChange}
              />
              <ErrorMessage name="email">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="password">Password</label>
              <input
                id="password"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="password"
                type="password"
                placeholder=""
                onChange={handleChange}
              />
              <ErrorMessage name="password">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <section className="mt-6">
              <label className="block text-gray-400 text-sm" htmlFor="cpassword">Confirm Password</label>
              <input
                id="cpassword"
                className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
                name="cpassword"
                type="password"
                placeholder=""
                onChange={handleChange}
              />
              <ErrorMessage name="cpassword">{msg => <span className="text-red-700">{msg}</span>}</ErrorMessage>
            </section>

            <div className="flex items-center mt-6">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                onChange={(e)=>setAgree(e.target.checked)}
              />
              <span className="text-sm text-gray-800 ml-1">I agree to</span>
              <span className="link text-sm text-toneblue-400 ml-1">terms and conditions</span>
              <span className="text-sm text-gray-800 mx-1">and</span>
              <span className="link text-sm text-toneblue-400">privacy policy</span>
            </div>

            <button type="submit" disabled={!agree} className="btn w-full h-10 mt-6">Continue</button>

            <div className="flex items-center mt-6">
              <span className="text-gray-800">Already have an account?</span>
              <Link href='/signin'>
                <span className="link ml-2">Log in here</span>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Signup