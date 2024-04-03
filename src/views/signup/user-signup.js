import React from "react";
import * as Yup from "yup";
import SignUpIMG from "../../assets/images/signup-img.jpg";
import Heading from "../../Components/Heading/Heading";
import Blob from "../../assets/blobs/blob-shape";
import Input from "../../Components/Inputs/input-field";
import { Form, Formik } from "formik";
import { AuthButton } from "../../Components/Buttons/Button";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
  ErrorToast,
  SuccessToast,
} from "../../Components/Toasts/toastContainer";
import { Link, useNavigate } from "react-router-dom";
import ImageDiv from "../../Components/Images/ImageDiv";

export default function SignUpPage() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    user_cpwd: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required!")
      .min(8, "Must be minimum 8 characters long!")
      .max(20, "Must be maximum 20 characters long!"),
    email: Yup.string()
      .email("Must be a valid email!")
      .required("Email is required!"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required!"),
    user_cpwd: Yup.string()
      .min(8, "Must be minimum 8 characters long!")
      .required("Password is required!")
      .oneOf([Yup.ref("password")], "Passwords must be equal!"),
  });
  async function onSubmit(values) {
    const { email, username, password } = values;
    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);
      if (!response.data.status) {
        ErrorToast({ message: response.data.msg });
      } else {
        SuccessToast({ message: response.data.msg });
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      ErrorToast({ message: err.response.data.msg ?? err.message });
    }
  }
  return (
    <div className="main-container flex">
      <div className="form-div flex items-center justify-center w-3/5 h-screen relative">
        <div className="w-full h-full absolute z-0 ">
          <Blob
            fill="#08BDBA"
            viewBox="0 0 400 300"
            transform="translate(80 80)"
            d="M52.8,-18.1C60.8,7.5,54.4,36.8,34.1,53C13.8,69.1,-20.4,72.2,-36.8,58.4C-53.3,44.7,-51.9,14.1,-42.8,-13C-33.7,-40.2,-16.9,-63.9,2.8,-64.8C22.4,-65.7,44.8,-43.8,52.8,-18.1Z"
          />
          <Blob
            fill="#FA4D56"
            viewBox="0 0 400 340"
            transform="translate(350 60)"
            d="M35.6,-31.1C47.2,-24,58.3,-12,59.7,1.4C61.2,14.9,52.9,29.8,41.4,45.6C29.8,61.3,14.9,77.9,-3.4,81.3C-21.6,84.7,-43.3,74.8,-54.5,59C-65.8,43.3,-66.7,21.6,-62.6,4.1C-58.4,-13.4,-49.3,-26.8,-38,-33.8C-26.8,-40.9,-13.4,-41.7,-0.7,-41C12,-40.3,24,-38.2,35.6,-31.1Z"
          />
          <Blob
            fill="#F1C21B"
            viewBox="0 0 400 345"
            transform="translate(200 300)"
            d="M54.9,-56.6C66.8,-43.1,68.9,-21.5,68.7,-0.2C68.5,21.1,65.9,42.1,54,53.6C42.1,65.1,21.1,67,2.3,64.7C-16.4,62.3,-32.9,55.8,-41.4,44.3C-49.9,32.9,-50.5,16.4,-49.7,0.8C-48.9,-14.8,-46.7,-29.6,-38.1,-43.2C-29.6,-56.7,-14.8,-69,3.4,-72.4C21.5,-75.7,43.1,-70.2,54.9,-56.6Z"
          />
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => {
            return (
              <Form className="flex flex-col justify-center w-1/2 h-[20rem] z-[1]">
                <Heading
                  heading="Hey ! Welcome"
                  subheading="Please register your account to continue ..."
                  HeadingColor="darkColor"
                />
                <Input
                  label="Username"
                  name="username"
                  id="username"
                  placeholder="Your Username"
                />
                <Input
                  label="Email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  id="password"
                  passwordCheck={true}
                  placeholder="Password"
                  isPassword={true}
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  name="user_cpwd"
                  id="cpassword"
                  placeholder="Confirm Password"
                  isPassword={true}
                />
                <AuthButton text="Get Started" />
                <div className="mt-3 text-sm w-full text-center">
                  Already Have an Account ?{" "}
                  <Link to={"/login"} className="text-cyan-900 font-bold">
                    Log In
                  </Link>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ImageDiv src={SignUpIMG} className="image-div w-1/2 h-screen relative" />
    </div>
  );
}
