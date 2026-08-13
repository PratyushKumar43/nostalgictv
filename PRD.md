# Product Requirement Document (PRD): Retro TV Nostalgia (Next.js & Tailwind CSS)

## 1. Executive Summary & Overview
**Retro TV Nostalgia** is an interactive, immersive web experience inspired by the aesthetic layout of [saloon.wtf](https://saloon.wtf), reimagined as a 90s nostalgic television watching environment. 

The application places the user inside a warm, vintage living room matching the visually rich reference scene (`ChatGPT Image Aug 12, 2026, 08_47_45 PM.png`): a wooden panelled room with children sitting on the floor watching a classic wooden-cabinet CRT television. The TV cabinet screen area acts as an embedded broadcast display, streaming nostalgic Indian television advertisements from a curated YouTube playlist: [`https://www.youtube.com/playlist?list=PLycor1XF7S9HVMnWxndl27HgZJM5S8wRT`](https://www.youtube.com/playlist?list=PLycor1XF7S9HVMnWxndl27HgZJM5S8wRT).

The experience is driven by an interactive **2D Retro Remote Control** and integrated physical cabinet controls, allowing users to flip channels, adjust volume, power the CRT on/off, and toggle vintage screen shaders (scanlines, screen curvature, flicker, and static bursts).

---

## 2. Target Audience & Core Value Proposition
- **Target Audience:** 80s/90s/2000s kids, nostalgia lovers, retro web design enthusiasts, and fans of classic television commercials.
- **Core Value Proposition:** Deliver an authentic "channel surfing" experience that recaptures the exact feeling of sitting on the floor with family on a weekend afternoon, flipping channels on a wooden CRT box.

---

## 3. Technology Stack & Framework Choices

### 3.1 Core Architecture
- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS + Custom CSS Variables for CRT Shaders & Scanlines
- **State Management:** React Context API / Zustand for centralized TV state
- **Video Engine:** YouTube IFrame Player API (`react-youtube` or custom postMessage wrapper)
- **Icons & Graphics:** Lucide React (`lucide-react`)
- **Typography:** Google Fonts via `next/font` (`Share Tech Mono`, `VT323`, `Press Start 2P`, `Inter`)
- **Animations:** Framer Motion & Tailwind UI transitions

---

## 4. Visual & Aesthetic Design System

### 4.1 Background Room Scene (Living Room Frame)
- **Reference Artwork:** Clean reproduction of `ChatGPT Image Aug 12, 2026, 08_47_45 PM.png` featuring the dimly lit wooden room and five children seated on the floor.
- **Screen Cutout / Alignment:** Precision-aligned 4:3 CRT TV screen container positioned inside the wooden cabinet frame.
- **Dynamic Ambient Glow:** Screen color data casts dynamic glow shadows onto the surrounding cabinet and children in real-time, matching the video luminance.

### 4.2 CRT Display & Retro Shaders
- **Scanlines:** CSS `repeating-linear-gradient` with subtle opacity and overlay blending mode.
- **Curved Glass Bezel:** Subtle SVG barrel distortion & CSS radial gradients simulating 90s curved glass CRT monitors.
- **Static Burst & Channel Switching:** 250ms visual noise/static burst during channel changes with retro audio click effect.
- **Phosphor Burn-In & Glow:** CRT bloom box-shadows and faint chromatic aberration.
- **Power On/Off Animation:** Classic CRT collapse (screen contracts horizontally to a bright line, then a single glowing dot, and fades out).

### 4.3 Color Palette & Retro Tokens
- **Ambient Room:** Deep Amber (`#1a0f0a`), Muted Mahogany (`#2b1810`), Warm Gold (`#d4af37`).
- **CRT Phosphor OSD:** Classic Green (`#33ff33`), Electric Cyan (`#00f0ff`), Retro Yellow (`#ffcc00`).
- **Remote Body:** Slate Matte Dark Grey (`#1e293b`), Rubber Red (`#ef4444`), Vintage White (`#f8fafc`).

---

## 5. Feature Specifications

### 5.1 YouTube Playlist Engine
- **Playlist Source:** [`https://www.youtube.com/playlist?list=PLycor1XF7S9HVMnWxndl27HgZJM5S8wRT`](https://www.youtube.com/playlist?list=PLycor1XF7S9HVMnWxndl27HgZJM5S8wRT)
- **Channel Mapping:** Each video in the playlist is assigned a dedicated Channel Number (e.g., `CH 01`, `CH 02`, `CH 03`...).
- **Seamless Loop:** Channel Up beyond the last video wraps around to Channel 01; Channel Down below Channel 01 jumps to the last channel.
- **Autoplay & Audio Unmute:** Automatic muted playback on load, with an interactive on-screen prompt ("Click remote to turn on sound") to comply with modern browser policies.

### 5.2 Interactive 2D Remote Control Widget
A floating, draggable, or toggleable 2D plastic TV remote rendered on screen with tactile physical feedback:
- **POWER Button:** Toggles TV CRT power state on/off with CRT shutdown animation.
- **CH + / CH - Buttons:** Increments/decrements the current channel.
- **VOL + / VOL - Buttons:** Controls master video volume (0-100%).
- **MUTE Button:** Toggles audio mute with retro OSD mute icon.
- **NUMBER PAD (0-9):** Allows direct channel entry (e.g., pressing `0` + `5` switches directly to Channel 5).
- **EFFECTS TOGGLE (CRT Mode):** Toggles scanline intensity (Light / Heavy / Off) and CRT glass curvature.
- **GUIDE / EPG Button:** Opens a retro TV Electronic Program Guide modal showing all available nostalgic ads in the channel lineup.

### 5.3 On-Screen Display (OSD) Overlay
- Green monospaced retro OSD text overlaid in the upper-right corner of the CRT screen.
- Appears for 2.5 seconds on channel change, volume change, or mute toggle.
- **Displays:**
  - Channel Number & Title (e.g. `CH 04 - MAGGI 90S AD`)
  - Volume Meter (`VOL ||||||||......`)
  - Mute Indicator (`[ MUTED ]`)
  - Power Indicator (`STANDBY` / `POWER ON`)

---

## 6. Next.js Component Architecture

```
src/
├── app/
│   ├── layout.tsx                # Fonts, Metadata, Root Layout
│   ├── page.tsx                  # Main TV Experience Page
│   └── globals.css               # CRT Shaders, Custom Utilities, Animations
├── components/
│   ├── tv/
│   │   ├── TVScene.tsx           # Main living room background & layout container
│   │   ├── TVCabinet.tsx         # Wooden cabinet frame & position anchor
│   │   ├── CRTScreen.tsx         # CRT container with 4:3 aspect ratio
│   │   ├── VideoPlayer.tsx       # YouTube IFrame API integration
│   │   ├── CRTShaderOverlay.tsx  # Scanlines, curvature, phosphor grid, vignette
│   │   ├── ChannelStatic.tsx     # Static noise effect during channel flips
│   │   ├── DynamicScreenGlow.tsx # Ambient room illumination based on video content
│   │   └── OSDOverlay.tsx        # Retro green On-Screen Display
│   ├── remote/
│   │   ├── RemoteControl.tsx     # Interactive 2D plastic remote control widget
│   │   ├── RemoteButton.tsx      # Reusable button with click feedback & sound
│   │   └── Numpad.tsx            # Channel direct-dial number pad
│   └── modals/
│       ├── ChannelGuideModal.tsx # Vintage TV Guide showing playlist items
│       └── SettingsModal.tsx     # CRT Shader and Audio toggle settings
├── context/
│   └── TVContext.tsx             # Global state (channel, power, volume, crt settings)
├── lib/
│   ├── playlistData.ts           # Parsed playlist channel metadata
│   ├── soundEffects.ts           # Audio click & static burst audio synth/samples
│   └── youtubeApi.ts             # YouTube Player API helper functions
└── types/
    └── tv.ts                     # TypeScript definitions for channel & state models
```

---

## 7. State Management Specification (`TVContext`)

```typescript
export interface TVState {
  isPoweredOn: boolean;
  currentChannelIndex: number;
  volume: number; // 0 to 100
  isMuted: boolean;
  isChangingChannel: boolean;
  scanlineIntensity: 'off' | 'light' | 'heavy';
  isCurvatureEnabled: boolean;
  osdState: {
    visible: boolean;
    text: string;
    subtext?: string;
  };
}
```

---

## 8. Verification & Quality Acceptance Criteria

1. **Next.js & Tailwind Build:** Clean compilation with TypeScript type safety, zero build warnings, and mobile-first responsive design.
2. **CRT Aesthetics:** Accurate visual feel matching retro CRT displays (scanlines, phosphor bloom, curvature, power down dot collapse effect).
3. **YouTube Integration:** Reliable playlist stream from `PLycor1XF7S9HVMnWxndl27HgZJM5S8wRT` inside the 4:3 screen area of the wooden TV cabinet.
4. **Remote Interactivity:** All remote controls (Power, Channel Up/Down, Volume, Numpad, Mute, CRT Toggles) trigger appropriate TV state & OSD responses.
5. **Channel Surfing Realism:** Static noise flash + audio click on channel change, mimicking true analogue TV behavior.