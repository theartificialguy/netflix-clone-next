import Head from "next/head";
import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const AuthenticationPageWrapper = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        alt="#"
        layout="fill"
        objectFit="cover"
        src="https://rb.gy/p2hphi"
        className="-z-10 opacity-30"
      />

      <img
        alt="#"
        src="http://rb.gy/ulxxee"
        className="absolute left-6 top-4 h-[70px] w-[120px] object-contain cursor-pointer md:left-10 md:h-[100px] md:w-[150px]"
      />

      {children}
    </div>
  );
};

export default AuthenticationPageWrapper;
