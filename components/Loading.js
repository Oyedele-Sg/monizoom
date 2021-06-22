import React, { Fragment } from "react"
import PulseLoader from "react-spinners/PulseLoader";

const Loading = props => {
  return (
    <Fragment>
      {
        props.loading &&
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',          
          zIndex: 3000,
        }}>
          <PulseLoader
            size={20}
            color={"#123abc"}
            // loading={props.loading}
          />
        </div>
      }
    </Fragment>
  )
}

export default Loading