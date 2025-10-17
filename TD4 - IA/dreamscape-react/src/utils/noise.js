import { createNoise2D } from 'simplex-noise';

/**
 * Génère une fonction de bruit 2D pour la création de terrains procéduraux
 * Utilise Simplex Noise pour un rendu plus naturel et performant
 */
const noise2D = createNoise2D();

/**
 * Génère une hauteur pour un terrain procédural basé sur des coordonnées 2D
 * @param {number} x - Coordonnée X
 * @param {number} y - Coordonnée Y
 * @param {number} scale - Échelle du bruit (plus c'est petit, plus c'est lisse)
 * @param {number} amplitude - Amplitude des variations de hauteur
 * @param {number} octaves - Nombre d'octaves (détails superposés)
 * @returns {number} - Hauteur générée
 */
export function generateTerrainHeight(x, y, scale = 0.1, amplitude = 1, octaves = 4) {
  let height = 0;
  let freq = scale;
  let amp = amplitude;

  // Superposition d'octaves pour créer un terrain plus détaillé
  // Chaque octave ajoute des détails à une échelle différente
  for (let i = 0; i < octaves; i++) {
    height += noise2D(x * freq, y * freq) * amp;
    freq *= 2; // Double la fréquence (détails plus fins)
    amp *= 0.5; // Réduit l'amplitude (influence moindre)
  }

  return height;
}

/**
 * Génère une grille de hauteurs pour un terrain complet
 * @param {number} width - Largeur de la grille
 * @param {number} height - Hauteur de la grille
 * @param {object} options - Options de génération
 * @returns {Array<Array<number>>} - Grille 2D de hauteurs
 */
export function generateTerrainGrid(width, height, options = {}) {
  const {
    scale = 0.1,
    amplitude = 1,
    octaves = 4,
    seed = 0
  } = options;

  const grid = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const terrainHeight = generateTerrainHeight(
        x + seed,
        y + seed,
        scale,
        amplitude,
        octaves
      );
      row.push(terrainHeight);
    }
    grid.push(row);
  }

  return grid;
}

/**
 * Génère un bruit 2D simple pour les effets de particules
 * @param {number} x - Coordonnée X
 * @param {number} y - Coordonnée Y
 * @returns {number} - Valeur de bruit entre -1 et 1
 */
export function simpleNoise2D(x, y) {
  return noise2D(x, y);
}
