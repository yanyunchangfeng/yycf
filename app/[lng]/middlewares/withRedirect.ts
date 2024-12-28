import {
  NextRequest
  //  NextResponse
} from 'next/server';

export const withRedirect = (index: number, next: (request: NextRequest) => void) => {
  return async (request: NextRequest) => {
    console.log(`Middleware withRedirect index is ${index} running`, request.url);
    return next(request);
  };
};
