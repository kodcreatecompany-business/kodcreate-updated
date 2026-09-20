const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const inputPath = 'g:/kodcreate/public/images/logo.png';
  const outputPath = 'g:/kodcreate/public/images/logo_glow.png';
  const iconPath = 'g:/kodcreate/public/images/logo_icon.png';

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const outputData = Buffer.from(data);

  // RGB to HSL and HSL to RGB helpers
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h * 360, s, l];
  }

  function hslToRgb(h, s, l) {
    h /= 360;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  for (let i = 0; i < outputData.length; i += channels) {
    let r = outputData[i];
    let g = outputData[i + 1];
    let b = outputData[i + 2];
    let a = outputData[i + 3];

    // Check if background white
    if (r > 248 && g > 248 && b > 248) {
      outputData[i + 3] = 0; // make transparent
      continue;
    }

    // Soft alpha threshold for near-white edges (anti-aliasing)
    if (r > 235 && g > 235 && b > 235) {
      const brightness = (r + g + b) / 3;
      const alphaFactor = Math.max(0, Math.min(1, (255 - brightness) / 20));
      outputData[i + 3] = Math.round(a * alphaFactor);
    }

    const [h, s, l] = rgbToHsl(r, g, b);

    // If hue is in cyan/aqua range (~170 to ~200) or high blue/green
    if (h >= 160 && h <= 205 && s > 0.35) {
      // Shift hue to vibrant glowing royal blue (~218° to ~224°)
      const newH = 220;
      // Slightly enhance saturation and vibrancy
      const newS = Math.min(1, s * 1.05);
      const newL = Math.max(0.25, Math.min(0.65, l * 0.92));
      const [newR, newG, newB] = hslToRgb(newH, newS, newL);
      outputData[i] = newR;
      outputData[i + 1] = newG;
      outputData[i + 2] = newB;
    }
  }

  // Save the full recolored logo
  await sharp(outputData, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log('Saved full logo to:', outputPath);

  // Also create a cropped version of just the K emblem/icon
  // The K icon is approximately in the upper 70% of the image
  await sharp(outputData, { raw: { width, height, channels } })
    .extract({ left: 160, top: 80, width: 704, height: 620 })
    .png()
    .toFile(iconPath);

  console.log('Saved icon to:', iconPath);
}

processLogo().catch(err => console.error(err));
