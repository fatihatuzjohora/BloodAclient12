import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// import useAxiosPublic from "../hook/useAxiosPublic";
import { createContext, useEffect, useState } from "react";
import app from "../Components/Firebase/firebase.config";
import { getAuth } from "firebase/auth";
import useAxiosPublic from "../hook/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUserProfile = (name, image, email) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
      email: email,
    })
      .then(() => {
        // Profile updated!
        // ...
        setUser({ displayName: name, photoURL: image, email: email });
        // eslint-disable-next-line no-unused-vars
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  // sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const info = {
    createUser,
    signInUser,

    logout,
    user,

    updateUserProfile,
    loading,
    setLoading,
  };
  return (
    <>
      <AuthContext.Provider value={info}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
