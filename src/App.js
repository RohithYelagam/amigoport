import { React, useEffect } from "react";
import { closeallclubs } from "./components/redux/allclubSlice";
import { useSelector, useDispatch } from "react-redux";
import { login, selectUser, logout } from "./components/redux/userSlice";
import { auth } from "./firebase";
import Login from "./components/scripts/login";
import LoggedIn from "./components/scripts/loggedin";
import axios from "./axios";
import "./App.css";
import { closeClubs } from "./components/redux/clubSlice";


function App() {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const addusertodb = (authuser) => {
    axios.post("/new/user", {
      user_id: authuser.uid,
      user_name: authuser.displayName,
      email: authuser.email,
      photo: authuser.photo,
    });
  };

  // useEffect function
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            name: authUser.displayName,
          })
        );
        addusertodb(authUser);
      } else {
        dispatch(logout());
        dispatch(closeallclubs());
        dispatch(closeClubs());
      }
    });
  }, []);

  return (
    <div className="App">
      {user != null ? (
        <div>
          <LoggedIn className="loggedIn" />
        </div>
      ) : (
          <div className="background" ><Login /></div>
      )}
    </div>
  );
}

export default App;
