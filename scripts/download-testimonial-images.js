import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create testimonials directory if it doesn't exist
const testimonialsDir = path.join(__dirname, '../public/testimonials');
if (!fs.existsSync(testimonialsDir)) {
  fs.mkdirSync(testimonialsDir, { recursive: true });
}

// Define image URLs for testimonials
// Using professional business portrait images from Unsplash
const imageUrls = [
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    filename: 'client1.jpg',
    description: 'Professional business woman with blonde hair'
  },
  {
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    filename: 'client2.jpg',
    description: 'Professional Asian man in business attire'
  },
  {
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    filename: 'client3.jpg',
    description: 'Professional Hispanic woman in business attire'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(testimonialsDir, filename);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`File ${filename} already exists, skipping download.`);
      return resolve();
    }

    console.log(`Downloading ${url} to ${filePath}...`);

    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode} ${response.statusMessage}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename} successfully.`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });

    file.on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting download of testimonial images...');

  for (const image of imageUrls) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }

  console.log('All downloads completed.');
}

// Run the download function
downloadAllImages().catch(console.error);
