// "use client";
// import { Button } from "@/components/ui/button";
// import { Registerschema } from "../../../Schema/RegisterSchema";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";

// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { Controller, useForm } from "react-hook-form";
// import * as zod from "zod";
// import { useRouter } from "next/navigation";
// export default function ForgetPasswordForm() {
//   const router = useRouter();
//   let form = useForm({
//     defaultValues: {
//       email: "",
//     },
//     resolver: zodResolver(Registerschema),
//   });
//   async function submitform(values: zod.infer<typeof Registerschema>) {
//     console.log(values);
//     const response = await fetch(
//       `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
//       {
//         method: "POST",
//         body: JSON.stringify(values),
//         headers: {
//           "content-type": "application/json",
//         },
//       }
//     );
//     const payload = await response.json();
//     console.log(payload);
//     if (payload.message == "success") {
//       router.push("/");
//     }
//   }

//   return (
//     <>
//       <div className="container w-1/2 mx-auto p-5 bg-gray-300 mt-10 rounded-2xl">
//         <h2 className="text-green-600 font-bold text-2xl">Register Now</h2>
//         <form onSubmit={form.handleSubmit(submitform)}>
//           <div className="mt-4">
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                   <Input
//                     className="bg-white"
//                     {...field}
//                     id={field.name}
//                     aria-invalid={fieldState.invalid}
//                     placeholder="Enter your email"
//                     autoComplete="on"
//                   />

//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </div>

//           <Button type="submit" className="my-5 w-full">
//             Submit
//           </Button>
//         </form>
//       </div>
//     </>
//   );
// }
