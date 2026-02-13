import React from "react";

import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function Loading({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <>
      <div className=" container m-auto flex justify-center items-center">
        <LoaderIcon
          role="status"
          aria-label="Loading"
          className={cn(
            "size-4 animate-spin",
            (className = "flex justify-center items-center")
          )}
          {...props}
        />
      </div>
    </>
  );
}

export { Loading };
