import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import siteMetadata from '@/data/siteMetadata';

const { fallbackLanguage, languages } = siteMetadata;

function getLocale(req: NextRequest) {
  let language = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!language) language = fallbackLanguage;
  return language;
}
acceptLanguage.languages(languages);

export const withLanguage = (index: number, next: (request: NextRequest) => void) => {
  return async (request: NextRequest) => {
    console.log(`Middleware withLanguageindex is ${index} running`, request.url);
    const { pathname } = request.nextUrl;

    // 判断路径中是否存在支持的语言
    const filtedLanguage = languages.filter(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (filtedLanguage.length > 0) {
      if (filtedLanguage[0] === fallbackLanguage) {
        //下面注释的代码有一个bug 因为如果用户改了浏览器的首选语言会导致切换失败
        // /zh/xxx 重定向到 `/xxx`
        // const url = pathname.replace(`/${fallbackLanguage}`, '');
        // return NextResponse.redirect(new URL(url ? url : '/', request.url));
        return next(request);
      }
      // 其他跳过
      return next(request);
    }
    // 获取匹配的 locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    // 默认语言不重定向
    if (locale == fallbackLanguage) {
      return NextResponse.rewrite(request.nextUrl);
    }
    // 重定向，如 /products 重定向到 /en/products
    return Response.redirect(request.nextUrl);
  };
};
