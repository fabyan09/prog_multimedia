# Three.js - Exercice 1

Cette série de fichiers implémente tous les éléments demandés dans l'exercice Three.js.

## 📁 Structure du projet

```
ThreeJS-TD1/
├── index.html              # Scène de base avec tous les éléments
├── demo-with-textures.html  # Démo avancée avec textures procédurales
├── gltf-loader-demo.html    # Démonstration du chargement de modèles 3D
├── textures/               # Dossier pour vos textures personnalisées
├── models/                 # Dossier pour vos modèles 3D (.gltf, .glb)
└── README.md              # Ce fichier
```

## 🚀 Fonctionnalités implémentées

### ✅ Éléments de base requis
- **Scène Three.js** : Configurée avec renderer, caméra perspective
- **Éclairage** : Lumière ambiante + directionnelle + ponctuelle
- **Objets géométriques** : Cube et sphère avec matériaux
- **Textures** : Appliquées sur les objets (procédurales et externes)
- **Animation** : Rotation automatique et contrôles
- **Serveur local** : Prêt pour utilisation avec serveur HTTP

### ✅ Fonctionnalités avancées
- **DeviceOrientation/DeviceMotion** : Contrôle par smartphone
- **Modèles 3D** : Chargeur GLTF configuré avec exemples
- **Effets atmosphériques** : Fog et système de particules
- **Éclairage dynamique** : Ombres et éclairage multiple
- **Contrôles interactifs** : OrbitControls + clavier

## 🎮 Contrôles

### Clavier
- **R** : Réinitialiser la rotation smartphone
- **ESPACE** : Changer de modèle (dans gltf-loader-demo.html)
- **C** : Centrer la caméra sur le modèle

### Smartphone
- **Orientation de l'appareil** : Contrôle de la rotation des objets
- **Mouvement** : Influence sur les particules (DeviceMotion)

### Souris
- **Clic gauche + glisser** : Orbiter autour de la scène
- **Molette** : Zoom avant/arrière

## 📱 Utilisation sur smartphone

1. **Serveur local requis** : Utilisez `python -m http.server` ou équivalent
2. **HTTPS nécessaire** : Pour DeviceOrientation sur appareils récents
3. **Autorisation** : Le navigateur peut demander l'autorisation d'accès aux capteurs

## 🎨 Textures

### Textures procédurales créées
- **Damier** : Motif noir et blanc répétable
- **UV Mapping** : Visualisation des coordonnées UV avec dégradés
- **Carrelage** : Texture de sol avec joints

### Ajouter vos propres textures
1. Placez vos images dans le dossier `textures/`
2. Modifiez le code pour charger vos textures :
```javascript
const texture = textureLoader.load('./textures/votre-texture.jpg');
```

## 📦 Modèles 3D

### Modèles d'exemple intégrés
- **Duck** : Modèle canard (format glTF)
- **Avocado** : Modèle avocat avec textures
- **Damaged Helmet** : Casque avec PBR materials

### Ajouter vos modèles
1. Placez vos fichiers `.gltf` ou `.glb` dans le dossier `models/`
2. Ajoutez-les à la liste dans le code :
```javascript
const YOUR_MODELS = [
    {
        name: "Mon Modèle",
        url: "./models/mon-modele.gltf",
        scale: 1,
        position: [0, 0, 0]
    }
];
```

## 🛠️ Serveur de développement

Pour tester les fonctionnalités complètes (textures, modèles 3D) :

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (avec http-server)
npx http-server

# PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000/ThreeJS-TD1/`

## 🎯 Points d'intérêt techniques

### Performance
- **Antialias** activé pour un rendu lisse
- **Shadow maps** optimisées (2048x2048)
- **Mipmaps** désactivées sur textures procédurales

### Compatibilité
- **Three.js r156** : Version stable récente
- **ES5** : Compatible navigateurs anciens
- **Responsive** : S'adapte aux différentes tailles d'écran

### Sécurité
- **HTTPS recommandé** pour DeviceOrientation
- **CORS** géré pour les modèles externes

## 🐛 Débogage

### Problèmes courants
1. **Objet non visible** : Vérifiez position caméra et échelle
2. **Texture noire** : Problème de chargement ou CORS
3. **Modèle 3D absent** : Vérifiez console navigateur pour erreurs
4. **DeviceOrientation inactif** : Nécessite HTTPS et autorisation utilisateur

### Console développeur
Tous les fichiers incluent des logs console pour le débogage :
- Chargement des textures
- État des modèles 3D
- Erreurs de chargement
- Progression des téléchargements

## 📚 Ressources

- [Documentation Three.js](https://threejs.org/docs/)
- [Exemples Three.js](https://threejs.org/examples/)
- [Modèles glTF sample](https://github.com/KhronosGroup/glTF-Sample-Models)
- [DeviceOrientation API](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent)