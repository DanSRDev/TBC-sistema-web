import React from 'react'

type Props = {
  children: React.ReactNode;
}

export default function Modal({children} : Props) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-6 border shadow-lg rounded-md bg-white">
        <div className="text-center">
          {children}
        </div>
      </div>
    </div>
  );
}