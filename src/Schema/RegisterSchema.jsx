import React from "react";
import * as zod from "zod";

export let Registerschema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is requird")
      .min(3, "name min 3 char")
      .max(8, "name max 8 char"),
    email: zod
      .string()
      .nonempty("email is required")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invaild mail"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "invaild passworrd"
      ),
    rePassword: zod.string().nonempty(" rePassword is required"),
    phone: zod
      .string()
      .nonempty(" phone is required")
      .regex(/^01[0125][0-9]{8}$/, "invaled phone"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "invaled rePassword",
  });
// --------------

export let changpass = zod.object({
  email: zod
    .string()
    .nonempty("email is required")
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "invaild mail"),
});

export let code = zod.object({
  resetCode: zod
    .string()
    .nonempty("email is required")
    .max(6, "name max 6 num"),
});
// ---------------------

export let updatePassword = zod

  .object({
    currentPassword: zod
      .string()
      .nonempty("urrentPassword is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
        "invaild passworrd"
      ),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/,
        "invaild passworrd"
      ),
    rePassword: zod.string().nonempty(" rePassword is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "invaled rePassword",
  });
