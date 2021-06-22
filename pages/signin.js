import { useState, useEffect } from "react"
import { ReactSVG } from "react-svg"
import { Formik, ErrorMessage } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import { useRouter } from "next/router"

import { useAuth } from "hooks/use-auth"
import { toastify } from "utils"
import Loading from "components/Loading"
import Modal from "components/Modal"

const Signin = () => {
  const { user, setUser } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (user?.finClusiveId) router.push('/dashboard')
  }, [user])

  return (
    <div className="flex flex-col lg:flex-row justify-center w-screen h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-20 lg:px-36">
        <span className="text-gray-900 text-xl font-bold">Welcome back</span>
        <span className="text-gray-500 mt-6">Login to continue limitless financial transactions</span>
        <GoogleLoginButton />
        <OrBar />
        <LoginForm />
      </div>
      <div className="relative w-full h-full lg:w-1/2 hidden lg:flex">
        <img src="/images/auth-background.svg" className="object-cover w-full h-full" />
        <div className="absolute w-full h-full flex justify-center items-center">
          <ReactSVG src="/logo.svg" onClick={() => { router.push('/') }} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

const GoogleLoginButton = () => {
  return (
    <button className="h-10 flex justify-center items-center border border-gray-200 hover:border-gray-400 rounded mt-10">
      <ReactSVG src="/icons/google.svg" />
      <span className="text-gray-900 ml-4">Login with Google</span>
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

const LoginForm = () => {
  const { user, loading, error, setError, signin } = useAuth();

  useEffect(() => {
    if (error) {
      toastify(error)
      setError(null)
    }
  }, [error])

  const [forgotModal, setForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState()
  const handleChangeForgotEmail = (e) => {
    setForgotEmail(e.target.value)
  }

  return (
    <div>
      <Loading loading={loading} />
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={() =>
          Yup.object().shape({
            email: Yup.string().email().required("Email address is required"),
            password: Yup.string().required("Password is required"),
          })
        }
        onSubmit={async ({ email, password }) => {
          signin(email, password, "/dashboard");
        }}
      >
        {({
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <section className="">
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

            <button type="button" onClick={() => { setForgotModal(true) }}><span className="block text-sm text-toneblue-300 mt-6">Forgot Password?</span></button>

            <button type="submit" className="btn w-full h-10 mt-6">Login</button>

            <div className="flex items-center mt-6">
              <span className="text-gray-800">Don't have an account?</span>
              <Link href='/signup'>
                <span className="link ml-2">Create account here</span>
              </Link>
            </div>
          </form>
        )}
      </Formik>

      {
        forgotModal &&
        <Modal setOpenModal={setForgotModal}>
          <span className="text-xl text-gray-800 font-bold">Forgot password</span>
          <span className="text-sm text-gray-600 mt-4">Please enter your email address to receive a reset link.</span>
          <section className="w-full mt-6">
            <input
              className="w-full border border-gray-200 py-2 px-3 rounded text-gray-800"
              name="forgotEmail"
              type="email"
              placeholder="Email address"
              value={forgotEmail}
              onChange={handleChangeForgotEmail}
            />
          </section>

          <button type="submit" className="btn w-full h-10 mt-6">Send Link</button>

          <div className="flex items-center mt-6">
            <span className="text-gray-800">Didn't receive link?</span>
            <button><span className="link ml-2">Resend</span></button>
          </div>
        </Modal>
      }
    </div>
  )
}


export default Signin