import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactSVG } from "react-svg"

const MainLayout = (props) => {
  const router = useRouter()
  const {pathname} = router

  const menu = [
    {
      name: 'Dashboard',
      icon: '/icons/menu/dashboard.svg',
      path: '/dashboard'
    },
    {
      name: 'Transactions',
      icon: '/icons/menu/transactions.svg',
      path: '/transaction'
    },
    {
      name: 'Wallet',
      icon: '/icons/menu/wallet.svg',
      path: '/wallet'
    },
    {
      name: 'Account',
      icon: '/icons/menu/account.svg',
      path: '/account'
    },
    {
      name: 'Settings',
      icon: '/icons/menu/settings.svg',
      path: '/setting'
    },
  ]
  const [activeMenu, setActiveMenu] = useState(menu.find(item=>pathname.includes(item.path)))

  return (
    <div className="flex">
      {/* menu */}
      <div className="w-72 h-full flex flex-col items-center">
        <img src="/logo.svg" onClick={() => { router.push('/') }} className="w-2/3 my-6 cursor-pointer" />
        <section className="w-full mt-6">
          {
            menu.map((item, index) => {
              return (
                <Link key={index} href={item.path}>
                  <div className={`flex ${activeMenu.name === item.name ? 'border-r-2' : ''} border-toneblue-300 cursor-pointer ml-6 mt-10`}>
                    <ReactSVG src={item.icon} />
                    <span className={`${activeMenu.name === item.name ? 'text-toneblue-300' : 'text-gray-500'} hover:text-toneblue-200 ml-3`}>{item.name}</span>
                  </div>
                </Link>
              )
            })
          }
        </section>
      </div>

      {/* body */}
      <div className="w-full min-h-screen bg-gray-100">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout