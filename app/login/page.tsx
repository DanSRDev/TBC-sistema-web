import React from "react";
import LoginForm from "../(components)/LoginForm";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
};

export default function Login({}: Props) {
  return (
    <div className="h-screen flex bg-gray-800">
      <div className="flex flex-1 justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
