import { NextRequest, NextResponse } from 'next/server';

type fn = (index: number, next: (request: NextRequest) => void) => void;

export const chain = (functions: fn[], index = 0) => {
  const current = functions[index];
  if (current) {
    const next = chain(functions, index + 1) as (request: NextRequest) => void;
    return current(index, next);
  }
  return () => {
    console.log('end of chain');
    NextResponse.next();
  };
};
