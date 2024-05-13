import React from "react";
import RegisterForm from "../(components)/RegisterForm";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: 'Registrarse',
};

export default function Register({}: Props) {
  return (
    <div className="h-screen flex bg-gray-800">
      <div className="flex flex-1 justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
}
