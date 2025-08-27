import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* global console */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../src/assets/optimized');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuración de optimización
// Nota: "original" se genera aparte sin redimensionar para evitar duplicados.
const sizes = {
  card: { width: 600, height: 400 },
  hero: { width: 1200, height: 800 },
};

async function optimizeImage(inputPath, filename, relativeDir = '') {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(
      `Optimizando ${path.join(relativeDir, filename)} (${metadata.width}x${metadata.height}, ${metadata.size ? Math.round(metadata.size / 1024) : '?'}KB)`
    );

    // Generar diferentes tamaños
    for (const [sizeName, dimensions] of Object.entries(sizes)) {
      const outputSubdir = path.join(outputDir, relativeDir);
      if (!fs.existsSync(outputSubdir)) {
        fs.mkdirSync(outputSubdir, { recursive: true });
      }
      const outputFilename = `${path.parse(filename).name}-${sizeName}.webp`;
      const outputPath = path.join(outputSubdir, outputFilename);

      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({
          quality: 80,
          effort: 6,
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${path.join(relativeDir, outputFilename)}: ${Math.round(stats.size / 1024)}KB`);
    }

    // Generar versión original optimizada (sin redimensionar)
    const outputSubdir = path.join(outputDir, relativeDir);
    if (!fs.existsSync(outputSubdir)) {
      fs.mkdirSync(outputSubdir, { recursive: true });
    }
    const optimizedOriginal = `${path.parse(filename).name}-original.webp`;
    const optimizedPath = path.join(outputSubdir, optimizedOriginal);

    await image
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(optimizedPath);

    const stats = fs.statSync(optimizedPath);
    console.log(`  ✓ ${path.join(relativeDir, optimizedOriginal)}: ${Math.round(stats.size / 1024)}KB`);
  } catch (error) {
    console.error(`Error optimizando ${filename}:`, error);
  }
}

function walkFiles(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    // Saltar la carpeta de salida
    if (path.resolve(fullPath) === path.resolve(outputDir)) continue;
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, baseDir));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      const relative = path.relative(baseDir, path.dirname(fullPath));
      results.push({ fullPath, filename: entry.name, relativeDir: relative });
    }
  }
  return results;
}

async function optimizeAllImages() {
  const files = walkFiles(inputDir);
  const filtered = files.filter(f => !f.fullPath.includes(path.sep + 'optimized' + path.sep));

  console.log(`Encontradas ${filtered.length} imágenes para optimizar:\n`);

  for (const file of filtered) {
    await optimizeImage(file.fullPath, file.filename, file.relativeDir);
    console.log('');
  }

  console.log('✔ Optimización completada!');
  console.log(`📁 Imágenes optimizadas guardadas en: ${outputDir}`);
}

optimizeAllImages().catch(err => {
  console.error(err);
  process.exit(1);
});

