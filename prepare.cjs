const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

// Exact versions and checksums make local and cloud previews use the same assets.
const assets = [
  ['react.js', 'react@18.3.1/umd/react.development.js', '28348fef6cb0ed8b2ceeb22deaf824428fd13875d84c73d38f77dd216fc24e7f'],
  ['react-dom.js', 'react-dom@18.3.1/umd/react-dom.development.js', 'f9044a5e9c39db8bb1a204dff924e526ec0a621e695bb69de1035811be8709e4'],
  ['dayjs.js', 'dayjs@1.11.10/dayjs.min.js', '9cfdb93f38afcf2d076abecd66d32bfd3383cdf1967654ebc26a26605daf4173'],
  ['antd.js', 'antd@5.21.5/dist/antd.min.js', '52c43cc3ba73b259c46df79ca82fd2bac0e8e18e200a5fc326c11bcd85d64b54'],
  ['reset.css', 'antd@5.21.5/dist/reset.css', '76d99c4599dd3918bdee15703de7a9f0cc7fc490b4f55fc0ef02538b522e5109'],
  ['babel.cjs', '@babel/standalone@7.23.2/babel.min.js', '7bcd2533d8908a1545817804bcb78aeaf9bd6771694bc0f62cc44bfce4f135b2'],
];
const digest = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

async function prepare([filename, resource, checksum]) {
  const target = path.join(__dirname, 'vendor', filename);
  try {
    if (digest(await fs.readFile(target)) === checksum) {
      console.log(`OK ${filename}`);
      return;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const response = await fetch(`https://unpkg.com/${resource}`, {signal: AbortSignal.timeout(45000)});
  if (!response.ok) throw new Error(`${filename}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (digest(bytes) !== checksum) throw new Error(`${filename}: checksum mismatch; existing asset was not replaced`);
  await fs.writeFile(`${target}.tmp`, bytes);
  await fs.rename(`${target}.tmp`, target);
  console.log(`Downloaded ${filename}`);
}

async function main() {
  await fs.mkdir(path.join(__dirname, 'vendor'), {recursive: true});
  await Promise.all(assets.map(prepare));
}

main().catch(error => {
  console.error(`Asset preparation failed: ${error.message}`);
  process.exitCode = 1;
});
