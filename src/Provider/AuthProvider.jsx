import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import app from '../Firebase/firebase.config';


export const AuthContext = createContext({ user: null });
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);


  // Create a new user
  const createUser  = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  // Sign in with email and password
  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  // Sign in with Google
  const handleSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      return userCredential;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  // Log out the user
  const handleLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  // Update user profile
  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateProfile(auth.currentUser , updatedData);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // Reset password
  const handleResetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  // Context value
  const authInfo = {
    user,
    setUser ,
    createUser ,
    signInWithEmail,
    handleSignInWithGoogle,
    handleLogOut,
    loading,
    handleUpdateProfile,
    handleResetPassword,
    setDetails,
    details
  };

  // Monitoring authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser ) => {
      setUser (currentUser );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;