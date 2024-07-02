import Card from "@/components/card";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MyForm from "@/components/form";
export default function Data({ data }) {
  const [openForm, setOpenForm] = useState(false);
  const formRef = useRef(null);

  function openMyForm() {
    setOpenForm(true);
  }
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setOpenForm(false);
    }
  };

  useEffect(() => {
    if (openForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openForm]);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {!openForm && (
        <div>
          <div className="relative flex items-center justify-center text-5xl mt-5 mb-10">
            <div className="absolute left-0 ml-4">
              <Link href="/">
                <Image
                  height={40}
                  width={40}
                  src="/assets/images/back-arrow_11839407.png"
                  alt="go-back-button"
                  className="back-button"
                />
              </Link>
            </div>
            <div>List of all Employees and Vendors</div>
            <div
              className="absolute right-0 mr-4 cursor-pointer px-4 py-2 text-white font-semibold rounded-lg text-sm"
              style={{
                background: "linear-gradient(to right, #32CD32, #228B22)",
              }}
              onClick={openMyForm}
            >
              Add Member
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-20 mr-20">
            {data.map((d) => (
              <Card key={d._id} card={d} />
            ))}
          </div>
        </div>
      )}
      {openForm && (
        <div ref={formRef}>
          <MyForm />
          {/* <MyForm form_type={"employee"}/> */}
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.LOCAL_URL}/api/data`;
  const request = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await request.json();
  return {
    props: {
      data,
    },
  };
}
