import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Github, Instagram, Send, Copy, Check, Radio, Terminal, AlertCircle } from 'lucide-react';
import { cyberAudio } from '../audio/cyberAudio';

export const ContactDistrict: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'transmitted'>('idle');

  const copyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    cyberAudio.playWarp();
    setStatus('transmitting');
    setTimeout(() => {
      setStatus('transmitted');
      cyberAudio.playLock();
      // Mailto fallback link
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Neural Uplink from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nSender Email: ' + formState.email)}`;
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Uplink Status Header */}
      <div
        className="cyber-notch-tl"
        style={{
          backgroundColor: 'rgba(12, 12, 16, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Radio size={24} color="#ffffff" className="animate-pulse-slow" />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: '#fff' }}>
              CONTACT & INQUIRIES // DIRECT SIGNAL FREQUENCY
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyber-text-muted)' }}>
              RECEPTIVE TO CREATIVE COLLABORATIONS & ENGINEERING ROLES
            </p>
          </div>
        </div>

        {/* Copy Email Button */}
        <button
          onClick={copyEmail}
          className="cyber-btn"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.6)',
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.08)'
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'FREQUENCY COPIED!' : PERSONAL_INFO.email}</span>
        </button>
      </div>

      {/* Grid: Transmission Form & Channels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Transmission Form */}
        <form
          onSubmit={handleSubmit}
          className="cyber-corner"
          style={{
            padding: '24px',
            backgroundColor: 'rgba(12, 12, 16, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px' }}>
            <Terminal size={16} color="#ffffff" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fff', letterSpacing: '0.1em' }}>
              DISPATCH NEURAL TRANSMISSION
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyber-text-muted)', marginBottom: '6px' }}>
              CALLSIGN / YOUR NAME:
            </label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={e => setFormState({ ...formState, name: e.target.value })}
              placeholder="e.g. Commander Shepard"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'rgba(6, 6, 8, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyber-text-muted)', marginBottom: '6px' }}>
              RETURN FREQUENCY / EMAIL:
            </label>
            <input
              type="email"
              required
              value={formState.email}
              onChange={e => setFormState({ ...formState, email: e.target.value })}
              placeholder="e.g. pilot@quantum.network"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'rgba(6, 6, 8, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyber-text-muted)', marginBottom: '6px' }}>
              TRANSMISSION PACKET / MESSAGE:
            </label>
            <textarea
              required
              rows={4}
              value={formState.message}
              onChange={e => setFormState({ ...formState, message: e.target.value })}
              placeholder="Tell me about your project, idea, or world you want to build..."
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: 'rgba(6, 6, 8, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'transmitting'}
            className="cyber-btn"
            style={{
              borderColor: '#ffffff',
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              justifyContent: 'center',
              padding: '10px',
              marginTop: '4px'
            }}
          >
            <Send size={15} />
            <span>{status === 'transmitting' ? 'ENCRYPTING & SENDING...' : status === 'transmitted' ? 'TRANSMITTED!' : 'TRANSMIT SIGNAL'}</span>
          </button>
        </form>

        {/* Uplink Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            className="cyber-corner"
            style={{
              padding: '24px',
              backgroundColor: 'rgba(12, 12, 16, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', color: '#fff' }}>
              AUTHENTICATED COMMS CHANNELS
            </h4>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="cyber-btn"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <Mail size={16} color="#ffffff" />
              <span>EMAIL: {PERSONAL_INFO.email}</span>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <Github size={16} color="#ffffff" />
              <span>GITHUB: {PERSONAL_INFO.handle}</span>
            </a>

            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn"
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              <Instagram size={16} color="#ffffff" />
              <span>INSTAGRAM: @nocturnalmakoto</span>
            </a>
          </div>

          {/* Uplink Telemetry card */}
          <div
            className="cyber-corner"
            style={{
              padding: '18px',
              backgroundColor: 'rgba(8, 12, 22, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--cyber-text-muted)',
              lineHeight: '1.6'
            }}
          >
            <div>LOCATION: {PERSONAL_INFO.location}</div>
            <div>COORDINATES: {PERSONAL_INFO.coordinates}</div>
            <div>TIMEZONE: IST (UTC+05:30)</div>
            <div>STATUS: {PERSONAL_INFO.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
