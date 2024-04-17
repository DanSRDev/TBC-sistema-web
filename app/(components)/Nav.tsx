import { signOut } from "@/auth";
import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="flex px-6 h-20 items-center justify-between bg-neutral-800 text-white w-full">
      <p className="text-2xl font-bold">TBC System</p>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-12 grow items-center justify-center gap-2 rounded-md border border-white bg-neutral-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Cerrar Sesión</div>
          </button>
        </form>
    </div>
  );
}
