import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ExternalLink, Github, Layers, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { cyberAudio } from '../audio/cyberAudio';

export const ProjectsDistrict: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured' | 'system' | 'creative'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('unipath');

  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (selectedFilter === 'featured') return project.featured;
    if (selectedFilter === 'system') return project.category.includes('SYSTEM') || project.category.includes('EDUCATION');
    if (selectedFilter === 'creative') return project.category.includes('EXPERIMENTAL') || project.category.includes('PERSONAL') || project.category.includes('ARCHIVE');
    return true;
  });

  const toggleExpand = (id: string) => {
    cyberAudio.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Filter and stats header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          paddingBottom: '14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#ffffff" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--cyber-text)', letterSpacing: '0.08em' }}>
            PORTFOLIO & PROJECTS // {PROJECTS_DATA.length} DEPLOYED WORLDS
          </span>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {[
            { key: 'all', label: 'ALL WORLDS' },
            { key: 'featured', label: 'FEATURED' },
            { key: 'system', label: 'SYSTEMS' },
            { key: 'creative', label: 'ATMOSPHERIC' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                cyberAudio.playClick();
                setSelectedFilter(tab.key as any);
              }}
              className="cyber-btn"
              style={{
                padding: '4px 12px',
                fontSize: '11px',
                borderColor: selectedFilter === tab.key ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                backgroundColor: selectedFilter === tab.key ? '#ffffff' : 'transparent',
                color: selectedFilter === tab.key ? '#000000' : 'var(--cyber-text-muted)',
                fontWeight: selectedFilter === tab.key ? 'bold' : 'normal'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {filteredProjects.map(project => {
          const isExpanded = expandedId === project.id;
          return (
            <div
              key={project.id}
              className="cyber-corner"
              style={{
                backgroundColor: 'rgba(12, 12, 16, 0.85)',
                border: isExpanded ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: isExpanded ? '0 0 25px rgba(255, 255, 255, 0.15)' : 'none',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Card top banner */}
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(16, 16, 22, 0.7)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#ffffff',
                      fontWeight: 'bold'
                    }}
                  >
                    [{project.index}]
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--cyber-text-muted)',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                {project.featured && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      padding: '2px 8px',
                      borderRadius: '2px'
                    }}
                  >
                    <Sparkles size={10} />
                    FLAGSHIP
                  </span>
                )}
              </div>

              {/* Card main info */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '19px',
                    color: '#fff',
                    letterSpacing: '0.06em',
                    marginBottom: '6px'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#ffffff',
                    marginBottom: '12px'
                  }}
                >
                  // {project.tagline}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--cyber-text-muted)',
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        padding: '3px 8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        color: '#ffffff'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expandable highlights */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '14px',
                      backgroundColor: 'rgba(8, 8, 10, 0.8)',
                      borderLeft: '2px solid #ffffff',
                      marginBottom: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff' }}>
                      KEY SPECIFICATIONS & ARCHITECTURE:
                    </span>
                    {project.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle2 size={13} color="#ffffff" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--cyber-text)' }}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  {/* Expand toggle */}
                  <button
                    onClick={() => toggleExpand(project.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--cyber-text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {isExpanded ? 'LESS DETAILS' : 'INSPECT ARCHITECTURE'}
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn"
                      style={{
                        padding: '6px 14px',
                        fontSize: '11px',
                        borderColor: 'rgba(255, 255, 255, 0.6)',
                        color: '#ffffff'
                      }}
                      onMouseEnter={() => cyberAudio.playHover()}
                    >
                      <span>LAUNCH</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
