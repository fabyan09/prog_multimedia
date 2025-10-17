/**
 * Configuration des thèmes pour les différents mondes procéduraux
 * Chaque thème définit les couleurs, lumières, fog et paramètres du terrain
 */

export const themes = {
  foret: {
    name: 'Forêt',
    terrain: {
      color: '#2d5016',
      secondaryColor: '#4a7c2f',
      scale: 0.08,
      amplitude: 3,
      octaves: 5
    },
    sky: {
      color: '#87CEEB',
      fog: '#b8d4e8',
      fogDensity: 0.02
    },
    lighting: {
      ambient: '#88aa88',
      ambientIntensity: 0.6,
      directional: '#ffffff',
      directionalIntensity: 0.8,
      directionalPosition: [10, 20, 10]
    },
    particles: {
      type: 'leaves',
      color: '#6b8e23',
      count: 800,
      size: 0.15,
      speed: 0.3
    }
  },

  desert: {
    name: 'Désert',
    terrain: {
      color: '#daa520',
      secondaryColor: '#f4a460',
      scale: 0.06,
      amplitude: 2,
      octaves: 3
    },
    sky: {
      color: '#FFE4B5',
      fog: '#ffd89b',
      fogDensity: 0.015
    },
    lighting: {
      ambient: '#ffcc77',
      ambientIntensity: 0.8,
      directional: '#ffe4b5',
      directionalIntensity: 1.2,
      directionalPosition: [15, 25, 5]
    },
    particles: {
      type: 'dust',
      color: '#daa520',
      count: 600,
      size: 0.1,
      speed: 0.5
    }
  },

  neige: {
    name: 'Neige',
    terrain: {
      color: '#e8f4f8',
      secondaryColor: '#ffffff',
      scale: 0.1,
      amplitude: 2.5,
      octaves: 4
    },
    sky: {
      color: '#b0c4de',
      fog: '#d0e8f0',
      fogDensity: 0.025
    },
    lighting: {
      ambient: '#b0d8f0',
      ambientIntensity: 0.9,
      directional: '#ffffff',
      directionalIntensity: 0.7,
      directionalPosition: [5, 15, 10]
    },
    particles: {
      type: 'snow',
      color: '#ffffff',
      count: 1200,
      size: 0.12,
      speed: 0.2
    }
  },

  volcan: {
    name: 'Volcan',
    terrain: {
      color: '#2b1a1a',
      secondaryColor: '#4a0e0e',
      scale: 0.12,
      amplitude: 5,
      octaves: 6
    },
    sky: {
      color: '#1a0a0a',
      fog: '#3d1a1a',
      fogDensity: 0.03
    },
    lighting: {
      ambient: '#ff4400',
      ambientIntensity: 0.5,
      directional: '#ff6600',
      directionalIntensity: 1.0,
      directionalPosition: [0, 10, 0]
    },
    particles: {
      type: 'sparks',
      color: '#ff4400',
      count: 1000,
      size: 0.08,
      speed: 0.8
    }
  },

  cyberpunk: {
    name: 'Cyberpunk',
    terrain: {
      color: '#0a0a1a',
      secondaryColor: '#1a0a2e',
      scale: 0.15,
      amplitude: 1.5,
      octaves: 3
    },
    sky: {
      color: '#0a0a1a',
      fog: '#1a0a3d',
      fogDensity: 0.04
    },
    lighting: {
      ambient: '#4d0099',
      ambientIntensity: 0.4,
      directional: '#00ffff',
      directionalIntensity: 0.9,
      directionalPosition: [10, 15, 10]
    },
    particles: {
      type: 'neon',
      color: '#00ffff',
      count: 900,
      size: 0.1,
      speed: 0.4
    }
  },

  ocean: {
    name: 'Océan',
    terrain: {
      color: '#006994',
      secondaryColor: '#0080b3',
      scale: 0.05,
      amplitude: 1.2,
      octaves: 4
    },
    sky: {
      color: '#87CEEB',
      fog: '#a0d8ef',
      fogDensity: 0.018
    },
    lighting: {
      ambient: '#6eb3d6',
      ambientIntensity: 0.7,
      directional: '#ffffff',
      directionalIntensity: 0.9,
      directionalPosition: [10, 20, 15]
    },
    particles: {
      type: 'bubbles',
      color: '#add8e6',
      count: 700,
      size: 0.13,
      speed: 0.25
    }
  }
};

/**
 * Trouve un thème correspondant au mot-clé saisi
 * @param {string} keyword - Mot-clé saisi par l'utilisateur
 * @returns {object} - Objet thème correspondant
 */
export function getThemeFromKeyword(keyword) {
  const normalized = keyword.toLowerCase().trim();

  // Mapping de mots-clés vers les thèmes
  const keywordMap = {
    'foret': 'foret',
    'forêt': 'foret',
    'forest': 'foret',
    'arbre': 'foret',
    'nature': 'foret',
    'vert': 'foret',

    'desert': 'desert',
    'désert': 'desert',
    'sable': 'desert',
    'dune': 'desert',
    'sahara': 'desert',

    'neige': 'neige',
    'snow': 'neige',
    'hiver': 'neige',
    'winter': 'neige',
    'blanc': 'neige',
    'glace': 'neige',
    'montagne': 'neige',

    'volcan': 'volcan',
    'volcano': 'volcan',
    'lave': 'volcan',
    'feu': 'volcan',
    'magma': 'volcan',
    'enfer': 'volcan',

    'cyberpunk': 'cyberpunk',
    'cyber': 'cyberpunk',
    'neon': 'cyberpunk',
    'futur': 'cyberpunk',
    'matrix': 'cyberpunk',

    'ocean': 'ocean',
    'océan': 'ocean',
    'mer': 'ocean',
    'eau': 'ocean',
    'sea': 'ocean',
    'bleu': 'ocean'
  };

  // Recherche du thème correspondant
  const themeKey = keywordMap[normalized] || 'foret';
  return { key: themeKey, ...themes[themeKey] };
}
