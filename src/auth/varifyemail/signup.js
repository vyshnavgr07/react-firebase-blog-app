import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";

const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
    console.log("Verification email sent!");
  } catch (error) {
    console.error("Error sending verification email:", error.message);
  }
};


const signUpUser = async (auth,email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendVerificationEmail(user);
    console.log("Sign-up successful! Verification email sent.");
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};


export default signUpUser
