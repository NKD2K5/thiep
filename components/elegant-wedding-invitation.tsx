"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Pause, Music, X } from "lucide-react"

export default function ElegantWeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [showDoves, setShowDoves] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchEndY, setTouchEndY] = useState(0)

  const ensureAudioInitialized = async (): Promise<HTMLAudioElement | null> => {
    if (audio) return audio

    const candidateUrl = process.env.NEXT_PUBLIC_MUSIC_URL || "/wedding-music.mp3"
    try {
      const headResponse = await fetch(candidateUrl, { method: "HEAD" })
      if (!headResponse.ok) {
        console.log("Music file not found:", candidateUrl)
        return null
      }
    } catch {
      console.log("Music file check failed")
      return null
    }

    const audioElement = new Audio(candidateUrl)
    audioElement.loop = true
    audioElement.volume = 0.3
    setAudio(audioElement)
    return audioElement
  }

  const handleOpenInvitation = () => {
    setIsOpened(true)
    setTimeout(() => {
      setShowDoves(true)
    }, 1200)

    ensureAudioInitialized().then((a) => {
      if (a && !isPlaying) {
        a.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Autoplay blocked"))
      }
    })
  }

  const handleCloseInvitation = () => {
    setIsOpened(false)
    setShowDoves(false)
    
    // Stop music when closing invitation
    if (audio && isPlaying) {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const toggleMusic = () => {
    ensureAudioInitialized().then((a) => {
      if (!a) return
      if (isPlaying) {
        a.pause()
        setIsPlaying(false)
      } else {
        a.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Audio play failed"))
      }
    })
  }

  // Touch handlers for swipe down to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndY(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStartY || !touchEndY) return
    const distance = touchStartY - touchEndY
    const isUpSwipe = distance > 50
    if (isUpSwipe && isOpened) {
      handleCloseInvitation()
    }
  }

  // Double click to close
  const handleDoubleClick = () => {
    if (isOpened) {
      handleCloseInvitation()
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/Background%20.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Floating Hearts and Bubbles Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Red Hearts */}
        <div className="absolute top-10 left-10 w-10 h-10 text-red-500 animate-bounce" style={{animationDuration: '3s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute top-20 right-20 w-8 h-8 text-red-400 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 w-12 h-12 text-red-600 animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 w-6 h-6 text-red-500 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '3s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        
        {/* Bubbles */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/30 rounded-full animate-pulse" style={{animationDuration: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/40 rounded-full animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-white/20 rounded-full animate-pulse" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-7 h-7 bg-white/35 rounded-full animate-pulse" style={{animationDuration: '2.5s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-5 h-5 bg-white/25 rounded-full animate-pulse" style={{animationDuration: '3.5s', animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/6 right-1/6 w-9 h-9 bg-white/30 rounded-full animate-pulse" style={{animationDuration: '2.8s', animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/6 left-1/6 w-6 h-6 bg-white/40 rounded-full animate-pulse" style={{animationDuration: '3.2s', animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/2 right-1/6 w-8 h-8 bg-white/20 rounded-full animate-pulse" style={{animationDuration: '4.5s', animationDelay: '1.8s'}}></div>
        
        {/* More Hearts */}
        <div className="absolute top-1/5 left-1/5 w-8 h-8 text-red-300 animate-bounce" style={{animationDuration: '6s', animationDelay: '4s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute top-1/6 right-1/5 w-6 h-6 text-red-400 animate-bounce" style={{animationDuration: '5.5s', animationDelay: '5s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/5 left-1/5 w-10 h-10 text-red-500 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '6s'}}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
      {/* Falling rose petals effect */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={`petal-${i}`}
              className={`absolute ${
                i % 3 === 0 ? "petal-falling" : i % 3 === 1 ? "petal-falling-slow" : "petal-falling-fast"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" className="text-primary/30 drop-shadow-sm">
                <path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 20C16 16 19 13 19 9C19 5 16 2 12 2Z" fill="currentColor" />
                <path
                  d="M12 6C10 6 8.5 7.5 8.5 9.5C8.5 11.5 10 13 12 15C14 13 15.5 11.5 15.5 9.5C15.5 7.5 14 6 12 6Z"
                  fill="currentColor"
                  className="text-accent/40"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Subtle background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner floral elements */}
        <div className="absolute top-8 left-8 w-24 h-24 opacity-20 floral-breathe">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/30"
            />
            <circle cx="35" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="35" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
          </svg>
        </div>

        <div className="absolute top-8 right-8 w-24 h-24 opacity-20 floral-breathe" style={{ animationDelay: "1s" }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/30"
            />
            <circle cx="35" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="35" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
          </svg>
        </div>

        <div className="absolute bottom-8 left-8 w-24 h-24 opacity-20 floral-breathe" style={{ animationDelay: "2s" }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/30"
            />
            <circle cx="35" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="35" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
          </svg>
        </div>

        <div className="absolute bottom-8 right-8 w-24 h-24 opacity-20 floral-breathe" style={{ animationDelay: "3s" }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/30"
            />
            <circle cx="35" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="35" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="35" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
            <circle cx="65" cy="65" r="4" fill="currentColor" className="text-secondary/60" />
          </svg>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 opacity-15 float-gentle shimmer-glow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent/40"
            />
            <circle cx="50" cy="35" r="3" fill="currentColor" className="text-accent/60" />
          </svg>
        </div>

        <div
          className="absolute top-1/3 right-1/4 w-12 h-12 opacity-15 float-gentle shimmer-glow"
          style={{ animationDelay: "2s" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/40"
            />
            <circle cx="50" cy="38" r="2" fill="currentColor" className="text-primary/60" />
          </svg>
        </div>

        {/* Elegant ribbon decorations */}
        <div className="absolute top-1/2 left-8 w-32 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent ribbon-wave"></div>
        <div
          className="absolute top-1/2 right-8 w-32 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent ribbon-wave"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Floating hearts */}
        <div className="absolute top-1/5 right-1/3 w-6 h-6 opacity-30 heart-pulse">
          <svg viewBox="0 0 24 24" className="w-full h-full text-accent/60">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 opacity-25 heart-pulse" style={{ animationDelay: "1s" }}>
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary/50">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Delicate vine patterns */}
        <div className="absolute top-1/6 left-1/2 transform -translate-x-1/2 w-48 h-8 opacity-15">
          <svg viewBox="0 0 192 32" className="w-full h-full">
            <path
              d="M0 16 Q48 8 96 16 T192 16"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-primary/30"
            />
            <circle cx="48" cy="12" r="2" fill="currentColor" className="text-accent/40" />
            <circle cx="96" cy="16" r="2" fill="currentColor" className="text-secondary/40" />
            <circle cx="144" cy="12" r="2" fill="currentColor" className="text-accent/40" />
          </svg>
        </div>

        <div className="absolute bottom-1/6 left-1/2 transform -translate-x-1/2 w-48 h-8 opacity-15">
          <svg viewBox="0 0 192 32" className="w-full h-full">
            <path
              d="M0 16 Q48 24 96 16 T192 16"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-primary/30"
            />
            <circle cx="48" cy="20" r="2" fill="currentColor" className="text-accent/40" />
            <circle cx="96" cy="16" r="2" fill="currentColor" className="text-secondary/40" />
            <circle cx="144" cy="20" r="2" fill="currentColor" className="text-accent/40" />
          </svg>
        </div>

        {/* Golden accent lines */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-64 h-px golden-shimmer"></div>
        <div
          className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-64 h-px golden-shimmer"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Elegant dove animations */}
      {showDoves && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute dove-graceful" style={{ top: "20%", animationDelay: "0s" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary/40 drop-shadow-sm">
              <path
                d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.5 11 7L8 10C7 9.5 6 9.5 5 10C4 10.5 3.5 11.5 4 12.5C4.5 13.5 5.5 14 6.5 13.5L9.5 11.5L12 14L14.5 11.5L17.5 13.5C18.5 14 19.5 13.5 20 12.5C20.5 11.5 20 10.5 19 10C18 9.5 17 9.5 16 10L13 7C14 6.5 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="absolute dove-graceful" style={{ top: "60%", animationDelay: "4s" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-secondary/50 drop-shadow-sm">
              <path
                d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.5 11 7L8 10C7 9.5 6 9.5 5 10C4 10.5 3.5 11.5 4 12.5C4.5 13.5 5.5 14 6.5 13.5L9.5 11.5L12 14L14.5 11.5L17.5 13.5C18.5 14 19.5 13.5 20 12.5C20.5 11.5 20 10.5 19 10C18 9.5 17 9.5 16 10L13 7C14 6.5 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Elegant sparkle effects */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full sparkle-elegant"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Music Control */}
      <Button
        onClick={toggleMusic}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-2 sm:p-3 shadow-lg backdrop-blur-sm"
        size="sm"
      >
        {isPlaying ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Music className="w-3 h-3 sm:w-4 sm:h-4" />}
      </Button>

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Icon completely outside the invitation */}
        <div className="absolute -top-60 sm:-top-80 left-1/2 transform -translate-x-1/2 z-30">
          <img 
            src="/icon1.png" 
            alt="Wedding Icon" 
            className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] object-contain drop-shadow-2xl"
          />
        </div>

   {/* Envelope Design - Closed State */}
   {!isOpened && (
     <div className="relative w-[280px] sm:w-[320px] h-[200px] sm:h-[220px] mx-auto mb-6">

            
            {/* Envelope Body - Clickable */}
            <div 
              onClick={handleOpenInvitation}
              className="absolute inset-0 bg-card rounded-lg shadow-2xl border border-border cursor-pointer hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Envelope Flap */}
              <div className="absolute top-0 left-0 right-0 h-[100px] sm:h-[110px] bg-muted rounded-t-lg border border-b-0 border-border">
                {/* Elegant monogram */}
                <div className="absolute top-3 sm:top-4 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-2xl sm:text-3xl font-display text-primary mb-1 sm:mb-2">
                    A <span className="text-lg sm:text-xl">&</span> V
                  </div>

                  {/* Date */}
                  <div className="text-xs font-elegant text-muted-foreground mb-2 sm:mb-3 tracking-wider">07 • 10 • 2025</div>

                  {/* Simple floral accent */}
                  <div className="relative w-12 sm:w-16 h-4 sm:h-6 mx-auto">
                    <svg viewBox="0 0 64 24" className="w-full h-full">
                      <circle
                        cx="32"
                        cy="12"
                        r="3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/40"
                      />
                      <circle cx="20" cy="12" r="1.5" fill="currentColor" className="text-secondary/60" />
                      <circle cx="44" cy="12" r="1.5" fill="currentColor" className="text-secondary/60" />
                      <line
                        x1="12"
                        y1="12"
                        x2="52"
                        y2="12"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/30"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main Body */}
              <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-sm sm:text-base font-elegant text-foreground mb-2 sm:mb-3 tracking-wide">TRÂN TRỌNG KÍNH MỜI</div>
                <div className="w-40 sm:w-48 h-px bg-border"></div>
                {/* Click hint */}
                <div className="text-xs text-muted-foreground mt-2 opacity-70">👆 Nhấn để mở thiệp</div>
              </div>
            </div>
          </div>
        )}

        {/* Elegant Card - Opened State */}
        {isOpened && (
          <div 
            className={`invitation-card relative w-full mb-6 ${isOpened ? "card-revealing" : ""}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
          >
            <div className="mx-auto w-full max-w-2xl bg-card rounded-2xl shadow-2xl p-4 sm:p-8 border border-border/50 relative overflow-hidden">
              {/* Elegant Close Button */}
              <Button
                onClick={handleCloseInvitation}
                className="absolute top-3 right-3 z-50 bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground rounded-full p-1.5 sm:p-2 shadow-lg backdrop-blur-sm border border-border/50 transition-all duration-200 hover:scale-110"
                size="sm"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              {/* Decorative border */}
              <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

              {/* Elegant corner decorations */}
              <div className="absolute top-6 left-6 w-8 h-8 opacity-30">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path
                    d="M16 4 L28 16 L16 28 L4 16 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-primary/40"
                  />
                  <circle cx="16" cy="16" r="3" fill="currentColor" className="text-accent/50" />
                </svg>
              </div>

              <div className="absolute top-6 right-6 w-8 h-8 opacity-30">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path
                    d="M16 4 L28 16 L16 28 L4 16 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-primary/40"
                  />
                  <circle cx="16" cy="16" r="3" fill="currentColor" className="text-accent/50" />
                </svg>
              </div>

              <div className="absolute bottom-6 left-6 w-8 h-8 opacity-30">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path
                    d="M16 4 L28 16 L16 28 L4 16 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-primary/40"
                  />
                  <circle cx="16" cy="16" r="3" fill="currentColor" className="text-accent/50" />
                </svg>
              </div>

              <div className="absolute bottom-6 right-6 w-8 h-8 opacity-30">
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <path
                    d="M16 4 L28 16 L16 28 L4 16 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-primary/40"
                  />
                  <circle cx="16" cy="16" r="3" fill="currentColor" className="text-accent/50" />
                </svg>
              </div>


              {/* Main content */}
              <div className="w-full max-w-lg mx-auto text-center py-4 sm:py-6 relative z-10">
                <div className="mb-3 sm:mb-4 text-muted-foreground tracking-widest text-xs font-elegant uppercase">
                   Lễ dạm ngõ & ăn hỏi
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-2 sm:mb-3 tracking-tight relative">
                  Moanh <span className="text-2xl sm:text-3xl">&</span> Vuz
                  {/* Decorative flourish under the names */}
                  <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 h-3 sm:h-4">
                    <svg viewBox="0 0 96 16" className="w-full h-full">
                      <path
                        d="M8 8 Q24 4 48 8 T88 8"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        className="text-primary/40"
                      />
                      <circle cx="24" cy="6" r="1" fill="currentColor" className="text-accent/60" />
                      <circle cx="48" cy="8" r="1.5" fill="currentColor" className="text-primary/60" />
                      <circle cx="72" cy="6" r="1" fill="currentColor" className="text-accent/60" />
                    </svg>
                  </div>
                </h1>

                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-primary mt-4 sm:mt-6">
                  <div className="w-8 sm:w-10 h-px bg-primary/30" />
                  <Heart className="w-3 sm:w-4 h-3 sm:h-4 heart-pulse" />
                  <div className="w-8 sm:w-10 h-px bg-primary/30" />
                </div>

                <div className="space-y-3 sm:space-y-4 text-foreground">
                  <div className="bg-muted/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                    <div className="font-elegant text-xs text-muted-foreground mb-1 tracking-wide">THỜI GIAN</div>
                    <div className="font-display text-base sm:text-lg">8:00 • Thứ 3, 07 tháng 10, 2025</div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                    <div className="font-elegant text-xs text-muted-foreground mb-1 tracking-wide">ĐỊA ĐIỂM</div>
                    <div className="font-display text-base sm:text-lg">93 Nguyễn Đổng Chi</div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8">
                  {/* Close hint */}
                  <div className="text-xs text-muted-foreground opacity-60 text-center">
                    💡 Nhấn nút X hoặc vuốt lên để đóng thiệp 
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
