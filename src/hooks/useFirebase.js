import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  getIdToken,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import initFirebaseAuth from '../firebase/firebase.init';
import axios from 'axios';

initFirebaseAuth();

const useFirebase = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState({});
  const [authErrors, setAuthErrors] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState('');

  const signUpUsingEmail = (email, password, username, img) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = { email, displayName: username, photoURL: img };
        setUser(newUser);
        setAuthErrors('');
        saveUser(email, username, img, 'post');
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: img,
        })
          .then(() => {
            setUser(auth.currentUser);
            setAuthErrors('');
          })
          .catch((error) => {
            setAuthErrors(error.message);
          });
      })
      .catch((error) => {
        setAuthErrors(error.message);
      });
  };

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setAuthErrors('');
      })
      .catch((error) => {
        setAuthErrors(error.message);
      });
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setAuthErrors('');
        saveUser(
          result.user.email,
          result.user.displayName,
          result.user.photoURL,
          'put'
        );
      })
      .catch((error) => {
        setAuthErrors(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logOutWithGoogle = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setAuthErrors('');
      })
      .catch((error) => {
        setAuthErrors(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveUser = (email, username, img, method) => {
    axios({
      method: method,
      url: 'https://powerful-retreat-84363.herokuapp.com/users',
      data: {
        email,
        username,
        img,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user)
          .then((idToken) => setToken(idToken))
          .catch((error) => console.log(error.message));
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    axios
      .get(`https://powerful-retreat-84363.herokuapp.com/users/${user?.email}`)
      .then((response) => setAdmin(response.data.admin))
      .catch((error) => console.log(error.message));
  }, [user?.email]);

  return {
    user,
    token,
    admin,
    authErrors,
    isLoading,
    signUpUsingEmail,
    signInWithEmail,
    signInWithGoogle,
    logOutWithGoogle,
  };
};

export default useFirebase;
