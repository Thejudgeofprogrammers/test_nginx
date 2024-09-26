import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Chat from './Chat';
import SettingsModal from './SettingsModal';
import Dashboard from './Dashboard';

const MainContent: React.FC = () => {
  return (
    <Sidebar>
      <Routes>
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/settings" element={<SettingsModal onClose={() => {}} />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Sidebar>
  );
};

export default MainContent;
