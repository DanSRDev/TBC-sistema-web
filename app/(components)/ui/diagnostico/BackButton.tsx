'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {}

export default function BackButton({}: Props) {

 const router = useRouter();
  return (
   
    <Button onClick={router.back}>Cancelar</Button>
  )
}