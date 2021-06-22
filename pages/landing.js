import React, { useState } from "react"
import Slider from "react-slick"
import Link from "next/link"

import { HiMenu, HiPhone, HiMail, HiChevronRight, HiLocationMarker } from "react-icons/hi"
import { GrInstagram } from "react-icons/gr"
import { ImTwitter, ImFacebook, ImLinkedin2 } from "react-icons/im"

import { useAuth } from "hooks/use-auth"

const Landing = () => {
  return (
    <div style={{ backgroundImage: 'linear-gradient(180deg, rgba(233, 248, 253, 0.8) 0%, rgba(233, 248, 253, 0) 95.8%)' }}>
      <Header />
      <TopContainer />
      <WhyShouldChoose />
      <SolutionContainer />
      <HowItWorks />
      <WhatYouCando />
      <DownloadAppContainer />
      <ContactContainer />
      <Footer />
    </div>
  )
}

const Header = () => {
  const { user, loading, error, signin, sinup, signout } = useAuth();

  const firstBtn = user ? (
    user.finClusiveId ?
      { path: '/setting', label: 'Settings' }
      : { path: '/signupfinclusive', label: 'Complete Account' })
    : { path: '/signin', label: 'Login' }

  const secondBtn = user ?
    { path: '/signout', label: 'Sign out' }
    : { path: '/signup', label: 'Sign up' }

  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <div className="w-1/2 h-20 flex items-center px-6 sm:px-10">
        <img src="/logo.svg" className="w-40 cursor-pointer" alt="logo" />
      </div>
      <div className="hidden sm:flex w-1/2 h-20 justify-center items-center bg-black bg-opacity-5">
        <button><span className="text-toneblue-400">About US</span></button>
        <button><span className="text-toneblue-400 ml-4 md:ml-8">Solutions</span></button>
        <button><span className="text-toneblue-400 ml-4 md:ml-8">Help</span></button>
        <Link href={firstBtn.path}><button><span className="text-toneblue-200 cursor-pointer ml-4 md:ml-8">{firstBtn.label}</span></button></Link>
        <Link href={secondBtn.path}><button><span className="block bg-toneblue-200 text-white cursor-pointer ml-4 md:ml-8 p-2 rounded-md">{secondBtn.label}</span></button></Link>
      </div>

      <div className="relative sm:hidden px-6">
        <button onClick={() => setOpenMobileMenu(!openMobileMenu)}><HiMenu className="w-6 h-6" /></button>
        {
          openMobileMenu &&
          <div className="absolute -left-32 z-10 bg-white w-40 flex flex-col rounded-md p-4">
            <Link href={firstBtn.path}><button className="my-2"><span className="text-toneblue-400">{firstBtn.label}</span></button></Link>
            <Link href={secondBtn.path}><button className="my-2"><span className="text-toneblue-400">{secondBtn.label}</span></button></Link>
            <button className="my-2"><span className="text-toneblue-400">About US</span></button>
            <button className="my-2"><span className="text-toneblue-400">Solutions</span></button>
            <button className="my-2"><span className="text-toneblue-400">Help</span></button>
          </div>
        }
      </div>
    </div>
  )
}

const TopContainer = () => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 8000,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <CustomSlide index={0} />
      <CustomSlide index={1} />
      <CustomSlide index={2} />
    </Slider>
  )
}

const CustomSlide = (props) => {
  const data = [
    {
      title: 'Bank Without Borders',
      desc: 'Accelerate your global reach on our reliable and borderless platform',
      img: '/landing/slide_img1.svg'
    },
    {
      title: 'Limitless!',
      desc: 'Take advantage of our global coverage (Over 180 countries and 120 currencies supported).',
      img: '/landing/slide_img2.svg'
    },
    {
      title: 'Fast. Easy. Secure.',
      desc: 'Quickly, easily and securely transact with great rates and low fees.',
      img: '/landing/slide_img3.svg'
    }
  ]

  return (
    <div className="sm:flex">
      <div className="sm:w-1/2 flex flex-col justify-center mt-16 sm:mt-0 px-6 md:px-32">
        <span className="text-5xl text-toneblue-400 font-bold">{data[props.index].title}</span>
        <span className="text-md text-gray-700 mt-10">{data[props.index].desc}</span>
        <div className="flex mt-10">
          <span className="bg-toneblue-200 text-md text-white px-4 py-2 rounded-md">Get started</span>
          <span className="border border-toneblue-200 text-md text-toneblue-200 px-4 py-2 rounded-md ml-4">Demo Video</span>
        </div>
      </div>
      <div className="sm:w-1/2 mt-10 sm:mt-0 bg-black bg-opacity-5">
        <img src={data[props.index].img} className="w-full" alt={data[props.index].title} />
      </div>
    </div>
  )
}

const WhyShouldChoose = () => {
  const data = [
    {
      icon: '/landing/icon_easy_to_use.svg',
      label: 'Easy to Use',
      desc: 'From initiating a transaction to the completion, our processes are direct, clear, concise and very accessible from the comfort of your device.'
    },
    {
      icon: '/landing/icon_fast_payment.svg',
      label: 'Faster Payments',
      desc: 'Avoid long queues and delays. Our high-performance technology enables lightning-fast transfers and your transactions can be completed in less than two minutes.'
    },
    {
      icon: '/landing/icon_secure.svg',
      label: '100% Secure',
      desc: 'Your end to end transactions are encrypted and confidential. Activities on the monizoom platform are secure and run on best industry practices.'
    },
  ]

  return (
    <div className="px-6 md:px-36 my-16 flex flex-col items-center">
      <span className="text-2xl text-toneblue-400 font-bold">Why should you choose MoniZoom?</span>
      <div className="w-full sm:grid sm:grid-cols-3 mt-10">
        {
          data.map((item, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div className="bg-toneblue-100 flex justify-center items-center w-16 h-16 p-3 rounded-full">
                <img src={item.icon} alt={item.label} />
              </div>
              <span className="text-md text-center text-gray_900 font-bold mt-4">{item.label}</span>
              <span className="text-sm text-center text-gray-700 mt-4 font-sans">{item.desc}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const SolutionContainer = () => {
  const data = [
    {
      img: '/landing/solution_img1.svg',
      label: 'Freelancer'
    },
    {
      img: '/landing/solution_img2.svg',
      label: 'Online Shopping'
    },
    {
      img: '/landing/solution_img3.svg',
      label: 'Online Sellers'
    },
    {
      img: '/landing/solution_img4.svg',
      label: 'Affiliate Marketing'
    }
  ]

  return (
    <div className="px-6 md:px-36 my-16 flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 order-2 sm:order-1 bg-gray-50 grid grid-cols-2 gap-6 p-6 rounded-lg">
        {
          data.map((item, index) => (
            <div key={index} className="bg-white flex flex-col items-center rounded-md p-6">
              <img src={item.img} alt={item.label} />
              <span className="text-sm text-gray-700 mt-2">{item.label}</span>
            </div>
          ))
        }
      </div>
      <div className="w-full sm:w-1/2 order-1 sm:order-2  md:px-10 py-4 flex flex-col justify-center items-center sm:items-start">
        <span className="text-2xl text-toneblue-400 font-bold">Payment Solutions For Everyone</span>
        <span className="text-md text-center sm:text-left text-gray-700 mt-4">Our payment solutions meet the needs of a variety of costumers.</span>
        <span className="text-md text-toneblue-200 cursor-pointer mt-4">Find More Solutions</span>
      </div>
    </div>
  )
}

const HowItWorks = () => {
  const data = [
    {
      number: 1,
      label: 'Sign Up Account'
    },
    {
      number: 2,
      label: 'Receive and Send Payments from worldwide'
    },
    {
      number: 3,
      label: 'Funds will be transferred to your local account'
    }
  ]

  return (
    <div className="px-6 md:px-36 my-16 sm:flex">
      <div className="sm:w-1/2 flex flex-col justify-center items-center sm:items-start pr-10">
        <span className="text-2xl text-toneblue-400 font-bold">How it works</span>
        <span className="text-md text-center sm:text-left text-gray-700 mt-4">Transaction is simplified with just a few clicks and steps</span>
        <button className="hidden sm:flex bg-toneblue-200 w-56 text-md text-white px-4 py-2 rounded-md mt-4">Open a Free Account</button>
      </div>
      <div className="sm:w-1/2 flex flex-col justify-center sm:pl-10">
        {
          data.map((item, index) => (
            <div key={index} className="flex items-center mt-6">
              <div className="w-14 h-14 border border-gray-100 shadow-sm rounded-full flex justify-center items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center">
                  <span className="text-md text-toneblue-400 font-bold">{item.number}</span>
                </div>
              </div>
              <span className="text-md text-toneblue-400 font-bold ml-2">{item.label}</span>
            </div>
          ))
        }
      </div>
      <div className="flex justify-center">
        <button className="sm:hidden bg-toneblue-200 w-56 text-md text-white px-4 py-2 rounded-md mt-4">Open a Free Account</button>
      </div>
    </div>
  )
}

const WhatYouCando = () => {
  const data = [
    {
      img: '/landing/tile_img1.svg',
      label: 'Pay for Services'
    },
    {
      img: '/landing/tile_img2.svg',
      label: 'Virtual Banking'
    },
    {
      img: '/landing/tile_img3.svg',
      label: 'Digital Wallets'
    },
    {
      img: '/landing/tile_img4.svg',
      label: 'Virtual and Physical card'
    },
    {
      img: '/landing/tile_img5.svg',
      label: 'Send & Receive Money'
    },
    {
      img: '/landing/tile_img6.svg',
      label: 'Transfer between Customers'
    }
  ]

  return (
    <div className="px-6 md:px-36 flex flex-col items-center my-20">
      <span className="text-2xl text-toneblue-400 font-bold">What you can do with MoniZoom</span>
      <span className="text-md text-gray-700 text-center mt-6">We have built a robust platform to power any form of banking transaction.</span>
      <div className="sm:grid sm:grid-cols-3 sm:gap-6 mt-6">
        {
          data.map((item, index) => (
            <div key={index} className="flex flex-col items-center mt-10">
              <img src={item.img} alt={item.label} />
              <span className="text-md text-gray-700 mt-4">{item.label}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const DownloadAppContainer = () => {
  return (
    <div className="px-6 md:px-36 my-20">
      <div className="bg-toneblue-100 p-6 flex flex-col items-center rounded-md">
        <span className="text-md text-toneblue-400 font-bold">Download App</span>
        <span className="text-sm text-gray-700 mt-6">Download our app for the fastest, most convenient way to send & get payment.</span>
        <div className="flex mt-6">
          <div className="flex flex-col items-center">
            <img src='/landing/download_app_mobile.svg' className="mx-2" alt="mobile" />
            <span className="text-xs text-gray-700 italic mt-2">Coming Soon</span>
          </div>
          <div className="flex flex-col items-center">
            <img src='/landing/download_app_web.svg' className="mx-2" alt="mobile" />
            <span className="text-xs text-gray-700 italic mt-2">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactContainer = () => {
  return (
    <div className="px-6 md:px-36 sm:grid sm:grid-cols-3 sm:gap-x-4 my-16">
      <div id="contact" className="flex flex-col mt-6">
        <span className="text-md text-toneblue-400 font-bold">Contact</span>
        <div className="flex items-center mt-4">
          <HiPhone className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">+1 215 301 8121</span>
        </div>
        <div className="flex items-center mt-4">
          <HiMail className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">admin@monizoom.com</span>
        </div>
      </div>
      <div id="pages" className="flex flex-col mt-6">
        <span className="text-md text-toneblue-400 font-bold">Pages</span>
        <div className="flex items-center mt-4">
          <HiChevronRight className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">About Us</span>
        </div>
        <div className="flex items-center mt-4">
          <HiChevronRight className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">Support</span>
        </div>
        <div className="flex items-center mt-4">
          <HiChevronRight className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">Help</span>
        </div>
        <div className="flex items-center mt-4">
          <HiChevronRight className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">Careers</span>
        </div>
        <div className="flex items-center mt-4">
          <HiChevronRight className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">Affiliate</span>
        </div>
        <div className="flex items-center mt-4">
          <HiChevronRight className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">Fees</span>
        </div>
      </div>
      <div id="office" className="flex flex-col mt-6">
        <span className="text-md text-toneblue-400 font-bold">Our Office</span>
        <div className="flex items-center mt-4">
          <HiLocationMarker className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">Nigeria - No 4, Mike Akhigbe Street, Jabi, Abuja</span>
        </div>
        <div className="flex items-center mt-4">
          <HiLocationMarker className="text-toneblue-200" />
          <span className="text-xs text-toneblue-400 font-bold ml-2">USA - 5700 Kirkwood Highway Suite 202 Wilmington, De 19809</span>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="flex flex-col items-center my-16">
      <img src="/logo.svg" className="w-20" alt="logo" />
      <span className="text-xs text-center text-toneblue-400 mt-4">Monizoom (RC1631734) is a technological company that has its service <br /> offering in fintech.</span>
      <div className="flex mt-4">
        <ImTwitter className="text-gray-700" />
        <GrInstagram className="text-gray-700 ml-4" />
        <ImFacebook className="text-gray-700 ml-4" />
        <ImLinkedin2 className="text-gray-700 ml-4" />
      </div>
    </div>
  )
}

export default Landing