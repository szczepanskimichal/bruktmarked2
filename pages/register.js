import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
import FormInput from "@/components/inputs/FormInput";
import { signIn } from "next-auth/react";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";

export default function RegisterPage() {
  // State variables
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  // Validate email
  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.com$/;
    if (email !== "") {
      if (!regex.test(email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    } else {
      setEmailError(null);
    }
  }, [email]);

  // Validate password length
  useEffect(() => {
    if (password !== "") {
      if (password.length > 0 && password.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    } else {
      setPasswordError(null);
    }
  }, [password]);

  // Validate password confirmation
  useEffect(() => {
    if (password2 !== "") {
      if (password !== password2) {
        setPassword2Error(true);
      } else {
        setPassword2Error(false);
      }
    } else {
      setPassword2Error(null);
    }
  }, [password, password2]);

  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();
    setCreatingUser(true);
    if (!emailError && !passwordError && !password2Error) {
      try {
        const response = await axios.post("/api/register", {
          email,
          password,
        });
        toast.success(`User ${response.data.email} created!`);
        router.push("/login");
      } catch (error) {
        if (error.response?.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
      setCreatingUser(false);
    } else {
      toast.error("Invalid credentials.");
    }
  }

  // Return form layout
  return (
    <Layout>
      <div className="flex justify-center items-center h-full bg-gray-100">
        <motion.div
          variants={fadeIn("down", "spring", 0, 1)}
          initial="hidden"
          whileInView="show"
          className="box p-4 w-[25rem] bg-white z-10"
        >
          <h3 className="text-xl font-bold mb-4">Register</h3>

          {/* Form wrapping the inputs */}
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="email"
              label="Email"
              value={email}
              onChange={setEmail}
              error={emailError}
              incorrect="Your email is invalid."
              correct="Your email is correct!"
            />
            <FormInput
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
              error={passwordError}
              incorrect="Your password is too short."
              correct="Your password is correct!"
            />
            <FormInput
              type="password"
              label="Repeat your password"
              value={password2}
              onChange={setPassword2}
              error={password2Error}
              incorrect="Your passwords should match."
              correct="Your passwords are correct!"
            />
            <button
              className="primary mt-3 w-full flex justify-center bg-blue-500 text-white py-2"
              type="submit"
              disabled={creatingUser}
            >
              Register
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="border border-black flex justify-center items-center gap-2 w-full py-2"
          >
            <FcGoogle />
            Login with Google
          </button>

          <div className="text-center mt-5 text-gray-500 border-t pt-3">
            Already have an account? Log In{" "}
            <Link
              className="hover:text-primary transition-all delay-100 duration-300 hover:decoration-primary underline cursor-pointer"
              href={"/login"}
            >
              here
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
