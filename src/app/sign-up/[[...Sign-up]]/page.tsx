import { SignUp } from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#171717]">
      <SignUp />
    </div>
  );
}

export default Page;
