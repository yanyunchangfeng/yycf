import { NextRequest } from 'next/server';

export const withLogging = (index: number, next: (request: NextRequest) => void) => {
  return async (request: NextRequest) => {
    console.log(`Middleware withLogging index is ${index} running`, request.url);
    return next(request);
  };
};
