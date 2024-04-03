import React from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Input from "../Inputs/input-field";
import Button from "../Buttons/Button";
import Heading from "../Heading/Heading";
import { CancelIcon } from "../../assets/icons/icons";
import { SuccessToast } from "../Toasts/toastContainer";

const token = JSON.parse(localStorage.getItem("token")) ?? null;

export default function AddModal({ clkFn, addFn, isAdded }) {
  async function OnSubmit(values) {
    try {
      const response = await axios.post("http://localhost:4000/todos", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      SuccessToast({ message: response.data.msg });
      clkFn(false);
      addFn(!isAdded);
    } catch (err) {
      console.log(err.message);
      SuccessToast({ message: err?.data?.msg });
    }
  }

  const initialValues = {
    desc: "",
  };
  const validationSchema = Yup.object({
    desc: Yup.string()
      .required("Description is required!")
      .min(8, "Must be minimum 8 characters long!")
      .max(35, "Must be maximum 35 characters long!"),
  });
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.3, transition: { duration: 0.5 } }}
      onClick={() => clkFn(false)}
    >
      <motion.div
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        className="light_bg flex flex-col gap-2 rounded-2xl p-4 shadow-md w-[40%] mx-auto"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, y: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 12,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 0.5],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div className="relative">
          <Heading heading="Add Todo" />
          <CancelIcon
            className="absolute top-2 right-2 py-1 px-2 text-center cursor-pointer rounded-full"
            onclkFn={() => clkFn(false)}
          />
        </motion.div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={OnSubmit}
        >
          {({ values }) => {
            return (
              <Form>
                <Input
                  label="Description"
                  name="desc"
                  id="desc"
                  placeholder="Add Something ..."
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    type="submit"
                    text="Add"
                    color="bg-blue-900 bg-opacity-50 text-blue-600 font-bold"
                  />
                  <Button
                    text="Cancel"
                    onclkFn={() => clkFn(false)}
                    color="bg-zinc-900 bg-opacity-50 text-gray-900 font-bold"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </motion.div>
  );
}
