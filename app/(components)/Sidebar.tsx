import Link from "next/link";
import React from "react";

type Props = {};

const links = [
  { name: "Dashboard", href: "/sistema/dashboard" },
  { name: "Diagnostico", href: "/sistema/diagnostico" },
  { name: "Historial", href: "/sistema/historial" },
];

export default function Sidebar({}: Props) {
  return (
    <div className="flex flex-col w-60 bg-gray-200 p-2 gap-2">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center justify-center bg-white hover:bg-gray-100 text-blue-500 font-bold h-16 rounded-xl"
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
