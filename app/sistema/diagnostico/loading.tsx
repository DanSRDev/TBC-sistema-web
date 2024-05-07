import { ModuloDiagnosticoSkeleton } from '@/app/(components)/ui/skeletons'
import React from 'react'

type Props = {}

export default function loading({}: Props) {
  return (
    <div className="flex flex-col items-center w-full h-full mx-4">
      <h1 className="my-8 text-5xl font-semibold">Módulo de Diagnóstico</h1>
      <ModuloDiagnosticoSkeleton/>
    </div>
  )
}