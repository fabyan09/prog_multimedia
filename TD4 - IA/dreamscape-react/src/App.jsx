import { useState, useEffect } from 'react';
import Scene from './components/Scene';
import { getThemeFromKeyword } from './themes';
import './App.css';

/**
 * Composant principal de l'application DreamScape
 * Gère l'état du thème, l'interface utilisateur et la transition entre les mondes
 */
function App() {
  // État pour le mot-clé saisi par l'utilisateur
  const [keyword, setKeyword] = useState('');

  // État pour le thème actuel (détermine l'apparence du monde 3D)
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Récupération du dernier thème sauvegardé (localStorage)
    const saved = localStorage.getItem('dreamscape-theme');
    return saved ? getThemeFromKeyword(saved) : getThemeFromKeyword('foret');
  });

  // État pour gérer la transition entre les thèmes
  const [isTransitioning, setIsTransitioning] = useState(false);

  // État pour l'animation d'entrée
  const [isLoaded, setIsLoaded] = useState(false);

  // Clé de régénération pour forcer un nouveau monde même avec le même thème
  const [regenerationKey, setRegenerationKey] = useState(0);

  // État pour la visibilité du menu
  const [menuVisible, setMenuVisible] = useState(true);

  // État pour détecter le mouvement du joueur
  const [playerMoved, setPlayerMoved] = useState(false);

  // État pour la couleur du joueur
  const [playerColor, setPlayerColor] = useState(() => {
    const saved = localStorage.getItem('dreamscape-player-color');
    return saved || '#ff6b6b';
  });

  // Animation d'entrée au chargement
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Masquer le menu lors du mouvement du joueur
  useEffect(() => {
    const handleKeyDown = (e) => {
      const movementKeys = ['z', 'q', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
      if (movementKeys.includes(e.key.toLowerCase())) {
        setPlayerMoved(true);
        setMenuVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Gère la génération d'un nouveau monde
   */
  const handleGenerate = () => {
    if (!keyword.trim()) return;

    // Déclenchement de la transition
    setIsTransitioning(true);

    // Changement du thème après un court délai
    setTimeout(() => {
      const newTheme = getThemeFromKeyword(keyword);
      setCurrentTheme(newTheme);

      // Incrémentation de la clé de régénération pour forcer un nouveau terrain
      setRegenerationKey(prev => prev + 1);

      // Sauvegarde dans le localStorage
      localStorage.setItem('dreamscape-theme', keyword);

      // Reload de la page pour appliquer les changements
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 300);
  };

  /**
   * Gère la soumission du formulaire (touche Entrée)
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerate();
  };

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      {/* Scène 3D en arrière-plan */}
      <Scene theme={currentTheme} transition={isTransitioning} seed={regenerationKey} playerColor={playerColor} />

      {/* Bouton pour afficher/masquer le menu */}
      {playerMoved && (
        <button
          className={`menu-toggle ${menuVisible ? 'active' : ''}`}
          onClick={() => setMenuVisible(!menuVisible)}
          title={menuVisible ? 'Masquer le menu' : 'Afficher le menu'}
        >
          {menuVisible ? '✕' : '☰'}
        </button>
      )}

      {/* Interface utilisateur flottante */}
      <div className={`ui-container ${!menuVisible ? 'hidden' : ''}`}>
        <div className="ui-header">
          <h1 className="title">DreamScape</h1>
          <p className="subtitle">Générateur de Mondes 3D Procéduraux</p>
        </div>

        <form onSubmit={handleSubmit} className="control-panel">
          <div className="input-group">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Entrez un mot-clé (forêt, désert, neige...)"
              className="keyword-input"
            />
            <button
              type="submit"
              className="generate-btn"
              disabled={!keyword.trim() || isTransitioning}
            >
              {isTransitioning ? 'Génération...' : 'Générer'}
            </button>
          </div>

          <div className="current-world">
            <span className="world-label">Monde actuel :</span>
            <span className="world-name">{currentTheme.name}</span>
          </div>

          {/* Sélecteur de couleur du personnage */}
          <div className="color-selector">
            <label className="color-label">Couleur du personnage :</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                value={playerColor}
                onChange={(e) => {
                  setPlayerColor(e.target.value);
                  localStorage.setItem('dreamscape-player-color', e.target.value);
                }}
                className="color-input"
              />
              <span className="color-preview" style={{ backgroundColor: playerColor }}></span>
            </div>
          </div>
        </form>

        {/* Suggestions de mots-clés */}
        <div className="suggestions">
          <p className="suggestions-label">Suggestions :</p>
          <div className="suggestion-chips">
            {['forêt', 'désert', 'neige', 'volcan', 'cyberpunk', 'océan'].map((suggestion) => (
              <button
                key={suggestion}
                className="suggestion-chip"
                onClick={() => {
                  setKeyword(suggestion);
                  setTimeout(() => handleGenerate(), 100);
                }}
                disabled={isTransitioning}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Indicateur de chargement/transition */}
      {isTransitioning && (
        <div className="transition-overlay">
          <div className="loader"></div>
          <p className="loading-text">Génération du monde "{keyword}"...</p>
        </div>
      )}

      {/* Instructions */}
      <div className="instructions">
        <p>🎮 ZQSD ou ← ↑ → ↓ pour se déplacer</p>
        <p>🚀 ESPACE pour sauter</p>
        <p>📱 Sur mobile : inclinez votre téléphone</p>
        <p>🌍 Explorez la grande carte !</p>
      </div>

      {/* Signature */}
      <div className="signature">
        <p>Propulsé par React Three Fiber</p>
      </div>
    </div>
  );
}

export default App;
