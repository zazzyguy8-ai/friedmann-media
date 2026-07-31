// Generates the extension's PNG icons from scratch using only Node's built-in
// zlib, so the build has no image-processing dependency. Draws a rounded
// square in the brand color with a white "no-entry" slash to read as
// "blocking" at a glance, then downsamples for the smaller sizes.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "icons");
mkdirSync(OUT_DIR, { recursive: true });

const BRAND = [79, 70, 229]; // indigo-600
const RING = [255, 255, 255];

const BASE = 128;

function renderBase(size) {
  const px = new Float32Array(size * size * 4);
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.46;
  const ringWidth = size * 0.1;
  const cornerR = size * 0.22;

  const setPixel = (x, y, r, g, b, a) => {
    const idx = (y * size + x) * 4;
    px[idx] = r;
    px[idx + 1] = g;
    px[idx + 2] = b;
    px[idx + 3] = a;
  };

  const insideRoundedSquare = (x, y) => {
    const dx = Math.max(0, Math.abs(x - cx) - (size / 2 - cornerR));
    const dy = Math.max(0, Math.abs(y - cy) - (size / 2 - cornerR));
    return dx * dx + dy * dy <= cornerR * cornerR;
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!insideRoundedSquare(x + 0.5, y + 0.5)) {
        setPixel(x, y, 0, 0, 0, 0);
        continue;
      }
      setPixel(x, y, BRAND[0], BRAND[1], BRAND[2], 255);
    }
  }

  // "No-entry" ring + diagonal slash, both in white, to signal "blocked".
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const onRing = dist <= outerR && dist >= outerR - ringWidth;

      const angle = Math.PI / 4; // slash direction
      const nx = Math.cos(angle);
      const ny = Math.sin(angle);
      const perp = dx * -ny + dy * nx;
      const along = dx * nx + dy * ny;
      const onSlash =
        Math.abs(perp) <= ringWidth / 2 && Math.abs(along) <= outerR - ringWidth * 0.6;

      if ((onRing || onSlash) && insideRoundedSquare(x + 0.5, y + 0.5)) {
        setPixel(x, y, RING[0], RING[1], RING[2], 255);
      }
    }
  }

  return px;
}

function downsample(src, srcSize, destSize) {
  const dest = new Float32Array(destSize * destSize * 4);
  const scale = srcSize / destSize;
  for (let y = 0; y < destSize; y++) {
    for (let x = 0; x < destSize; x++) {
      const sx = Math.min(srcSize - 1, Math.floor((x + 0.5) * scale));
      const sy = Math.min(srcSize - 1, Math.floor((y + 0.5) * scale));
      const srcIdx = (sy * srcSize + sx) * 4;
      const destIdx = (y * destSize + x) * 4;
      dest[destIdx] = src[srcIdx];
      dest[destIdx + 1] = src[srcIdx + 1];
      dest[destIdx + 2] = src[srcIdx + 2];
      dest[destIdx + 3] = src[srcIdx + 3];
    }
  }
  return dest;
}

function crc32(buf) {
  let c;
  const table = crc32.table ?? (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(pixels, size) {
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + size * 4);
    raw[rowStart] = 0; // no filter
    for (let x = 0; x < size; x++) {
      const srcIdx = (y * size + x) * 4;
      const destIdx = rowStart + 1 + x * 4;
      raw[destIdx] = Math.round(pixels[srcIdx]);
      raw[destIdx + 1] = Math.round(pixels[srcIdx + 1]);
      raw[destIdx + 2] = Math.round(pixels[srcIdx + 2]);
      raw[destIdx + 3] = Math.round(pixels[srcIdx + 3]);
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = deflateSync(raw);
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const base = renderBase(BASE);
const sizes = [16, 32, 48, 128];

for (const size of sizes) {
  const pixels = size === BASE ? base : downsample(base, BASE, size);
  const png = encodePNG(pixels, size);
  const path = join(OUT_DIR, `icon${size}.png`);
  writeFileSync(path, png);
  console.log(`generated ${path}`);
}
