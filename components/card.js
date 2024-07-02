import { send_email } from "@/utils/send_email";
import React, { useState, useRef } from "react";
import Loader from "./loader";
import { update_member } from "@/utils/create_member";
import Modal from "./modal";
import UpdateForm from "./update_form";

const Card = ({ card }) => {
  const [loader, setLoader] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const formRef = useRef(null);

  // function openMyForm() {
  //   setOpenForm(true);
  // }
  // function closeMyForm() {
  //   setOpenForm(false);
  // }


  const send_email_to_vendor = async () => {
    setLoader(true);
    const res = await send_email(card.email);
    if (res) {
      setLoader(false);
    }
  };
  
  // const update_cur_member = async () => {
  //   setLoader(true);
  //   const res = await update_member(card.id,);
  //   if (res) {
  //     setLoader(false);
  //   }
  // };
  return (
    <>
      {!loader && (
        <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-green-800 to-green-600 text-white text-2xl relative flex flex-col">
          {card.type && <p className="mr-2">{card.type.toUpperCase()}</p>}
          {card.type && <hr className="mb-5" />}
          <div className="flex-grow mb-10">
            <p className="font-bold">{card.name}</p>
            <p className="text-sm">{card.email}</p>
          </div>
          <div className="flex self-end space-x-2">
            {/* <div
              className="cursor-pointer px-4 py-2 text-white font-semibold rounded-lg text-sm self-end"
              style={{
                background: "linear-gradient(to right, #000000, #434343)",
                width: "auto",
              }}
              onClick={openMyForm}
            >
              Edit
            </div> */}
            {card.type === "vendor" && (
              <div
                className="cursor-pointer px-4 py-2 text-white font-semibold rounded-lg text-sm self-end"
                style={{
                  background: "linear-gradient(to right, #000000, #434343)",
                  width: "auto",
                }}
                onClick={send_email_to_vendor}
              >
                Send Email
              </div>
            )}
          </div>
        </div>
      )}
      {loader && <Loader />}
      {/* {!loader && openForm && (
        <Modal isOpen={openForm} onClose={closeMyForm}>
        <UpdateForm form_type={card.type} id={card._id} formValues={card}/>
      </Modal>
      )} */}
    </>
  );
};

export default Card;
