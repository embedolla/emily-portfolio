import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const downloads = path.join(os.homedir(), "Downloads");
const outDir = path.join(process.cwd(), "public", "photos");
fs.mkdirSync(outDir, { recursive: true });

const jobs = [
  { src: "IMG_6517 Copy.jpeg", out: "cottage.jpg" },
  { src: "IMG_4619.jpeg", out: "sunset.jpg" },
  { src: "DSC03117.jpeg", out: "tree.jpg" },
];

for (const job of jobs) {
  const src = path.join(downloads, job.src);
  const dest = path.join(outDir, job.out);
  await sharp(src)
    .rotate() // auto-orient from EXIF
    .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log(`${job.out}: ${meta.width}x${meta.height}`);
}
