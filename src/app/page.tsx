import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function Home({children}:{children: React.ReactNode}) {
  return(

      <main>{children}</main>

  );
}
