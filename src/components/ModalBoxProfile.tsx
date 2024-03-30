import Link from "next/link";
import React from "react";

interface props {
  close: () => void;
  logoutAction: () => void;
}

const ModalBoxProfile = ({ close, logoutAction }: props) => {
  return (
    <div className="absolute z-10 top-12 -right-10  bg-primar rounded-lg shadow-lg border flex flex-col items-start gap-y-2 overflow-hidden border-slate-800">
      <Link
        href={"/favorite"}
        onClick={close}
        className="hover:bg-slate-700 w-full p-3 px-6 whitespace-nowrap"
      >
        My Favorite
      </Link>
      <button className="hover:bg-slate-700 w-full  p-3 px-6" onClick={logoutAction}>
        Logout
      </button>
    </div>
  );
};

export default ModalBoxProfile;
