import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../src/assets/optimized');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuración de optimización
const sizes = {
  thumbnail: { width: 300, height: 200 },
  card: { width: 600, height: 400 },
  hero: { width: 1200, height: 800 }
};

async function optimizeImage(inputPath, filename) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Optimizando ${filename} (${metadata.width}x${metadata.height}, ${Math.round(metadata.size / 1024)}KB)`);
    
    // Generar diferentes tamaños
    for (const [sizeName, dimensions] of Object.entries(sizes)) {
      const outputFilename = `${path.parse(filename).name}-${sizeName}.webp`;
      const outputPath = path.join(outputDir, outputFilename);
      
      await image
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ 
          quality: 80,
          effort: 6
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${outputFilename}: ${Math.round(stats.size / 1024)}KB`);
    }
    
    // Generar versión original optimizada
    const optimizedOriginal = `${path.parse(filename).name}-original.webp`;
    const optimizedPath = path.join(outputDir, optimizedOriginal);
    
    await image
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(optimizedPath);
    
    const stats = fs.statSync(optimizedPath);
    console.log(`  ✓ ${optimizedOriginal}: ${Math.round(stats.size / 1024)}KB`);
    
  } catch (error) {
    console.error(`Error optimizando ${filename}:`, error);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(inputDir).filter(file => 
    file.match(/\.(jpg|jpeg|png|webp)$/i) && !file.includes('optimized')
  );
  
  console.log(`Encontradas ${files.length} imágenes para optimizar:\n`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    await optimizeImage(inputPath, file);
    console.log('');
  }
  
  console.log('✅ Optimización completada!');
  console.log(`📁 Imágenes optimizadas guardadas en: ${outputDir}`);
}

optimizeAllImages().catch(console.error); 