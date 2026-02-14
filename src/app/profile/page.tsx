"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
  const router = useRouter();
  return (
    <>
      <Button>
        <Link href={"/forgetPassword"}>change password</Link>
      </Button>
    </>
  );
}
