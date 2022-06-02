import React from 'react';
import './App.css';
import MainLayout from './components/layout/main-layout';
import MainPage from './pages/main-page';

function App() {
  return (
    <MainLayout>
      <MainPage/>
    </MainLayout>
  );
}

export default App;
