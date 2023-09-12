import React from 'react'
import './NavKinds.css'

export default function NavKinds(props) {
  const noPadding = props.noPadding ? 'p-0' : '';
  return (
    <div>
      {/* <div id='Nav_Kinds_Titels' className={'draw ' + noPadding}>
        <div className='Titel_Nav_Kinds'>{props.kind}</div>
      </div> */}
      <div id='Nav_Kinds_Titels' className={"eight " + noPadding}>
        <h1>{props.kind}</h1>
      </div>
    </div>
  )
}
