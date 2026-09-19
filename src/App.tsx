import React, { useState, useEffect, useCallback } from 'react';
import { CityCanvas } from './components/CityCanvas';
import { CityHUD } from './components/CityHUD';
import { DistrictModal } from './components/DistrictModal';
import { AboutDistrict } from './pages/AboutDistrict';
import { ProjectsDistrict } from './pages/ProjectsDistrict';
import { SkillsDistrict } from './pages/SkillsDistrict';
import { ExperienceDistrict } from './pages/ExperienceDistrict';
import { ContactDistrict } from './pages/ContactDistrict';
import { DISTRICTS } from './data/portfolioData';
import { DistrictConfig, DistrictId } from './types';
import { cyberAudio } from './audio/cyberAudio';

export default function App() {
  const [activeDistrict, setActiveDistrict] = useState<DistrictId | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictConfig | null>(null);
  const [hoveredScreenPos, setHoveredScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [cameraInfo, setCameraInfo] = useState<{ x: string; y: string; z: string; angle: number }>({
    x: '0.0',
    y: '6.5',
    z: '12.5',
    angle: 0
  });

  // Synchronize with URL hash routing (e.g., #/about, #/projects, #about)
  const syncFromHash = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    const validIds: DistrictId[] = ['about', 'projects', 'skills', 'experience', 'contact'];
    if (validIds.includes(rawHash as DistrictId)) {
      setActiveDistrict(rawHash as DistrictId);
    } else {
      setActiveDistrict(null);
    }
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [syncFromHash]);

  const handleSelectDistrict = useCallback((id: DistrictId) => {
    window.location.hash = `#/${id}`;
    setActiveDistrict(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveDistrict(null);
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }
  }, []);

  const handleHoverDistrictChange = useCallback(
    (district: DistrictConfig | null, screenPos: { x: number; y: number } | null) => {
      // Play audio blip on new target hover
      if (district && (!hoveredDistrict || hoveredDistrict.id !== district.id)) {
        cyberAudio.playHover();
      }
      setHoveredDistrict(district);
      setHoveredScreenPos(screenPos);
    },
    [hoveredDistrict]
  );

  const handleResetCamera = () => {
    window.location.hash = '';
    setActiveDistrict(null);
    setResetTrigger(prev => prev + 1);
  };

  const handleToggleAutoRotate = () => {
    setIsAutoRotating(prev => !prev);
  };

  const currentDistrictConfig = DISTRICTS.find(d => d.id === activeDistrict);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background 3D WebGL Canvas */}
      <CityCanvas
        activeDistrict={activeDistrict}
        onSelectDistrict={handleSelectDistrict}
        onHoverDistrictChange={handleHoverDistrictChange}
        isAutoRotating={isAutoRotating}
        onCameraUpdate={setCameraInfo}
        resetTrigger={resetTrigger}
      />

      {/* Cyberpunk HUD Overlay */}
      <CityHUD
        activeDistrict={activeDistrict}
        hoveredDistrict={hoveredDistrict}
        hoveredScreenPos={hoveredScreenPos}
        onSelectDistrict={handleSelectDistrict}
        onResetCamera={handleResetCamera}
        isAutoRotating={isAutoRotating}
        onToggleAutoRotate={handleToggleAutoRotate}
        cameraInfo={cameraInfo}
      />

      {/* Holographic District Terminal Modal / Page View */}
      {currentDistrictConfig && (
        <DistrictModal
          district={currentDistrictConfig}
          onClose={handleCloseModal}
          onSelectDistrict={handleSelectDistrict}
        >
          {activeDistrict === 'about' && (
            <AboutDistrict onNavigate={handleSelectDistrict} />
          )}
          {activeDistrict === 'projects' && (
            <ProjectsDistrict />
          )}
          {activeDistrict === 'skills' && (
            <SkillsDistrict />
          )}
          {activeDistrict === 'experience' && (
            <ExperienceDistrict />
          )}
          {activeDistrict === 'contact' && (
            <ContactDistrict />
          )}
        </DistrictModal>
      )}

      {/* Subtle Scanlines & Atmospheric Vignette */}
      <div className="scanline-overlay" />
      <div className="vignette-overlay" />
    </div>
  );
}
