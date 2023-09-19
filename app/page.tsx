"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import PopupLogin from "@/components/PopupLogin";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <p>test</p>
      <div className="relative flex items-center cursor-pointer">
        {/* ==== Login popup handler */}
        {showLogin && <PopupLogin onClose={() => setShowLogin(false)} />}
        {/* ===== If signed in */}
        {session?.user ? (
          <>
            <Image
              width={100}
              height={100}
              src={session.user.image || "/img/user.png"}
              alt={session.user.name || "User Image"}
              className="w-8 h-8 rounded-full border-2 border-green-600"
              onClick={() => signOut()}
            />
            <p>{session.user.name || "User"}</p>
            <p>. Press on the image to log out</p>
          </>
        ) : (
          // ===== if not signed in
          <button aria-label="Log In / Sign In" onClick={() => setShowLogin(true)}>
            login
          </button>
        )}
      </div>
    </>
  );
}
