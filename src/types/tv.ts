export type ChannelCategory = "Commercials" | "Mahabharat" | "Ramayan" | "Cricket" | "Compilation";

export interface Channel {
  id: string;
  channelNumber: number;
  title: string;
  brand: string;
  year?: string;
  youtubeId?: string;
  youtubeIds?: string[];
  playlistId?: string;
  description?: string;
  category: ChannelCategory;
}

export type ScanlineIntensity = "off" | "light" | "heavy";

export interface OSDState {
  visible: boolean;
  text: string;
  subtext?: string;
  type?: "channel" | "volume" | "mute" | "power" | "info";
}

export interface TVState {
  isPoweredOn: boolean;
  currentChannelIndex: number;
  volume: number; // 0 to 100
  isMuted: boolean;
  isChangingChannel: boolean;
  scanlineIntensity: ScanlineIntensity;
  isCurvatureEnabled: boolean;
  isAutoAdvancing: boolean;
  osdState: OSDState;
  hasUserInteracted: boolean;
  channelVideoOffsets: Record<string, number>;
  isZoomedIn: boolean;
}

export interface TVContextType extends TVState {
  togglePower: () => void;
  nextChannel: () => void;
  previousChannel: () => void;
  setChannelByIndex: (index: number) => void;
  setChannelByNumber: (channelNum: number) => void;
  shuffleChannelVideo: () => void;
  toggleZoom: () => void;
  setVolume: (vol: number) => void;
  volumeUp: () => void;
  volumeDown: () => void;
  toggleMute: () => void;
  setScanlineIntensity: (intensity: ScanlineIntensity) => void;
  cycleScanlineIntensity: () => void;
  toggleCurvature: () => void;
  showOSD: (text: string, subtext?: string, type?: OSDState["type"]) => void;
  setUserInteracted: () => void;
  currentChannel: Channel;
  totalChannels: number;
  getActiveVideoId: (channel: Channel) => string | undefined;
  getDailyEpisodeIndex: (channel: Channel) => number;
}


