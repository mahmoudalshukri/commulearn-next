"use client";
import Image from "next/image";
import { useState } from "react";

const Modal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`w-7 h-7 flex items-center justify-center rounded-full bg-[#263b70]`}
        onClick={() => setOpen(true)}>
        <Image src="/PencilSimple.png" alt="icon" width={16} height={16} />
      </button>
      {open && (
        <>
          <div className="w-screen h-screen fixed left-0 top-0 z-50 bg-black opacity-50"></div>
          <div className="w-screen h-screen fixed left-0 top-0 z-50 flex items-center justify-center">
            <div className="bg-white  p-4 rounded-2xl relative w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] ">
              <div className="flex flex-col gap-4 items-center justify-center pt-6">
                <p className="text-[#263b70] text-sm">Limited time only</p>
                <h1 className="text-[#263b70] text-4xl font-bold text-center">
                  Here{`'`}s a 15% discount on <br /> your first subscription!
                </h1>
                <p className="text-[#263b70] text-center text-lg font-semibold">
                  it{`'s`} all about the good stuff! Sign up to be the first to
                  know about our latest releases, new ideas and special offers.
                </p>
                <input
                  type="text"
                  placeholder="Full name"
                  className="border-1 border-gray-300 px-4 py-2 h-10 rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="border-1 border-gray-300 px-4 py-2 h-10 rounded-md w-full"
                />
                <button className="bg-[#263b70] text-white w-full rounded-md h-12">
                  Sign up
                </button>
                <button className="flex items-center justify-center bg-[#263b70] text-white w-full rounded-md h-12">
                  <Image
                    src="/google-icon.png"
                    alt="google icon"
                    width={16}
                    height={16}
                  />
                  Sign up with Google
                </button>
              </div>
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setOpen(false)}>
                <Image
                  src="/close.png"
                  alt="close icon"
                  width={14}
                  height={14}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
