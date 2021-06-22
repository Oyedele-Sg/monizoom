import { ReactSVG } from "react-svg"

import { useAuth } from "hooks/use-auth"

const Header = () => {
  const { user } = useAuth()

  const items = [
    {
      icon: '/icons/chat.svg',
      label: 'chat'
    },
    {
      icon: '/icons/analytics.svg',
      label: 'analytics'
    },
    {
      icon: '/icons/notification.svg',
      label: 'notification'
    },
  ]

  return (
    <div className="flex justify-between items-center mt-4 md:mt-0">
      <div className="flex items-center">
        {
          items.map((item, index) => (
            <button key={index}><ReactSVG src={item.icon} className="mx-2" /></button>
          ))
        }
      </div>
      <div className="flex items-center ml-4">
        <ReactSVG src='/static_images/profile.svg' className="mx-2" />
        <div className="flex flex-col">
          <span className="text-md text-gray-800">{user?.firstName} {user?.lastName} {!user?.firstName && !user?.lastName && user?.name}</span>
          <span className="text-xs text-gray-500">{user?.email}</span>
        </div>
      </div>
    </div>
  )
}

export default Header