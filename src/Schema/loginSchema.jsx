import React from "react";
import * as zod from "zod";

export let schemaLogin = zod.object({
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
});
