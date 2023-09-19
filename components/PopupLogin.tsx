"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import ReactDOM from "react-dom";

type PopupLoginProps = {
  onClose: () => void;
};

const PopupLogin: React.FC<PopupLoginProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSignIn = async () => {
    // no need to set loading back to false because singIn does a full reload
    setIsLoading(true);
    await signIn("google");
  };

  const closeOnOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const content = (
    <div
      dir="ltr"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
      onClick={closeOnOverlayClick}
    >
      <div className="z-10 p-8 bg-white rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/5">
        <h2 className="text-xl text-black text-center font-semibold mb-4">Login / Sign Up</h2>
        <button
          className="flex items-center justify-center w-full mb-4 p-2 bg-white border-4 border-blue-400 text-blue-400 rounded hover:border-blue-500 hover:text-blue-500 gap-x-2"
          onClick={() => handleSignIn()}
        >
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <span>with Google</span>
            </>
          )}
        </button>

        <button
          className="w-full p-2 bg-white border-2 border-gray-300 text-gray-300 rounded hover:border-gray-400 hover:text-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

export default PopupLogin;
