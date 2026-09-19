import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Terminal, Zap, ShieldAlert, Code2 } from 'lucide-react';
import { cyberAudio } from '../audio/cyberAudio';

export const SkillsDistrict: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header telemetry */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={16} />
          <span>SKILLS & ARSENAL // TECHNICAL COMPETENCIES & STACK</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--cyber-text-muted)' }}>
          PROFICIENCY METRICS // 100% OPERATIONAL
        </span>
      </div>

      {/* Category selector tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          paddingBottom: '4px'
        }}
      >
        {SKILL_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.code}
            onClick={() => {
              cyberAudio.playClick();
              setActiveCategory(idx);
            }}
            className="cyber-btn"
            style={{
              borderColor: activeCategory === idx ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
              backgroundColor: activeCategory === idx ? '#ffffff' : 'transparent',
              color: activeCategory === idx ? '#000000' : 'var(--cyber-text-muted)',
              fontWeight: activeCategory === idx ? 'bold' : 'normal'
            }}
          >
            <Cpu size={14} />
            <span>[{cat.code}] {cat.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Skills Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {SKILL_CATEGORIES[activeCategory].skills.map((skill, i) => (
          <div
            key={skill.name}
            className="cyber-corner"
            style={{
              padding: '20px',
              backgroundColor: 'rgba(12, 12, 16, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative'
            }}
            onMouseEnter={() => cyberAudio.playHover()}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid #ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}
                >
                  {skill.iconText}
                </span>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff' }}>
                    {skill.name}
                  </h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--cyber-text-muted)' }}>
                    TYPE: {skill.category}
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: '#ffffff',
                  fontWeight: 'bold'
                }}
              >
                {skill.level}%
              </span>
            </div>

            {/* Proficiency progress bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '1px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                  transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>

            {/* Details */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--cyber-text-muted)', lineHeight: '1.4' }}>
              {skill.details}
            </p>
          </div>
        ))}
      </div>

      {/* Summary note */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 18px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#ffffff'
        }}
      >
        <Zap size={16} />
        <span>DEVELOPER CAPABILITY: HIGH-FIDELITY WEBGL ENGINE INTEGRATION & REACT STATE SYNCHRONIZATION</span>
      </div>
    </div>
  );
};
