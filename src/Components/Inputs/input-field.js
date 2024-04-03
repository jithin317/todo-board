import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import {
  CheckedIcon,
  PasswordEyeClose,
  PasswordEyeOpen,
  RejectIcon,
} from "../../assets/icons/icons";

export default function Input({
  label = "",
  type = "text",
  isPassword = false,
  passwordCheck = false,
  name = "",
  id = "",
  inputClassName = " py-[0.5rem] bg-slate-200 px-[0.8rem] rounded-md outline-none focus:bg-transparent",
  placeholder = "Enter something",
  passwordCheckClass = "flex items-center justify-center gap-1",
}) {
  const [eyeIsOpen, setEyeIsOpen] = useState(false);
  return (
    <div className="flex flex-col select-none">
      <Field name={name}>
        {({ field, meta, form }) => (
          <>
            <div className="flex flex-col relative">
              <label htmlFor={id} className="text-[14px]  font-semibold">
                {label}
              </label>
              <input
                type={isPassword ? (eyeIsOpen ? "text" : type) : type}
                id={id}
                {...field}
                className={
                  meta.touched && meta.error
                    ? inputClassName + " border border-[#F94B4B]"
                    : "border border-gray-400" + inputClassName
                }
                placeholder={placeholder}
              />
              {isPassword && (
                <a
                  className="absolute right-[3%] top-[45%] cursor-pointer"
                  onClick={() => setEyeIsOpen(!eyeIsOpen)}
                >
                  {eyeIsOpen ? <PasswordEyeOpen /> : <PasswordEyeClose />}
                </a>
              )}
            </div>
            {passwordCheck && (
              <div className="flex flex-wrap gap-2 text-[13px] w-9/12 mx-3 my-1">
                <p
                  className={
                    meta.touched && meta.value.length < 8
                      ? `${passwordCheckClass}  text-[#F94B4B]`
                      : meta.touched
                      ? `${passwordCheckClass} text-lime-600`
                      : `${passwordCheckClass} text-slate-500`
                  }
                >
                  {meta.touched && meta.value.length < 8 ? (
                    <RejectIcon fill="#F94B4B" />
                  ) : meta.touched ? (
                    <CheckedIcon />
                  ) : (
                    <RejectIcon />
                  )}
                  {"  "}8 characters minimum
                </p>
                <p
                  className={
                    meta.touched && !Boolean(meta.value.match(/\d/))
                      ? `${passwordCheckClass} text-[#F94B4B]`
                      : meta.touched
                      ? `${passwordCheckClass} text-lime-600`
                      : `${passwordCheckClass} text-slate-500`
                  }
                >
                  {meta.touched && !Boolean(meta.value.match(/\d/)) ? (
                    <RejectIcon fill="#F94B4B" />
                  ) : meta.touched ? (
                    <CheckedIcon />
                  ) : (
                    <RejectIcon />
                  )}{" "}
                  1 number
                </p>
                <p
                  className={
                    meta.touched && !Boolean(meta.value.match(/[^A-Za-z0-9]/))
                      ? `${passwordCheckClass} text-[#F94B4B]`
                      : meta.touched
                      ? `${passwordCheckClass} text-lime-600`
                      : `${passwordCheckClass} text-slate-500`
                  }
                >
                  {meta.touched &&
                  !Boolean(meta.value.match(/[^A-Za-z0-9]/)) ? (
                    <RejectIcon fill="#F94B4B" />
                  ) : meta.touched ? (
                    <CheckedIcon />
                  ) : (
                    <RejectIcon />
                  )}{" "}
                  1 special character
                </p>
                <p
                  className={
                    meta.touched && meta.value === meta.value.toLowerCase()
                      ? `${passwordCheckClass} text-[#F94B4B]`
                      : meta.touched
                      ? `${passwordCheckClass} text-lime-600`
                      : `${passwordCheckClass} text-slate-500`
                  }
                >
                  {meta.touched && meta.value === meta.value.toLowerCase() ? (
                    <RejectIcon fill="#F94B4B" />
                  ) : meta.touched ? (
                    <CheckedIcon />
                  ) : (
                    <RejectIcon />
                  )}{" "}
                  1 uppercase letter
                </p>
              </div>
            )}
          </>
        )}
      </Field>
      {!passwordCheck && (
        <div style={{ minHeight: "1.2rem" }}>
          <ErrorMessage name={name}>
            {(msg) => (
              <span className="right text-[12px] text-[#F94B4B] flex justify-end">
                &middot; {msg}
              </span>
            )}
          </ErrorMessage>
        </div>
      )}
    </div>
  );
}
