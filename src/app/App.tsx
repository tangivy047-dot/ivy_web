import { useState } from "react";
import { Toaster } from "sonner";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { AboutMe } from "./components/AboutMe";
import { Projects } from "./components/Projects";
import { AICoding } from "./components/AICoding";
import { Prompts } from "./components/Prompts";
import { ContactMe } from "./components/ContactMe";
import { Chatbot } from "./components/Chatbot";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}
      
      {loadingComplete && (
        <div className="min-h-screen">
          <CustomCursor />
          <Navigation />
          <Hero />
          <AboutMe />
          <Projects />
          <AICoding />
          <Prompts />
          <ContactMe />
          <Chatbot />
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                border: '4px solid black',
                boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '10px',
              },
            }}
          />
        </div>
      )}
    </>
  );
}