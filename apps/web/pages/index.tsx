import * as React from 'react';
import { Home } from "app/screens/home";
import AuthButton from '../components/AuthButton';
import { MusicPlayerDemo } from '../components/MusicPlayerDemo';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-foreground">Onstage</h1>
          </div>
          <AuthButton />
        </div>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Home />
          </div>
          <div>
            <MusicPlayerDemo />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
