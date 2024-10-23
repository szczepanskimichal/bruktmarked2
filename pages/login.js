import FormInput from "@/components/inputs/FormInput";
import Layout from "@/components/layout/Layout";
import { fadeIn } from "@/utils/motion";
import axios from "axios";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(null);
  const router = useRouter();
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
  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!emailError && !passwordError) {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setLoading(false);
      if (response.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Logged in successfully");
        router.push("/");
      }
    } else {
      toast.error("Invalid credentials.");
    }
  }
  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <motion.form
          variants={fadeIn("down", "spring", 0, 1)}
          initial="hidden"
          whileInView="show"
          className="box p-4 w-[25rem]"
          onSubmit={handleFormSubmit}
        >
          <h3>Login</h3>
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
          <button
            className="primary mt-3 w-full flex justify-center"
            type="submit"
            disabled={loading}
          >
            Login
          </button>
          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button
            type="button"
            className="border border-black flex justify-center items-center gap-2 w-full"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <FcGoogle />
            Login with Google
          </button>
          <div className="text-center mt-5 text-gray-500 border-color-800 border-t pt-3">
            Don't have an account yet? Register{" "}
            <Link
              className="hover:text-primary transition-all delay-100 duration-300 hover:decoration-primary underline"
              href={"/register"}
            >
              here
            </Link>
          </div>
        </motion.form>
      </div>
    </Layout>
  );
}
