import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { Calendar, Award, CheckCircle2, ChevronRight, History } from 'lucide-react';
import { cyberAudio } from '../audio/cyberAudio';

export const ExperienceDistrict: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header telemetry */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingBottom: '14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: '#ffffff'
        }}
      >
        <History size={16} />
        <span>EXPERIENCE & JOURNEY // CHRONOLOGICAL AUDIT TRAIL</span>
      </div>

      {/* Timeline Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
        {EXPERIENCE_DATA.map((item, index) => (
          <div
            key={index}
            className="cyber-corner"
            style={{
              padding: '24px',
              backgroundColor: 'rgba(12, 12, 16, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              position: 'relative'
            }}
            onMouseEnter={() => cyberAudio.playHover()}
          >
            {/* Header info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    padding: '4px 10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid #ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#ffffff',
                    fontWeight: 'bold'
                  }}
                >
                  {item.period}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--cyber-text-muted)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '2px 8px'
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyber-text-muted)' }}>
                {item.location}
              </span>
            </div>

            {/* Title & Organization */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: '#fff', marginBottom: '4px' }}>
                {item.role}
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#ffffff' }}>
                // {item.organization}
              </p>
            </div>

            {/* Summary */}
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--cyber-text)', lineHeight: '1.5' }}>
              {item.summary}
            </p>

            {/* Deliverables */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ffffff', fontWeight: 'bold' }}>
                KEY ACHIEVEMENTS:
              </span>
              {item.deliverables.map((del, dIdx) => (
                <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <ChevronRight size={14} color="#ffffff" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--cyber-text-muted)' }}>
                    {del}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
