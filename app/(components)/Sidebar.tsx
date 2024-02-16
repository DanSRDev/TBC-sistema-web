"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

type Props = {};

const links = [
  { name: "Dashboard", href: "/sistema/dashboard" },
  { name: "Diagnostico", href: "/sistema/diagnostico" },
  { name: "Historial", href: "/sistema/historial" },
];

export default function Sidebar({}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-60 bg-gray-200 p-2 gap-2">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center justify-center bg-white hover:bg-sky-100 text-blue-600 font-bold h-16 rounded-xl",
              { "bg-sky-100 text-blue-600": pathname === link.href }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
