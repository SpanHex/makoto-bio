import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, Crosshair, Navigation, Compass, Eye, Shield, Radio, Sparkles } from 'lucide-react';
import { DistrictConfig, DistrictId } from '../types';
import { DISTRICTS, PERSONAL_INFO } from '../data/portfolioData';
import { cyberAudio } from '../audio/cyberAudio';

interface CityHUDProps {
  activeDistrict: DistrictId | null;
  hoveredDistrict: DistrictConfig | null;
  hoveredScreenPos: { x: number; y: number } | null;
  onSelectDistrict: (id: DistrictId) => void;
  onResetCamera: () => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  cameraInfo: { x: string; y: string; z: string; angle: number };
}

export const CityHUD: React.FC<CityHUDProps> = ({
  activeDistrict,
  hoveredDistrict,
  hoveredScreenPos,
  onSelectDistrict,
  onResetCamera,
  isAutoRotating,
  onToggleAutoRotate,
  cameraInfo
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [fps, setFps] = useState(60);

  // FPS Counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleSound = () => {
    const nextState = cyberAudio.toggle();
    setSoundEnabled(nextState);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 30
      }}
    >
      {/* Top HUD Bar */}
      <header
        className="hud-header"
      >
        {/* Brand & Identity */}
        <div
          className="cyber-notch-tl"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '10px 18px',
            backgroundColor: 'rgba(8, 8, 10, 0.92)',
            border: '1px solid var(--cyber-border-strong)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 10px #ffffff'
            }}
            className="animate-pulse-slow"
          />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '0.12em',
                  color: '#fff'
                }}
              >
                SPANDAN
              </span>
              <span className="jp-badge" style={{ fontSize: '11px', padding: '1px 6px' }}>
                スパンダン
              </span>
              <span style={{ color: '#ffffff', fontSize: '12px' }}>//</span>
              <span
                className="hud-brand-subtitle"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: '#ffffff',
                  letterSpacing: '0.1em'
                }}
              >
                CYBERPUNK 3D GRID
              </span>
              <span className="font-jp hud-brand-jp" style={{ fontSize: '11px', color: '#ffffff', opacity: 0.85 }}>
                [電脳都市網]
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--cyber-text-muted)',
                letterSpacing: '0.06em',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                marginTop: '2px'
              }}
            >
              <span>CORE: ONLINE [{fps} FPS] // ASSAM, IN</span>
              <span className="font-jp hud-brand-jp" style={{ color: '#ffffff', fontSize: '10px' }}>
                ● 接続正常
              </span>
            </div>
          </div>
        </div>

        {/* Center telemetry */}
        <div
          className="cyber-corner"
          style={{
            display: 'none', // Shown on large screens
            alignItems: 'center',
            gap: '16px',
            padding: '8px 18px',
            backgroundColor: 'rgba(8, 8, 10, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--cyber-text-muted)'
          }}
        >
          <span>CAM: X:{cameraInfo.x} Y:{cameraInfo.y} Z:{cameraInfo.z}</span>
          <span style={{ color: '#ffffff' }}>|</span>
          <span>MODE: {isAutoRotating ? 'DRONE TOUR // 自動巡航' : 'MANUAL ORBIT // 手動操作'}</span>
        </div>

        {/* Action controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Drone tour toggle */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onToggleAutoRotate();
            }}
            className="cyber-btn"
            style={{
              padding: '8px 12px',
              fontSize: '11px',
              borderColor: isAutoRotating ? '#ffffff' : 'var(--cyber-border)',
              backgroundColor: isAutoRotating ? 'rgba(255, 255, 255, 0.2)' : 'rgba(8, 8, 10, 0.9)'
            }}
            title="Toggle Cinematic Drone Tour // 自動巡航切り替え"
          >
            <Compass size={14} className={isAutoRotating ? 'animate-spin' : ''} />
            <span className="font-jp" style={{ fontSize: '11px' }}>巡航</span>
          </button>

          {/* Reset Camera View */}
          <button
            onClick={() => {
              cyberAudio.playReturn();
              onResetCamera();
            }}
            className="cyber-btn"
            style={{ padding: '8px 12px', fontSize: '11px', backgroundColor: 'rgba(8, 8, 10, 0.9)' }}
            title="Reset Panoramic View // 視点初期化"
          >
            <RotateCcw size={14} />
            <span className="font-jp" style={{ fontSize: '11px' }}>初期化</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="cyber-btn"
            style={{
              padding: '8px 14px',
              fontSize: '11px',
              borderColor: soundEnabled ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
              backgroundColor: soundEnabled ? 'rgba(255, 255, 255, 0.18)' : 'rgba(8, 8, 10, 0.9)',
              color: soundEnabled ? '#ffffff' : 'var(--cyber-text-muted)'
            }}
            title={soundEnabled ? 'Mute Cyber Synthesizer' : 'Enable Cyber Synthesizer'}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>AUDIO // <span className="font-jp">音響</span> {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </header>

      {/* Target Reticle Lock-On (monochrome black and white) */}
      {hoveredDistrict && hoveredScreenPos && !activeDistrict && (
        <div
          style={{
            position: 'fixed',
            left: `${hoveredScreenPos.x}px`,
            top: `${hoveredScreenPos.y}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.15s ease'
          }}
        >
          {/* Crosshair Brackets */}
          <div
            style={{
              width: '56px',
              height: '56px',
              border: '2px solid #ffffff',
              borderRadius: '50%',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Crosshair size={22} color="#ffffff" />
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                width: '12px',
                height: '2px',
                backgroundColor: '#ffffff'
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '-8px',
                width: '12px',
                height: '2px',
                backgroundColor: '#ffffff'
              }}
            />
          </div>

          {/* Locked district tag */}
          <div
            className="cyber-corner"
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(6, 6, 8, 0.96)',
              border: '1px solid #ffffff',
              boxShadow: '0 0 16px rgba(255, 255, 255, 0.35)',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#ffffff',
                fontWeight: 'bold',
                letterSpacing: '0.1em'
              }}
            >
              [{hoveredDistrict.sectorCode}] {hoveredDistrict.name} // {hoveredDistrict.simpleName.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--cyber-text-muted)',
                letterSpacing: '0.05em'
              }}
            >
              CLICK TO ACCESS TERMINAL
            </div>
          </div>
        </div>
      )}

      {/* Bottom-Left Navigation Hint - Pinned to bottom-left corner */}
      <div
        className="cyber-nav-hint cyber-notch-tl"
        style={{
          opacity: activeDistrict ? 0 : 0.85,
          pointerEvents: activeDistrict ? 'none' : 'auto',
          transition: 'opacity 0.25s ease'
        }}
      >
        <span style={{ color: '#ffffff', fontWeight: 'bold' }}>NAV:</span>
        <span>DRAG TO ORBIT // CLICK BEACONS</span>
      </div>

      {/* Center District Quick-Dock - Strictly pinned to bottom-center */}
      <nav
        aria-label="Sector Navigation Dock"
        className="cyber-dock cyber-corner"
        style={{
          opacity: activeDistrict ? 0 : 1,
          pointerEvents: activeDistrict ? 'none' : 'auto',
          transition: 'opacity 0.25s ease'
        }}
      >
        {DISTRICTS.map((district) => {
          const isActive = activeDistrict === district.id;
          const isHovered = hoveredDistrict?.id === district.id;

          return (
            <button
              key={district.id}
              onClick={() => {
                cyberAudio.playWarp();
                onSelectDistrict(district.id);
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="cyber-btn"
              style={{
                borderColor: isActive || isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: isActive
                  ? '#ffffff'
                  : isHovered
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(14, 14, 18, 0.6)',
                color: isActive ? '#000000' : isHovered ? '#ffffff' : 'var(--cyber-text-muted)',
                boxShadow: isActive ? '0 0 16px rgba(255, 255, 255, 0.5)' : 'none',
                padding: '6px 12px',
                fontSize: '11px',
                letterSpacing: '0.08em',
                fontWeight: isActive ? 'bold' : 'normal',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ color: isActive ? '#000000' : '#ffffff', fontWeight: 'bold' }}>
                {district.sectorCode}
              </span>
              <span className="dock-district-label">
                {district.name}
                <span
                  style={{
                    opacity: isActive ? 0.8 : 0.65,
                    marginLeft: '4px',
                    fontSize: '10px',
                    fontWeight: 'normal'
                  }}
                >
                  ({district.simpleName})
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* Right Mini-Radar - Pinned strictly to bottom-right corner */}
      <div
        className="cyber-radar cyber-corner"
        style={{
          opacity: activeDistrict ? 0 : 1,
          pointerEvents: activeDistrict ? 'none' : 'auto',
          transition: 'opacity 0.25s ease'
        }}
        title="City Orientation Radar"
      >
        {/* Radar Circles */}
        <div style={{ position: 'absolute', width: '58px', height: '58px', borderRadius: '50%', border: '1px dashed rgba(255, 255, 255, 0.25)' }} />
        <div style={{ position: 'absolute', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255, 255, 255, 0.18)' }} />
        {/* Cross lines */}
        <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        <div style={{ position: 'absolute', height: '100%', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* District blips on radar - Monochrome white */}
        {DISTRICTS.map((d) => {
          const rx = 38 + d.beaconPos[0] * 6.8;
          const ry = 38 + d.beaconPos[2] * 6.8;
          return (
            <span
              key={d.id}
              style={{
                position: 'absolute',
                left: `${rx}px`,
                top: `${ry}px`,
                width: '3.5px',
                height: '3.5px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 6px #ffffff',
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}

        {/* Camera heading indicator */}
        <div
          style={{
            position: 'absolute',
            width: '16px',
            height: '16px',
            transform: `rotate(${cameraInfo.angle}deg)`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '0',
              height: '0',
              borderLeft: '3.5px solid transparent',
              borderRight: '3.5px solid transparent',
              borderBottom: '7px solid #ffffff'
            }}
          />
        </div>

        <span
          style={{
            position: 'absolute',
            bottom: '2px',
            fontFamily: 'var(--font-mono)',
            fontSize: '7.5px',
            color: '#ffffff',
            letterSpacing: '0.05em'
          }}
        >
          RADAR
        </span>
      </div>
    </div>
  );
};
