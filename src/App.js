
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app)

function App() {
 
const googleProvider = new GoogleAuthProvider()
const gitProvider = new GithubAuthProvider()
const [user, setUser] = useState({})


const handleGoogleSignIn = ()=>{
  signInWithPopup(auth, googleProvider)
  .then((result)=>{
    const user = result.user
    console.log(user)
    setUser(user)
  })
  .catch((error)=>{
    console.error('error', error)
  })
}

const handleGitProvider = ()=>{
 signInWithPopup(auth, gitProvider)
 .then((result)=>{
  const user = result.user
  setUser(user)
 })
 .catch((error)=>{
  console.error(error)
 })
}

const handleSignOut=()=>{
  signOut(auth)
  .then(()=>{
   setUser({})
  })
  .catch(()=>{

  })
}
  return (
    <div className="App">
     { user.displayName?
     <button onClick={handleSignOut}>SignOut</button>
     :
       <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGitProvider}>Git Sign In</button>
       </div>
      }
      <h1>{user.displayName}</h1>
    </div>
  );
}

export default App;
