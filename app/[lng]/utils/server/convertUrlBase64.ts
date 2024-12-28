export const convertUrlBase64 = async (imageUrl: string) => {
  try {
    // 使用 fetch 下载图片数据
    const response = await fetch(imageUrl, { headers: {} });

    if (!response.ok) {
      throw new Error('Failed to fetch the image');
    }

    // 获取图片数据并转换为 Buffer
    const buffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    // 将图片数据转换为 Base64 编码
    const base64Image = imageBuffer.toString('base64');

    // 构建 data URI
    const base64DataUri = `data:image/jpeg;base64,${base64Image}`; // 根据图片格式修改 `image/jpeg`

    // 存储 Base64 数据（这里可以选择存储到数据库）

    // 返回 Base64 数据
    return base64DataUri;
  } catch (error) {
    console.log('🚀 ~ convertUrlBase64 ~ error:', error);
    return '';
  }
};
