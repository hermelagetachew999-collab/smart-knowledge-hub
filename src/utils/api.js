// src/utils/api.js

// --- ENV KEYS ---
const YT_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CSE_ID = process.env.REACT_APP_GOOGLE_CSE_ID;

// ------------------
// YOUTUBE SEARCH
// ------------------
export const fetchYouTube = async (query) => {
  if (!YT_KEY) {
    console.log("Missing YouTube API key");
    return [];
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
    query
  )}&key=${YT_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) return [];

    return data.items.map((item) => ({
      type: "youtube",
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.default?.url,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (err) {
    console.error("YouTube API error:", err);
    return [];
  }
};

// ------------------
// GOOGLE SEARCH
// ------------------
export const fetchLinksAndPdfs = async (query) => {
  if (!GOOGLE_KEY || !CSE_ID) {
    console.log("Missing GOOGLE_KEY or CSE_ID");
    return [];
  }

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    query
  )}&key=${GOOGLE_KEY}&cx=${CSE_ID}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) return [];

    return data.items.map((item) => ({
      type: "link", // or "pdf" if you want to detect PDFs
      title: item.title,
      link: item.link,
      thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src || null,
      channel: null,
    }));
  } catch (err) {
    console.error("Google Search API error:", err);
    return [];
  }
};
