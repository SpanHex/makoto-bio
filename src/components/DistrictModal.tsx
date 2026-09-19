import React, { useEffect } from 'react';
import { X, ArrowLeft, Terminal, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { DistrictConfig, DistrictId } from '../types';
import { DISTRICTS } from '../data/portfolioData';
import { cyberAudio } from '../audio/cyberAudio';

interface DistrictModalProps {
  district: DistrictConfig;
  onClose: () => void;
  onSelectDistrict: (id: DistrictId) => void;
  children: React.ReactNode;
}

export const DistrictModal: React.FC<DistrictModalProps> = ({
  district,
  onClose,
  onSelectDistrict,
  children
}) => {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cyberAudio.playReturn();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Find previous and next districts for quick traversal
  const currentIndex = DISTRICTS.findIndex(d => d.id === district.id);
  const prevDistrict = DISTRICTS[(currentIndex - 1 + DISTRICTS.length) % DISTRICTS.length];
  const nextDistrict = DISTRICTS[(currentIndex + 1) % DISTRICTS.length];

  const handleClose = () => {
    cyberAudio.playReturn();
    onClose();
  };

  const handleSwitch = (id: DistrictId) => {
    cyberAudio.playClick();
    onSelectDistrict(id);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'rgba(4, 6, 12, 0.78)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="cyber-corner-lg"
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(8, 8, 10, 0.96)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 255, 255, 0.12), inset 0 0 30px rgba(255, 255, 255, 0.03)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Terminal Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            backgroundColor: 'rgba(12, 12, 16, 0.98)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.22)',
            position: 'relative'
          }}
        >
          {/* Left Title Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid #ffffff',
                color: '#ffffff'
              }}
            >
              <Terminal size={18} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    letterSpacing: '0.15em'
                  }}
                >
                  [{district.sectorCode}]
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    letterSpacing: '0.1em',
                    color: '#fff',
                    textTransform: 'uppercase'
                  }}
                >
                  {district.name}
                </h2>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    padding: '2px 8px',
                    borderRadius: '2px',
                    letterSpacing: '0.08em',
                    fontWeight: 'bold'
                  }}
                >
                  {district.simpleName.toUpperCase()}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--cyber-text-muted)',
                  letterSpacing: '0.08em'
                }}
              >
                {district.subtitle}
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Sector status tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '2px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#ffffff'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 6px #ffffff'
                }}
              />
              {district.statusText}
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="cyber-btn"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.4)',
                color: '#ffffff',
                padding: '6px 14px',
                fontSize: '12px'
              }}
              aria-label="Exit terminal back to city"
            >
              <X size={15} />
              <span>RETURN TO CITY [ESC]</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '28px',
            position: 'relative'
          }}
        >
          {children}
        </div>

        {/* Terminal Footer Bar with Sector Quick-Switch */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            backgroundColor: 'rgba(8, 8, 10, 0.98)',
            borderTop: '1px solid rgba(255, 255, 255, 0.18)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--cyber-text-muted)'
          }}
        >
          {/* Quick Prev Switch */}
          <button
            onClick={() => handleSwitch(prevDistrict.id)}
            className="cyber-btn"
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            <ChevronLeft size={14} />
            <span>PREV: {prevDistrict.name} ({prevDistrict.simpleName})</span>
          </button>

          {/* Center telemetry */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={13} color="#ffffff" />
            <span>TERMINAL UPLINK: ENCRYPTED // NODE: {district.sectorCode}</span>
          </div>

          {/* Quick Next Switch */}
          <button
            onClick={() => handleSwitch(nextDistrict.id)}
            className="cyber-btn"
            style={{ padding: '4px 10px', fontSize: '11px' }}
          >
            <span>NEXT: {nextDistrict.name} ({nextDistrict.simpleName})</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
