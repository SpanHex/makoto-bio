import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { User, Compass, Cpu, MapPin, Sparkles, Award, Code, Globe, ArrowRight } from 'lucide-react';
import { DistrictId } from '../types';

interface AboutDistrictProps {
  onNavigate: (id: DistrictId) => void;
}

export const AboutDistrict: React.FC<AboutDistrictProps> = ({ onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner with Bio */}
      <div 
        className="cyber-notch-tl"
        style={{
          backgroundColor: 'rgba(12, 12, 16, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '24px',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
          {/* Avatar / Hologram Box */}
          <div
            className="cyber-corner"
            style={{
              width: '90px',
              height: '90px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '2px solid #ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.25)'
            }}
          >
            <User size={36} color="#ffffff" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#ffffff', marginTop: '4px' }}>
              SPN-01
            </span>
          </div>

          {/* Intro text */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff', letterSpacing: '0.1em' }}>
                ABOUT ME // CREATIVE DEVELOPER PROFILE //
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyber-text-muted)' }}>
                <MapPin size={12} color="#ffffff" />
                {PERSONAL_INFO.location}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: '#fff', letterSpacing: '0.05em', marginBottom: '8px' }}>
              {PERSONAL_INFO.name}
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--cyber-text)', lineHeight: '1.6', marginBottom: '14px' }}>
              {PERSONAL_INFO.bio}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ padding: '4px 10px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffffff' }}>
                COORDS: {PERSONAL_INFO.coordinates}
              </span>
              <span style={{ padding: '4px 10px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffffff' }}>
                HANDLE: {PERSONAL_INFO.handle}
              </span>
              <span style={{ padding: '4px 10px', backgroundColor: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.3)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffffff' }}>
                EXPERIENCE: 1+ YEARS PRODUCTION
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Philosophy & Creative Pillars */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#ffffff', letterSpacing: '0.1em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={18} />
          <span>DEVELOPMENT PHILOSOPHY & PILLARS</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div
            className="cyber-corner"
            style={{
              padding: '20px',
              backgroundColor: 'rgba(12, 12, 16, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Sparkles size={20} color="#ffffff" />
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff' }}>ATMOSPHERE & DEPTH</h4>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--cyber-text-muted)', lineHeight: '1.5' }}>
              Websites shouldn't just be flat documents. Through real-time 3D, spatial lighting, and procedural audio, digital interfaces become tangible environments that leave an impression.
            </p>
          </div>

          <div
            className="cyber-corner"
            style={{
              padding: '20px',
              backgroundColor: 'rgba(12, 12, 16, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Cpu size={20} color="#ffffff" />
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff' }}>60+ FPS PERFORMANCE</h4>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--cyber-text-muted)', lineHeight: '1.5' }}>
              Heavy visuals mean nothing if they stutter. Every shader, mesh draw-call, and frame calculation is profiled to maintain liquid-smooth responsiveness across modern desktop and mobile browsers.
            </p>
          </div>

          <div
            className="cyber-corner"
            style={{
              padding: '20px',
              backgroundColor: 'rgba(12, 12, 16, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Code size={20} color="#ffffff" />
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff' }}>INTENTIONAL CRAFT</h4>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--cyber-text-muted)', lineHeight: '1.5' }}>
              Typography, timing curves, micro-interactions, and state transitions are fine-tuned by hand. Every pixel and interaction is designed with purpose rather than generated off generic templates.
            </p>
          </div>
        </div>
      </div>

      {/* Quick CTAs to other sectors */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-end', paddingTop: '10px' }}>
        <button 
          onClick={() => onNavigate('projects')} 
          className="cyber-btn cyber-btn-magenta"
        >
          <span>EXPLORE QUANTUM LAB (PROJECTS)</span>
          <ArrowRight size={14} />
        </button>
        <button 
          onClick={() => onNavigate('contact')} 
          className="cyber-btn"
        >
          <span>OPEN SIGNAL RELAY (CONTACT)</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
