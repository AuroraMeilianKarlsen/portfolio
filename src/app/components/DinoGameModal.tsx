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

    const dino: Dino = {
      x: 50,
      y: 172, // Justert: ground.y (200) - dino.height (20) - bein høyde (8) = 172
      width: 40,
      height: 20,
      velocityY: 0,
      jumping: false,
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

      ctx.fillStyle = '#FF8DA1';

      // Kropp
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

      // hals
      const neckWidth = 10; // Bredden på halsen
      const neckHeight = 20; // Høyden på halsen (hvor lang oppover)
      const neckX = dino.x + dino.width / 1 - neckWidth; //hals possisjon
      const neckY = dino.y - neckHeight; // Start halsen oppover fra toppen av kroppen

      ctx.fillRect(neckX, neckY, neckWidth, neckHeight);

      // hode
      const headWidth = 18; // Bredden på hodet
      const headHeight = 10; // Høyden på hodet
      const headX = dino.x + dino.width / 1.33; // setter hode på halsen
      const headY = neckY - headHeight + 4; // Plasser hodet over halsen

      ctx.fillRect(headX, headY, headWidth, headHeight);

      // Øye
      ctx.fillStyle = '#fff';
      ctx.fillRect(headX + 11, headY + 3, 4, 4);

      // Hale
      ctx.fillStyle = '#FF8DA1';
      ctx.beginPath();
      ctx.moveTo(dino.x, dino.y +10); // Startpunkt ved kroppen
      ctx.lineTo(dino.x - 15, dino.y + 8); // Spiss til venstre
      ctx.lineTo(dino.x - 0, dino.y + 3); // Nedre høyre punkt
      ctx.closePath();
      ctx.fill();

      // Bein
      ctx.fillRect(dino.x + 5, dino.y + dino.height, 8, 8);
      ctx.fillRect(dino.x + 27, dino.y + dino.height, 8, 8);
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
        obstacle.y = ground.y - 70;
      }

      obstacles.push(obstacle);
    }

    function updateDino() {
      if (dino.jumping) {
        dino.velocityY += dino.gravity;
        dino.y += dino.velocityY;

        if (dino.y >= 172) {
          dino.y = 172;
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
        if (
          dino.x < obstacle.x + obstacle.width &&
          dino.x + dino.width > obstacle.x &&
          dino.y < obstacle.y + obstacle.height &&
          dino.y + dino.height > obstacle.y
        ) {
          return true;
        }
      }
      return false;
    }

    function jump() {
      if (!dino.jumping && gameRunning) {
        dino.jumping = true;
        dino.velocityY = dino.jumpPower;
      }
    }

    function reset() {
      dino.y = 172;
      dino.velocityY = 0;
      dino.jumping = false;
      obstacles = [];
      obstacleTimer = 0;
      localScore = 0;
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
      if (e.code === 'Escape') {
        onClose();
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
    canvas.addEventListener('click', handleClick);

    gameLoop();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
              '⬆ Trykk SPACE eller klikk for å hoppe | ESC for å lukke'}
          </div>
        </div>
      </div>
    </div>
  );
}
