const { execSync } = require('child_process');
const os = require('os');

// 获取局域网 IPv4 地址
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost'; // 如果无法获取，回退到 localhost
}

const localIP = getLocalIP();

console.log(`🚀 Starting Next.js on http://${localIP}:3000`);
execSync(`next dev -H ${localIP}`, { stdio: 'inherit' });
