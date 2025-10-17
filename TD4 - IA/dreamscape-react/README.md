# 🌌 DreamScape - Générateur de Mondes 3D Procéduraux

Une application web immersive permettant de générer des mondes 3D procéduraux à partir de mots-clés, créée avec React, React Three Fiber et Three.js.

![DreamScape](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Fonctionnalités

- 🌍 **Génération procédurale de terrains** : Utilisation de Simplex Noise pour créer des reliefs naturels
- 🎨 **6 thèmes prédéfinis** : Forêt, Désert, Neige, Volcan, Cyberpunk, Océan
- 💫 **Systèmes de particules dynamiques** : Différents effets selon le thème (neige, poussière, étincelles, etc.)
- 🎭 **Éclairage adaptatif** : Ambiance visuelle unique pour chaque monde
- 🎮 **Contrôles interactifs** : Navigation 3D fluide avec OrbitControls
- 🌊 **Transitions douces** : Changement de monde avec effet de fade
- 💾 **Sauvegarde automatique** : Le dernier monde généré est mémorisé

## 🎯 Thèmes disponibles

| Thème | Mots-clés | Description |
|-------|-----------|-------------|
| 🌲 **Forêt** | forêt, forest, arbre, nature, vert | Végétation luxuriante, brume douce |
| 🏜️ **Désert** | désert, desert, sable, dune | Dunes dorées, chaleur intense |
| ❄️ **Neige** | neige, snow, hiver, glace, montagne | Paysage glacé, flocons de neige |
| 🌋 **Volcan** | volcan, lave, feu, magma | Lave incandescente, étincelles |
| 🌆 **Cyberpunk** | cyberpunk, neon, futur, matrix | Néons violets et bleus, ambiance futuriste |
| 🌊 **Océan** | océan, mer, eau, sea, bleu | Vagues ondulantes, bulles flottantes |

## 🚀 Installation et lancement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes

1. **Naviguer dans le dossier du projet**
```bash
cd dreamscape-react
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
Le projet s'ouvrira automatiquement à `http://localhost:3000`

## 🎮 Utilisation

1. Entrez un mot-clé dans le champ de saisie (ex: "forêt", "désert", "volcan")
2. Cliquez sur "Générer" ou appuyez sur Entrée
3. Le monde 3D se transformera selon le thème choisi
4. Utilisez la souris pour naviguer :
   - **Clic gauche + Glisser** : Rotation de la caméra
   - **Molette** : Zoom avant/arrière
   - **Clic droit + Glisser** : Panoramique (désactivé)

## 📂 Structure du projet

```
dreamscape-react/
├── public/
├── src/
│   ├── components/
│   │   ├── Scene.jsx          # Configuration de la scène 3D
│   │   ├── Terrain.jsx         # Génération du terrain procédural
│   │   └── Particles.jsx       # Système de particules
│   ├── utils/
│   │   └── noise.js            # Fonctions de bruit procédural
│   ├── themes.js               # Configuration des thèmes
│   ├── App.jsx                 # Composant principal
│   ├── App.css                 # Styles de l'interface
│   ├── main.jsx                # Point d'entrée
│   └── index.css               # Styles globaux
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Technologies utilisées

- **React 18** : Framework UI
- **Vite** : Build tool rapide
- **React Three Fiber** : Renderer React pour Three.js
- **Three.js** : Bibliothèque 3D WebGL
- **@react-three/drei** : Helpers pour R3F (OrbitControls, etc.)
- **simplex-noise** : Génération de bruit procédural

## 🧠 Fonctionnement technique

### Génération du terrain
Le terrain est généré à partir d'un `PlaneGeometry` subdivisé. Chaque vertex voit sa hauteur (Z) modifiée par un algorithme de **Simplex Noise** multi-octaves, créant des reliefs naturels et organiques.

```javascript
// Simplex Noise avec 4 octaves pour plus de détails
height = noise(x, y) * amplitude
       + noise(x*2, y*2) * amplitude/2
       + noise(x*4, y*4) * amplitude/4
       + noise(x*8, y*8) * amplitude/8
```

### Système de particules
Les particules sont générées via un `BufferGeometry` avec positions instanciées. Chaque type de particule a son propre comportement physique (gravité, vent, flottaison, etc.).

### Thèmes dynamiques
Chaque thème configure :
- Couleurs du terrain et du ciel
- Paramètres de génération (scale, amplitude, octaves)
- Éclairage (ambient, directional)
- Brouillard (fog)
- Type et comportement des particules

## 🎨 Personnalisation

Pour ajouter un nouveau thème, éditez `src/themes.js` :

```javascript
mon_theme: {
  name: 'Mon Thème',
  terrain: {
    color: '#hexcolor',
    scale: 0.1,
    amplitude: 3,
    octaves: 4
  },
  sky: {
    color: '#skycolor',
    fog: '#fogcolor',
    fogDensity: 0.02
  },
  lighting: {
    ambient: '#ambientcolor',
    ambientIntensity: 0.7,
    directional: '#suncolor',
    directionalIntensity: 1.0,
    directionalPosition: [x, y, z]
  },
  particles: {
    type: 'custom',
    color: '#particlecolor',
    count: 1000,
    size: 0.1,
    speed: 0.3
  }
}
```

## 📦 Build de production

```bash
npm run build
```

Le build sera généré dans le dossier `dist/`.

Pour prévisualiser le build :
```bash
npm run preview
```

## 🐛 Dépannage

- **Écran noir** : Vérifiez la console pour les erreurs WebGL
- **Performances lentes** : Réduisez le nombre de particules dans `themes.js`
- **Erreur de module** : Supprimez `node_modules` et relancez `npm install`

## 📝 Licence

Projet éducatif - Libre d'utilisation

## 🙏 Crédits

- Génération procédurale inspirée de Sebastian Lague
- Basé sur React Three Fiber par Poimandres
- Police Orbitron de Google Fonts

---

**Créé avec** ❤️ **et React Three Fiber**
