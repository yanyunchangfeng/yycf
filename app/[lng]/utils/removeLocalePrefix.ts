import siteMetadata from '@/data/siteMetadata';

export const removeLocalePrefix = (path: string) => {
  // 获取路径的第一部分（假设语言部分为路径的第一部分）
  const languages = siteMetadata.languages;
  const parts = path.split('/');
  if (languages.includes(parts[1])) {
    // 如果路径的第二部分是语言，移除该部分
    return '/' + parts.slice(2).join('/');
  }
  return path;
};
