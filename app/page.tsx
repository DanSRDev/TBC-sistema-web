import Link from "next/link";
import React from "react";
import { inter } from "./(components)/ui/fonts";
import Image from "next/image";

type Props = {};

export default function page({}: Props) {
  const links = [
    { name: "Registrarse", href: "/register" },
    { name: "Iniciar Sesión", href: "/login" },
  ];

  return (
    <div className="flex flex-col bg-neutral-800 w-full h-screen text-white">
      <div className="flex px-6 h-20 items-center justify-end w-full">
        <div className="flex gap-8">
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={
                  "flex items-center justify-center bg-neutral-800 text-white border border-white hover:bg-white hover:text-black text-sm font-medium h-12 px-4 rounded-xl"
                }
              >
                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex grow items-center justify-between px-24 w-full">
        <div>
          <p className={`${inter.className} text-6xl`}>
            Sistema de <br />detección de Tuberculosis
          </p>
        </div>
        <div>
        <Image
          src="/img/neural-net.png"
          width={550}
          height={550}
          alt="Neural network icons created by dmitrychae - Flaticon"
        />
        </div>
      </div>
    </div>
  );
}
