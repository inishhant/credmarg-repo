import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center">
        <Image
          src="https://credmarg.com/lg.svg"
          alt="Credmarg Logo"
          width={50}
          height={50}
        />
        <h1 className="text-4xl font-bold mb-8 mt-6 ml-2 text-white">
          CredMarg Admin Dashboard
        </h1>
      </div>
      <div className="flex p-6 rounded-lg shadow-md bg-gradient-to-r from-green-600 to-green-800 text-white text-2xl">
        {/* <h2 className="text-2xl font-semibold mb-4 text-black">Data Lists</h2> */}
        <ul className="flex list-none p-0">
          <li className="ml-6 mb-4 mr-6">
            <Link href="/data" className="text-white">
              <p className="button inline-block py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:transition duration-300">All Members</p>
            </Link>
          </li>
          <li className="mb-4 mr-6">
            <Link href="/employees" className="text-white">
            <p className="button inline-block py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:transition duration-300">Employee Data</p>
            </Link>
          </li>
          <li className="mb-4 mr-6">
            <Link href="/vendors" className="text-white">
            <p className="button inline-block py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:transition duration-300">Vendor Data</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
