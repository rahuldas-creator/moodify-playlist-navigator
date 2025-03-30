
import { toast } from "@/components/ui/sonner";
import { Playlist } from "@/components/PlaylistCard";

// Hardcoded playlist IDs for each mood
// In a real app, these would come from the Spotify API 
// based on relevant search terms
const MOOD_PLAYLISTS: Record<string, string[]> = {
  happy: [
    "37i9dQZF1DXdPec7aLTmlC", // Happy Hits
    "37i9dQZF1DX9XIFQuFvzM4", // Feelin' Good
    "37i9dQZF1DX3rxVfibe1L0", // Mood Booster
    "37i9dQZF1DX2sUQwD7tbmL", // Feel-Good Indie Rock
  ],
  sad: [
    "37i9dQZF1DX7qK8ma5wgG1", // Sad Hours
    "37i9dQZF1DX4sWSpwq3LiO", // Sad Beats
    "37i9dQZF1DX3YSRoSdA634", // Life Sucks
    "37i9dQZF1DX6xZZEgC9Ubl", // Rainy Day
  ],
  nostalgic: [
    "37i9dQZF1DX4o1oenSJRJd", // All Out 80s
    "37i9dQZF1DXbTxeAdrVG2l", // All Out 90s
    "37i9dQZF1DX4UtSsGT1Sbe", // All Out 00s
    "37i9dQZF1DWXqpDKK4ed9O", // Time Capsule
  ],
  energized: [
    "37i9dQZF1DX0BcQWzuB7ZO", // Dance Party
    "37i9dQZF1DX76Wlfdnj7AP", // Beast Mode
    "37i9dQZF1DX32NsLKyzScr", // Power Hour
    "37i9dQZF1DX3ZeFHRhhi7Y", // Hype
  ],
  calm: [
    "37i9dQZF1DWZqd5JICZI0u", // Peaceful Piano
    "37i9dQZF1DWYoYGBbGKach", // Calm Vibes
    "37i9dQZF1DX3Ogo9pFvBkY", // Ambient Chill
    "37i9dQZF1DWTwnEm1IYyoj", // Soft Instrumentals
  ],
  focused: [
    "37i9dQZF1DWZeKCadgRdKQ", // Deep Focus
    "37i9dQZF1DX8NTLI2TtZa6", // Focus Flow
    "37i9dQZF1DX9sIqqvKsjG8", // Coding Mode
    "37i9dQZF1DWZIOAPKUdaKS", // Study Playlist
  ],
};

// Mock response data for playlists
// In a real app, this would come from the Spotify API
const mockPlaylists: Record<string, Playlist[]> = {
  happy: [
    {
      id: "37i9dQZF1DXdPec7aLTmlC",
      name: "Happy Hits!",
      description: "Hits to boost your mood and fill you with happiness!",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" },
    },
    {
      id: "37i9dQZF1DX9XIFQuFvzM4",
      name: "Feelin' Good",
      description: "Feel good with this positively timeless playlist!",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000035af1070c80cd50dbbb4cfa19" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX9XIFQuFvzM4" },
    },
    {
      id: "37i9dQZF1DX3rxVfibe1L0",
      name: "Mood Booster",
      description: "Get happy with today's dose of feel-good songs!",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0" },
    },
    {
      id: "37i9dQZF1DX2sUQwD7tbmL",
      name: "Feel-Good Indie Rock",
      description: "The best indie rock vibes - classic and current.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003b5d60a96bda8490c47c5a777" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX2sUQwD7tbmL" },
    },
  ],
  sad: [
    {
      id: "37i9dQZF1DX7qK8ma5wgG1",
      name: "Sad Hours",
      description: "Ballads and sad songs to help you through those blue moments.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003e6d3b777a51caad5542a7742" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1" },
    },
    {
      id: "37i9dQZF1DX4sWSpwq3LiO",
      name: "Sad Beats",
      description: "Electronic sad songs.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000037d263b9eab67c1fa2351996a" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
    },
    {
      id: "37i9dQZF1DX3YSRoSdA634",
      name: "Life Sucks",
      description: "Having a bad day? We know how it feels.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000034075491de06a3c2f5b7b6a6a" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634" },
    },
    {
      id: "37i9dQZF1DX6xZZEgC9Ubl",
      name: "Rainy Day",
      description: "Perfectly curated music for a rainy day.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003b347b31be885a4fddc8a8c67" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX6xZZEgC9Ubl" },
    },
  ],
  nostalgic: [
    {
      id: "37i9dQZF1DX4o1oenSJRJd",
      name: "All Out 80s",
      description: "The biggest songs of the 1980s.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000034e1a196e6d94a764e634d848" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX4o1oenSJRJd" },
    },
    {
      id: "37i9dQZF1DXbTxeAdrVG2l",
      name: "All Out 90s",
      description: "The biggest songs of the 1990s.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000031f8201dc1e0ce1686da7cfae" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DXbTxeAdrVG2l" },
    },
    {
      id: "37i9dQZF1DX4UtSsGT1Sbe",
      name: "All Out 00s",
      description: "The biggest songs of the 2000s.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003ba40e05fe8d026ce707ae85e" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX4UtSsGT1Sbe" },
    },
    {
      id: "37i9dQZF1DWXqpDKK4ed9O",
      name: "Time Capsule",
      description: "We made you a personalized playlist with songs to take you back in time.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000030a9758672c44e0e13e91bcf2" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWXqpDKK4ed9O" },
    },
  ],
  energized: [
    {
      id: "37i9dQZF1DX0BcQWzuB7ZO",
      name: "Dance Party",
      description: "These songs know how to get the party started.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003024973a58c516bcf4a690481" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO" },
    },
    {
      id: "37i9dQZF1DX76Wlfdnj7AP",
      name: "Beast Mode",
      description: "Get your beast mode on!",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000032f6d1a324113d2cdf7a0eeb4" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP" },
    },
    {
      id: "37i9dQZF1DX32NsLKyzScr",
      name: "Power Hour",
      description: "A full hour of high-energy songs to help boost your motivation.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003cc1d24ee1a128a251eddb8d0" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr" },
    },
    {
      id: "37i9dQZF1DX3ZeFHRhhi7Y",
      name: "Hype",
      description: "Get hyped!",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000035ba1836eaeb9cf6f3870a323" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX3ZeFHRhhi7Y" },
    },
  ],
  calm: [
    {
      id: "37i9dQZF1DWZqd5JICZI0u",
      name: "Peaceful Piano",
      description: "Peaceful piano to help you slow down, breathe, and relax.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u" },
    },
    {
      id: "37i9dQZF1DWYoYGBbGKach",
      name: "Calm Vibes",
      description: "Calming instrumental music to help you feel connected and relaxed.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003a59f8930fa2da3ea6f60eab0" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWYoYGBbGKach" },
    },
    {
      id: "37i9dQZF1DX3Ogo9pFvBkY",
      name: "Ambient Chill",
      description: "Gentle ambient tracks to help you focus and relax.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003bb0ecdf6e4aafb0fc9d81f13" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY" },
    },
    {
      id: "37i9dQZF1DWTwnEm1IYyoj",
      name: "Soft Instrumentals",
      description: "Calming instrumental tracks.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000038ad75ef7b93c36b6ce830bf4" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWTwnEm1IYyoj" },
    },
  ],
  focused: [
    {
      id: "37i9dQZF1DWZeKCadgRdKQ",
      name: "Deep Focus",
      description: "Keep calm and focus with ambient and post-rock music.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000030e2c570b28d9d070b6078b2f" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
    },
    {
      id: "37i9dQZF1DX8NTLI2TtZa6",
      name: "Focus Flow",
      description: "Uptempo instrumental hip hop beats.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003724554b6678e87c403a96371" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6" },
    },
    {
      id: "37i9dQZF1DX9sIqqvKsjG8",
      name: "Coding Mode",
      description: "Dedicated to all the programmers out there.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003863b311d4b787ed621f7e32f" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX9sIqqvKsjG8" },
    },
    {
      id: "37i9dQZF1DWZIOAPKUdaKS",
      name: "Study Playlist",
      description: "Focus with soft study music in the background.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000030ebc74d6d640ef09eabba84a" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWZIOAPKUdaKS" },
    },
  ],
};

// Function to fetch playlists based on mood
export const fetchPlaylistsByMood = async (mood: string): Promise<Playlist[]> => {
  // In a real application, we would fetch from the Spotify API here
  // For this demo, we'll use the mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const playlists = mockPlaylists[mood];
      if (playlists) {
        resolve(playlists);
      } else {
        toast.error("No playlists found for this mood");
        reject("No playlists found for this mood");
      }
    }, 1500); // Simulate API delay
  });
};
