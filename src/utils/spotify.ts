import { toast } from "sonner";
import { Playlist } from "@/components/PlaylistCard";

// Hardcoded playlist IDs for each mood
// In a real app, these would come from the Spotify API 
// based on relevant search terms
const MOOD_PLAYLISTS: Record<string, { spotify: string[], youtube: string[] }> = {
  happy: {
    spotify: [
      "37i9dQZF1DXdPec7aLTmlC", // Happy Hits
      "37i9dQZF1DX9XIFQuFvzM4", // Feelin' Good
      "37i9dQZF1DX3rxVfibe1L0", // Mood Booster
    ],
    youtube: [
      "PL9tY0BWXOZFuFEG_GtOBZ8-8wbkH-NVAr", // Happy Hits
      "PL4fGSI1pDJn5rWibGCp3Cu9Soe9bhwbVW", // Happy Vibes
    ]
  },
  sad: {
    spotify: [
      "37i9dQZF1DX7qK8ma5wgG1", // Sad Hours
      "37i9dQZF1DX4sWSpwq3LiO", // Sad Beats
      "37i9dQZF1DX3YSRoSdA634", // Life Sucks
    ],
    youtube: [
      "PL5D7fjEEs6ka_zveOFuEeXk6dOiLcjpuZ", // Sad Songs
      "PLQog_FHUHAFUDDQPOTeAWSHwzFV1Zz5PX", // Melancholy Music
    ]
  },
  nostalgic: {
    spotify: [
      "37i9dQZF1DX4o1oenSJRJd", // All Out 80s
      "37i9dQZF1DXbTxeAdrVG2l", // All Out 90s
      "37i9dQZF1DX4UtSsGT1Sbe", // All Out 00s
    ],
    youtube: [
      "PLGBuKfnErZlAkaUUy57-mR97f8SBgMNHh", // Nostalgic Hits
      "PL7DA3D097D6FDBC02", // Old But Gold
    ]
  },
  energized: {
    spotify: [
      "37i9dQZF1DX0BcQWzuB7ZO", // Dance Party
      "37i9dQZF1DX76Wlfdnj7AP", // Beast Mode
      "37i9dQZF1DX32NsLKyzScr", // Power Hour
    ],
    youtube: [
      "PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10", // Workout Hits
      "PLyORnIW1xT6waC0PNjAMg_fL9ZfVTP5Jy", // Energy Boost
    ]
  },
  calm: {
    spotify: [
      "37i9dQZF1DWZqd5JICZI0u", // Peaceful Piano
      "37i9dQZF1DWYoYGBbGKach", // Calm Vibes
      "37i9dQZF1DX3Ogo9pFvBkY", // Ambient Chill
    ],
    youtube: [
      "PLMIbmfP_9vb8BCxRoraJpoo4q1yMFg4CE", // Relaxation Music
      "PLhM0dwF0bP3qTkWG9QbZdcQd_RW2xMsfC", // Peaceful Melodies
    ]
  },
  focused: {
    spotify: [
      "37i9dQZF1DWZeKCadgRdKQ", // Deep Focus
      "37i9dQZF1DX8NTLI2TtZa6", // Focus Flow
      "37i9dQZF1DX9sIqqvKsjG8", // Coding Mode
    ],
    youtube: [
      "PLci1IcmDP8clClSRopvKMWGjCi_CFvDg4", // Study Music
      "PL6NdkXsPL07KiewBDpJC1dFvxEubnNOp1", // Focus Sounds
    ]
  },
  romantic: {
    spotify: [
      "37i9dQZF1DX50QitC6Oqtn", // Love Songs
      "37i9dQZF1DWVqfgj8NZEp1", // Date Night
      "37i9dQZF1DX5IDTimEWoTd", // Romantic Ballads
    ],
    youtube: [
      "PLhZRfuBIYMihF40Tgac4jTU1P9f2uCOCc", // Love Songs Collection
      "PLQog_FHUHAFUyeMptDfRHO9JvC_YP0HTq", // Romantic Playlist
    ]
  },
  relaxed: {
    spotify: [
      "37i9dQZF1DX8Uebhn9wzrS", // Chill Tracks
      "37i9dQZF1DX4WYpdgoIcn6", // Chill Hits
      "37i9dQZF1DXcCnTAt8CfNe", // Relaxing Jazz
    ],
    youtube: [
      "PL6fP6X1dwBs3TFnKNryJoTiSuEbFjYBXW", // Relaxing Music
      "PLQkQfzsIUwRZ_66UD9BEbCuP5oKUvXNKp", // Relaxing Sounds
    ]
  },
  groovy: {
    spotify: [
      "37i9dQZF1DX8a1tdzq5tbM", // Dance Classics
      "37i9dQZF1DWUwJ0RFwrgQP", // Funk & Disco
      "37i9dQZF1DX1MUPbVKMgJE", // Groove Theory
    ],
    youtube: [
      "PL_Qj3gHpLtBRTjQF2L5f6UxZmXrUOBEhk", // Funk & Groove
      "PL9qmexT8H6JU0Ye-wPo2NHr2RdcETK7Wn", // Disco Classics
    ]
  },
  melancholic: {
    spotify: [
      "37i9dQZF1DX0pJuHwL7dxj", // Rainy Day
      "37i9dQZF1DWSiZVO2J6WeI", // Melancholy Instrumentals
      "37i9dQZF1DX7gIoKXt0gmx", // Dreamy Vibes
    ],
    youtube: [
      "PLHwn8cKbXi2ksWVQi2VtWGj7gN-yFPhZv", // Melancholic Music
      "PLnYPm_BVLlNa2MLkhw9L-gGTsGnhAjhkB", // Rainy Day Music
    ]
  },
  intense: {
    spotify: [
      "37i9dQZF1DWWJOmJ7nRx0C", // Heavy Queens
      "37i9dQZF1DX05r4Oy3Ln97", // Rock Classics
      "37i9dQZF1DWXIcbzpLauPS", // Metal Essentials
    ],
    youtube: [
      "PL6Lt9p1lIRZ31aK8i6G4KDLxeT9betDcA", // Rock Anthems
      "PLhQCJTkrHOwSX8LUnIMgaTq3chP1tiTut", // Heavy Metal Playlist
    ]
  },
  creative: {
    spotify: [
      "37i9dQZF1DX56qfiUZBncF", // Creativity Boost
      "37i9dQZF1DX9OZisIoJQhG", // Instrumental Madness
      "37i9dQZF1DXdwTUxmGKrdN", // Peaceful Meditation
    ],
    youtube: [
      "PLsH9HfoJ67QzTXCgQ4-05CBd46DgjCY0r", // Creative Music
      "PLVT9Yp_BFyp2MJ6Xz_PSo_0nSnJAOVbqJ", // Creative Flow
    ]
  },
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
      source: "spotify",
      language: "english",
      yearRange: [2010, 2024]
    },
    {
      id: "37i9dQZF1DX9XIFQuFvzM4",
      name: "Feelin' Good",
      description: "Feel good with this positively timeless playlist!",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000035af1070c80cd50dbbb4cfa19" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX9XIFQuFvzM4" },
      source: "spotify",
      language: "english",
      yearRange: [1990, 2015]
    },
    {
      id: "37i9dQZF1DX3rxVfibe1L0",
      name: "Mood Booster",
      description: "Get happy with today's dose of feel-good songs!",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0" },
      source: "spotify",
      language: "english",
      yearRange: [2015, 2024]
    },
    {
      id: "youtube-happy-1",
      name: "Happy Hits YouTube Mix",
      description: "The most uplifting tracks to brighten your day!",
      images: [{ url: "https://i.ytimg.com/vi/ZbZSe6N_BXs/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PL9tY0BWXOZFuFEG_GtOBZ8-8wbkH-NVAr",
      language: "mixed",
      yearRange: [2005, 2024]
    },
    {
      id: "youtube-happy-2",
      name: "Happy Vibes Playlist",
      description: "Music to boost your mood instantly",
      images: [{ url: "https://i.ytimg.com/vi/q0hyYWKXF0Q/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PL4fGSI1pDJn5rWibGCp3Cu9Soe9bhwbVW",
      language: "english",
      yearRange: [2010, 2023]
    }
  ],
  sad: [
    {
      id: "37i9dQZF1DX7qK8ma5wgG1",
      name: "Sad Hours",
      description: "Ballads and sad songs to help you through those blue moments.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003e6d3b777a51caad5542a7742" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DX4sWSpwq3LiO",
      name: "Sad Beats",
      description: "Electronic sad songs.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000037d263b9eab67c1fa2351996a" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DX3YSRoSdA634",
      name: "Life Sucks",
      description: "Having a bad day? We know how it feels.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000034075491de06a3c2f5b7b6a6a" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-sad-1",
      name: "Sad Songs Collection",
      description: "Music for when you need to feel your emotions",
      images: [{ url: "https://i.ytimg.com/vi/hdw1uKiTI5c/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PLw-VjHDlEOgs2BGzBnWIYa6NRr-0C9ZxO",
      language: "english",
      yearRange: [1990, 2022]
    }
  ],
  nostalgic: [
    {
      id: "37i9dQZF1DX4o1oenSJRJd",
      name: "All Out 80s",
      description: "The biggest songs of the 1980s.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000034e1a196e6d94a764e634d848" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX4o1oenSJRJd" },
      source: "spotify",
      language: "english",
      yearRange: [1980, 1989]
    },
    {
      id: "37i9dQZF1DXbTxeAdrVG2l",
      name: "All Out 90s",
      description: "The biggest songs of the 1990s.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000031f8201dc1e0ce1686da7cfae" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DXbTxeAdrVG2l" },
      source: "spotify",
      language: "english",
      yearRange: [1990, 1999]
    },
    {
      id: "37i9dQZF1DX4UtSsGT1Sbe",
      name: "All Out 00s",
      description: "The biggest songs of the 2000s.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003ba40e05fe8d026ce707ae85e" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX4UtSsGT1Sbe" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2009]
    },
    {
      id: "youtube-nostalgic-1",
      name: "Nostalgic Hits Compilation",
      description: "Take a trip down memory lane",
      images: [{ url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PLGBuKfnErZlAkaUUy57-mR97f8SBgMNHh", 
      language: "english",
      yearRange: [1975, 2000]
    }
  ],
  energized: [
    {
      id: "37i9dQZF1DX0BcQWzuB7ZO",
      name: "Dance Party",
      description: "These songs know how to get the party started.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003024973a58c516bcf4a690481" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DX76Wlfdnj7AP",
      name: "Beast Mode",
      description: "Get your beast mode on!",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000032f6d1a324113d2cdf7a0eeb4" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DX32NsLKyzScr",
      name: "Power Hour",
      description: "A full hour of high-energy songs to help boost your motivation.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003cc1d24ee1a128a251eddb8d0" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-energized-1",
      name: "Workout Hits Playlist",
      description: "Get your heart pumping with these high-energy songs!",
      images: [{ url: "https://i.ytimg.com/vi/4kQw9Qw9Qw9/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PL4o29bINVT4EG_y-k5jGoOu3-Am8Nvi10",
      language: "english",
      yearRange: [2000, 2024]
    }
  ],
  calm: [
    {
      id: "37i9dQZF1DWZqd5JICZI0u",
      name: "Peaceful Piano",
      description: "Peaceful piano to help you slow down, breathe, and relax.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DWYoYGBbGKach",
      name: "Calm Vibes",
      description: "Calming instrumental music to help you feel connected and relaxed.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003a59f8930fa2da3ea6f60eab0" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWYoYGBbGKach" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DX3Ogo9pFvBkY",
      name: "Ambient Chill",
      description: "Gentle ambient tracks to help you focus and relax.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003bb0ecdf6e4aafb0fc9d81f13" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-calm-1",
      name: "Relaxation Music Playlist",
      description: "Find your inner peace with these calming tracks.",
      images: [{ url: "https://i.ytimg.com/vi/1234567890/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PLMIbmfP_9vb8BCxRoraJpoo4q1yMFg4CE",
      language: "english",
      yearRange: [2000, 2024]
    }
  ],
  focused: [
    {
      id: "37i9dQZF1DWZeKCadgRdKQ",
      name: "Deep Focus",
      description: "Keep calm and focus with ambient and post-rock music.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000030e2c570b28d9d070b6078b2f" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DX8NTLI2TtZa6",
      name: "Focus Flow",
      description: "Uptempo instrumental hip hop beats.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003724554b6678e87c403a96371" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "37i9dQZF1DX9sIqqvKsjG8",
      name: "Coding Mode",
      description: "Dedicated to all the programmers out there.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003863b311d4b787ed621f7e32f" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX9sIqqvKsjG8" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-focused-1",
      name: "Study Music Playlist",
      description: "Focus with soft study music in the background.",
      images: [{ url: "https://i.ytimg.com/vi/9876543210/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PL6NdkXsPL07KiewBDpJC1dFvxEubnNOp1",
      language: "english",
      yearRange: [2000, 2024]
    }
  ],
  romantic: [
    {
      id: "37i9dQZF1DX50QitC6Oqtn",
      name: "Love Songs",
      description: "Romantic tracks for you and your loved one.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003f52b9d5f914e83d8ae98e2e3" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn" },
      source: "spotify",
      language: "english",
      yearRange: [1980, 2024]
    },
    {
      id: "37i9dQZF1DWVqfgj8NZEp1",
      name: "Date Night",
      description: "The perfect date night soundtrack.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003f7cb20f8cc40bc40ca5977b2" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWVqfgj8NZEp1" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-romantic-1",
      name: "Love Songs Collection",
      description: "Beautiful love songs to set the mood",
      images: [{ url: "https://i.ytimg.com/vi/rtOvBOTyX00/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PLhZRfuBIYMihF40Tgac4jTU1P9f2uCOCc",
      language: "english",
      yearRange: [1970, 2022]
    }
  ],
  relaxed: [
    {
      id: "37i9dQZF1DX8Uebhn9wzrS",
      name: "Chill Tracks",
      description: "Unwind to these simple, mellow tunes.",
      images: [{ url: "https://i.scdn.co/image/ab67706f000000034d26d431869cabfc53c67d8e" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-relaxed-1",
      name: "Relaxing Music",
      description: "Peaceful tunes to help you unwind",
      images: [{ url: "https://i.ytimg.com/vi/77ZozI0rw7w/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PL6fP6X1dwBs3TFnKNryJoTiSuEbFjYBXW",
      language: "instrumental",
      yearRange: [2000, 2024]
    }
  ],
  groovy: [
    {
      id: "37i9dQZF1DX8a1tdzq5tbM",
      name: "Dance Classics",
      description: "Classic dance tracks that defined an era.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX8a1tdzq5tbM" },
      source: "spotify",
      language: "english",
      yearRange: [1970, 2000]
    },
    {
      id: "youtube-groovy-1",
      name: "Funk & Groove Playlist",
      description: "Get your groove on with these funky beats",
      images: [{ url: "https://i.ytimg.com/vi/qchPLaiKocI/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PL_Qj3gHpLtBRTjQF2L5f6UxZmXrUOBEhk",
      language: "english",
      yearRange: [1970, 1990]
    }
  ],
  melancholic: [
    {
      id: "37i9dQZF1DX0pJuHwL7dxj",
      name: "Rainy Day",
      description: "Melancholic tunes for a rainy day.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003a12a16dce55927c928bc51c9" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX0pJuHwL7dxj" },
      source: "spotify",
      language: "english",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-melancholic-1",
      name: "Melancholic Music",
      description: "Beautifully sad songs for reflective moments",
      images: [{ url: "https://i.ytimg.com/vi/iCZ-5wcEAjM/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PLHwn8cKbXi2ksWVQi2VtWGj7gN-yFPhZv",
      language: "mixed",
      yearRange: [1990, 2022]
    }
  ],
  intense: [
    {
      id: "37i9dQZF1DWWJOmJ7nRx0C",
      name: "Heavy Queens",
      description: "The queens of metal and hard rock.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003b6e502c185bc9d7f7084ac22" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DWWJOmJ7nRx0C" },
      source: "spotify",
      language: "english",
      yearRange: [1980, 2024]
    },
    {
      id: "youtube-intense-1",
      name: "Rock Anthems",
      description: "Epic rock tracks that will get your energy up",
      images: [{ url: "https://i.ytimg.com/vi/qGaOlfmX8rQ/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PL6Lt9p1lIRZ31aK8i6G4KDLxeT9betDcA",
      language: "english",
      yearRange: [1970, 2010]
    }
  ],
  creative: [
    {
      id: "37i9dQZF1DX56qfiUZBncF",
      name: "Creativity Boost",
      description: "Music to boost your creative energy.",
      images: [{ url: "https://i.scdn.co/image/ab67706f00000003ca5a7517156021292e5663a6" }],
      external_urls: { spotify: "https://open.spotify.com/playlist/37i9dQZF1DX56qfiUZBncF" },
      source: "spotify",
      language: "instrumental",
      yearRange: [2000, 2024]
    },
    {
      id: "youtube-creative-1",
      name: "Creative Music Flow",
      description: "Enhance your creativity with these inspiring tracks",
      images: [{ url: "https://i.ytimg.com/vi/khOffh_6oCs/maxresdefault.jpg" }],
      external_urls: { spotify: "#" },
      source: "youtube",
      youtubeId: "PLVT9Yp_BFyp2MJ6Xz_PSo_0nSnJAOVbqJ",
      language: "instrumental",
      yearRange: [2010, 2024]
    }
  ]
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
