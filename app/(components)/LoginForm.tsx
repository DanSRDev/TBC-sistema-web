"use client";
import React from "react";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";
import Link from "next/link";

type Props = {};

export default function LoginForm({}: Props) {

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-3 w-[360px]">
      <div className="flex-1 rounded-lg bg-gray-900 px-8 pb-8 pt-10">
        <h1 className="mb-3 text-2xl text-white font-bold">Iniciar Sesión</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-2 mt-5 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-2 mt-5 block text-xs font-medium text-white"
              htmlFor="password"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="ingrese su contraseña"
                required
              />
            </div>
          </div>
        </div>
        <p className="text-white text-xs mt-2">
          ¿No tiene una cuenta?
          <Link href={"/register"} className={"font-bold text-blue-600 inline-block"}>
            <p className="ml-1">Registrarse</p>
          </Link>
        </p>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div> 
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button className="flex h-16 items-center justify-center rounded-lg bg-blue-500 px-4 font-semibold text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 mt-6 w-full">
      Iniciar Sesión
    </button>
  );
}
