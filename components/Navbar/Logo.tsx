"use client";

import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Logo = () => {
  return (
    <Image
        src={"/Logo.png"}
        alt="Logo"
        height={80}
        width={80}
        className="w-16 h-10 md:w-20 md:h-12 cursor-pointer"
        onClick={() => {
            redirect("/");
        }}
      />
  )
}

export default Logo