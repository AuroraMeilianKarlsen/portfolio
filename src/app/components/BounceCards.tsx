'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  triggerOnScroll?: boolean;
}

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover = false,
  triggerOnScroll = false,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Registrer ScrollTrigger plugin kun på klienten etter mount
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (triggerOnScroll && containerRef.current) {
        // Scroll-triggered animasjon
        gsap.fromTo(
          '.card',
          { scale: 0 },
          {
            scale: 1,
            stagger: animationStagger,
            ease: easeType,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center -200px', // Starter når elementet er på midten i viewport -200px
              toggleActions: 'play none none none', // Spill kun når den kommer inn i view
            },
          }
        );
      } else {
        // Original delay-basert animasjon
        gsap.fromTo(
          '.card',
          { scale: 0 },
          {
            scale: 1,
            stagger: animationStagger,
            ease: easeType,
            delay: animationDelay,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType, triggerOnScroll]);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (
    baseTransform: string,
    offsetX: number
  ): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover) return;

    const ctx = gsap.context(() => {
      images.forEach((_, i) => {
        const selector = `.card-${i}`;
        gsap.killTweensOf(selector);

        const baseTransform = transformStyles[i] || 'none';

        if (i === hoveredIdx) {
          const noRotation = getNoRotationTransform(baseTransform);
          gsap.to(selector, {
            transform: noRotation,
            duration: 0.4,
            ease: 'back.out(1.4)',
            overwrite: 'auto',
          });
        } else {
          const offsetX = i < hoveredIdx ? -160 : 160;
          const pushedTransform = getPushedTransform(baseTransform, offsetX);

          const distance = Math.abs(hoveredIdx - i);
          const delay = distance * 0.05;

          gsap.to(selector, {
            transform: pushedTransform,
            duration: 0.4,
            ease: 'back.out(1.4)',
            delay,
            overwrite: 'auto',
          });
        }
      });
    });

    return () => ctx.revert();
  };

  const resetSiblings = () => {
    if (!enableHover) return;

    const ctx = gsap.context(() => {
      images.forEach((_, i) => {
        const selector = `.card-${i}`;
        gsap.killTweensOf(selector);

        const baseTransform = transformStyles[i] || 'none';
        gsap.to(selector, {
          transform: baseTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      });
    });

    return () => ctx.revert();
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => {
        const imageName = src.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
        return (
          <div
            key={idx}
            className={`card card-${idx} absolute w-[200px] aspect-square border-4 rounded-[30px] overflow-hidden`}
            style={{
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              transform: transformStyles[idx] || 'none',
              borderColor: '#F5E9DC',
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
            role="img"
            aria-label={`Bilde ${idx + 1} av ${images.length} fra bildegalleri`}
          >
            <Image
              className="w-full h-full object-cover"
              src={src}
              alt={`Bilde fra Italia: ${imageName}`}
              width={200}
              height={200}
            />
          </div>
        );
      })}
    </div>
  );
}
