import React from 'react'
import { connect } from 'react-redux'
import firebase from 'APP/fire'
import Editor from '../components/Editor'
const db = firebase.database()

// import MyEditor from '../components/Editor'
// import SidebarContainer from './SidebarContainer'
// import ResearchContainer from './ResearchContainer'
// // This component is a little piece of glue between React router
// // and our Scratchpad component. It takes in props.params.title, and
// // shows the Scratchpad along with that title.
// export default ({params: {room}}) =>
//   <div>
//     <h1>{room}</h1>
//     {/* Here, we're passing in a Firebase reference to
//         /scratchpads/$scratchpadTitle. This is where the scratchpad is
//         stored in Firebase. Each scratchpad is just a string that the
//         component will listen to, but it could be the root of a more complex
//         data structure if we wanted. */}
//     <div className="col-sm-9">
//       <div className="col-sm-12">
//       	<MyEditor fireRef={db.ref('DraftJs').child(room)}/>
//       </div>
//       {/*<div className="col-sm-12">
//         <ResearchContainer/>
//       </div>*/}
//     </div>
//     <div className="col-sm-3">
//   		<SidebarContainer/>
//   	</div>
//   </div>


const mapState = (state) => {
	return{

    fireRef: db.ref('DraftJs').child('room')

  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(Editor)

