import React from 'react'
import firebase from 'APP/fire'
const db = firebase.database()
import SidebarContainer from '../../app/containers/SidebarContainer'
import MyEditor from './DraftjsScratchpad'
import Sentimentometer from '../../app/components/Sentimentometer'

// This component is a little piece of glue between React router
// and our Scratchpad component. It takes in props.params.title, and
// shows the Scratchpad along with that title.
export default ({children, params: {room}}) =>
  <div>
    <h1>{room}</h1>
    {/* Here, we're passing in a Firebase reference to
        /scratchpads/$scratchpadTitle. This is where the scratchpad is
        stored in Firebase. Each scratchpad is just a string that the
        component will listen to, but it could be the root of a more complex
        data structure if we wanted. */}
    <div className="col-sm-9">
      <div className="col-sm-12">
        <MyEditor fireRef={db.ref('DraftJs').child(room)}/>
      </div>
    </div>
    <div className="col-sm-3">
      {/*sentiment bar is passed level 0-100*/}
      <Sentimentometer level="75"/>
      <SidebarContainer/>
    </div>
  </div>
