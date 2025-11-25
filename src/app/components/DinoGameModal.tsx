'use client';

import { useEffect, useRef, useState } from 'react';

interface DinoGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Dino {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  jumping: boolean;
  ducking: boolean;
  gravity: number;
  jumpPower: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cactus' | 'bird';
}

interface Ground {
  y: number;
  speed: number;
}

export default function DinoGameModal({ isOpen, onClose }: DinoGameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let gameRunning = false;
    let localScore = 0;

    // Last inn alle dino-bildene
    let dinoStartImage: HTMLImageElement | null = null;
    let dinoRightUpImage: HTMLImageElement | null = null;
    let dinoLeftUpImage: HTMLImageElement | null = null;
    let dinoDuckImage: HTMLImageElement | null = null;
    let imagesLoaded = false;
    let animationFrame = 0;

    // Last inn alle bildene
    const loadImages = () => {
      const startImg = new Image();
      startImg.src = '/dino/DinoStart.png';

      const rightUpImg = new Image();
      rightUpImg.src = '/dino/DinoRightUp.png';

      const leftUpImg = new Image();
      leftUpImg.src = '/dino/DinoLeftUp.png';

      const duckImg = new Image();
      duckImg.src = '/dino/DinoDuck.png';

      let loadedCount = 0;
      const totalImages = 4;

      const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          imagesLoaded = true;
        }
      };

      startImg.onload = () => {
        dinoStartImage = startImg;
        checkAllLoaded();
      };

      rightUpImg.onload = () => {
        dinoRightUpImage = rightUpImg;
        checkAllLoaded();
      };

      leftUpImg.onload = () => {
        dinoLeftUpImage = leftUpImg;
        checkAllLoaded();
      };

      duckImg.onload = () => {
        dinoDuckImage = duckImg;
        checkAllLoaded();
      };
    };

    loadImages();

    // Oppdatert dino-dimensjoner: 50x50
    const dino: Dino = {
      x: 50,
      y: 150, // ground.y (200) - dino.height (50) = 150
      width: 50,
      height: 50,
      velocityY: 0,
      jumping: false,
      ducking: false,
      gravity: 0.6,
      jumpPower: -12,
    };

    let obstacles: Obstacle[] = [];
    let obstacleTimer = 0;

    const ground: Ground = {
      y: 200,
      speed: 5,
    };

    function drawDino() {
      if (!ctx) return;

      // Bestem hvilket bilde som skal brukes
      let imageToDraw: HTMLImageElement | null = null;
      const drawY = dino.y;
      let drawHeight = dino.height;

      if (!imagesLoaded) {
        // Fallback mens bilder laster
        ctx.fillStyle = '#FF8DA1';
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
        return;
      }

      if (!gameRunning) {
        // Før spillet starter: vis DinoStart
        imageToDraw = dinoStartImage;
      } else if (dino.ducking) {
        // Dukker: vis DinoDuck
        imageToDraw = dinoDuckImage;
        drawHeight = 50; // DinoDuck er også 50x50
      } else if (dino.jumping) {
        // Hoppende: vis DinoRightUp (standard hopp-bilde)
        imageToDraw = dinoRightUpImage;
      } else {
        // Løpende: alterner mellom DinoRightUp og DinoLeftUp
        animationFrame++;
        // Økt fra 10 til 15 for å gjøre animasjonen litt saktere
        if (animationFrame % 15 < 7) {
          imageToDraw = dinoRightUpImage;
        } else {
          imageToDraw = dinoLeftUpImage;
        }
      }

      if (imageToDraw) {
        ctx.drawImage(imageToDraw, dino.x, drawY, dino.width, drawHeight);
      } else {
        // Fallback hvis bilde ikke er lastet
        ctx.fillStyle = '#FF8DA1';
        ctx.fillRect(dino.x, drawY, dino.width, drawHeight);
      }
    }

    function drawObstacle(obstacle: Obstacle) {
      if (!ctx) return;
      ctx.fillStyle = '#535353';
      if (obstacle.type === 'cactus') {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.fillRect(obstacle.x - 5, obstacle.y + 10, 5, 15);
        ctx.fillRect(obstacle.x + obstacle.width, obstacle.y + 10, 5, 15);
      } else {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 15);
        ctx.fillRect(obstacle.x + 5, obstacle.y + 15, obstacle.width - 10, 10);
      }
    }

    function drawGround() {
      if (!ctx) return;
      ctx.strokeStyle = '#535353';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, ground.y);
      ctx.lineTo(canvas.width, ground.y);
      ctx.stroke();
    }

    function createObstacle() {
      if (!canvas) return;
      const type: 'cactus' | 'bird' = Math.random() > 0.7 ? 'bird' : 'cactus';
      const obstacle: Obstacle = {
        x: canvas.width,
        width: type === 'cactus' ? 20 : 35,
        height: type === 'cactus' ? 40 : 25,
        type: type,
        y: 0,
      };

      if (type === 'cactus') {
        obstacle.y = ground.y - obstacle.height;
      } else {
        // Flytt fugler høyere opp slik at dinoen kan dukke under dem
        // Dinoen når den dukker er på Y=150 med høyde 50, så den går fra 150-200
        // Fuglene må være over Y=150 for at dinoen skal kunne dukke under
        obstacle.y = ground.y - 70; // Endret fra 70 til 100 for å gi mer plass
      }

      obstacles.push(obstacle);
    }

    function updateDino() {
      if (dino.jumping) {
        dino.velocityY += dino.gravity;
        dino.y += dino.velocityY;

        // Oppdatert y-posisjon for 50x50 dino
        const groundY = 150; // ground.y (200) - dino.height (50)
        if (dino.y >= groundY) {
          dino.y = groundY;
          dino.velocityY = 0;
          dino.jumping = false;
        }
      }
    }

    function updateObstacles() {
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= ground.speed;

        if (obstacles[i].x + obstacles[i].width < 0) {
          obstacles.splice(i, 1);
          localScore += 10;
          setScore(localScore);
        }
      }

      obstacleTimer++;
      if (obstacleTimer > 100) {
        createObstacle();
        obstacleTimer = 0;
      }
    }

    function checkCollision(): boolean {
      for (const obstacle of obstacles) {
        // Beregn faktisk dino-høyde og Y-posisjon basert på om den dukker eller ikke
        let dinoHeight: number;
        let dinoY: number;

        if (dino.ducking) {
          // Når dinoen dukker, skal den ha lavere høyde slik at den kan gå under fugler
          // DinoDuck.png er 50x50, men vi behandler den som lavere for collision detection
          dinoHeight = 30; // Lavere høyde når dukker (kan justeres)
          // Juster Y-posisjonen oppover for å matche den lavere høyden
          // Dinoen starter på Y=150, så vi flytter den oppover med differansen
          dinoY = dino.y + (dino.height - dinoHeight); // 150 + (50 - 30) = 170
        } else {
          dinoHeight = dino.height; // 50
          dinoY = dino.y; // 150
        }

        // Sjekk collision
        if (
          dino.x < obstacle.x + obstacle.width &&
          dino.x + dino.width > obstacle.x &&
          dinoY < obstacle.y + obstacle.height &&
          dinoY + dinoHeight > obstacle.y
        ) {
          return true;
        }
      }
      return false;
    }

    function jump() {
      if (!dino.jumping && !dino.ducking && gameRunning) {
        dino.jumping = true;
        dino.velocityY = dino.jumpPower;
      }
    }

    function duck() {
      if (!dino.jumping && gameRunning) {
        dino.ducking = true;
      }
    }

    function stopDuck() {
      dino.ducking = false;
    }

    function reset() {
      dino.y = 150; // Oppdatert for 50x50 dino
      dino.velocityY = 0;
      dino.jumping = false;
      dino.ducking = false;
      obstacles = [];
      obstacleTimer = 0;
      localScore = 0;
      animationFrame = 0;
      setScore(0);
      setGameOver(false);
      gameRunning = true;
      setGameStarted(true);
    }

    function gameLoop() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGround();
      drawDino();

      if (gameRunning) {
        updateDino();
        updateObstacles();

        for (const obstacle of obstacles) {
          drawObstacle(obstacle);
        }

        if (checkCollision()) {
          setGameOver(true);
          gameRunning = false;
        }
      } else {
        for (const obstacle of obstacles) {
          drawObstacle(obstacle);
        }
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!gameRunning) {
          reset();
        } else {
          jump();
        }
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        if (gameRunning) {
          duck();
        }
      }
      if (e.code === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        stopDuck();
      }
    };

    const handleClick = () => {
      if (!gameRunning) {
        reset();
      } else {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('click', handleClick);

    gameLoop();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, onClose]);

  // Reset state når modal lukkes
  useEffect(() => {
    if (!isOpen) {
      setScore(0);
      setGameOver(false);
      setGameStarted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#f7f7f7',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '900px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#535353',
            lineHeight: 1,
            padding: '5px 10px',
          }}
          aria-label="Lukk"
        >
          ×
        </button>

        <div style={{ textAlign: 'center' }}>
          <h2
            style={{ color: '#535353', marginBottom: '10px', fontSize: '32px' }}
          >
            Dino Game
          </h2>
          <div
            style={{ fontSize: '20px', color: '#535353', marginBottom: '15px' }}
          >
            Poeng: <strong>{score}</strong>
          </div>

          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            style={{
              border: '2px solid #535353',
              background: '#fff',
              display: 'block',
              margin: '0 auto',
              maxWidth: '100%',
              borderRadius: '8px',
            }}
          />

          <div
            style={{
              color: '#535353',
              marginTop: '15px',
              fontSize: '14px',
            }}
          >
            {!gameStarted && 'Trykk SPACE for å starte'}
            {gameOver && 'GAME OVER - Trykk SPACE for å prøve igjen'}
            {gameStarted &&
              !gameOver &&
              '⬆ SPACE: Hopp | ⬇ PIL: Dukk | ESC: Lukk'}
          </div>
        </div>
      </div>
    </div>
  );
}
