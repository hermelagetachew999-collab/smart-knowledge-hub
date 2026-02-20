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
      type: "link",
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

// ------------------
// WIKIPEDIA SEARCH
// ------------------
export const fetchWikipedia = async (query) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query
  )}&format=json&origin=*`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.query || !data.query.search) return [];

    return data.query.search.map((item) => ({
      type: "wikipedia",
      title: item.title,
      link: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png",
      channel: "Wikipedia",
      snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // strip html tags
    }));
  } catch (err) {
    console.error("Wikipedia API error:", err);
    return [];
  }
};

// ------------------
// ARXIV SEARCH
// ------------------
export const fetcharXiv = async (query) => {
  const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(
    query
  )}&start=0&max_results=10`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const entries = xmlDoc.getElementsByTagName("entry");

    const results = [];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const title = entry.getElementsByTagName("title")[0]?.textContent;
      const id = entry.getElementsByTagName("id")[0]?.textContent;
      const summary = entry.getElementsByTagName("summary")[0]?.textContent;
      const authors = Array.from(entry.getElementsByTagName("author")).map(a => a.getElementsByTagName("name")[0]?.textContent).join(", ");

      results.push({
        type: "arxiv",
        title: title?.trim(),
        link: id,
        thumbnail: "https://static.arxiv.org/static/browse/0.3.4/images/icons/favicon.ico",
        channel: authors,
        snippet: summary?.trim().substring(0, 200) + "..."
      });
    }
    return results;
  } catch (err) {
    console.error("arXiv API error:", err);
    return [];
  }
};
