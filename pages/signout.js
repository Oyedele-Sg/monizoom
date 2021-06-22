import React, {useEffect} from "react"
import { useAuth } from "hooks/use-auth"

const Signout = () => {
  const { user, loading, error, signin, sinup, signout } = useAuth();

  React.useEffect(()=>{
    signout('/')
  }, [])

  return null
}

export default Signout