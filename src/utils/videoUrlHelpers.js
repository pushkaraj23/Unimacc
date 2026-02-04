/**
 * Helpers for YouTube, Vimeo, and direct video URLs
 */

export function getVideoType(url) {
  if (!url || typeof url !== "string") return "direct";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  return "direct";
}

export function getYouTubeVideoId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
  return match ? match[1] : null;
}

export function getVimeoVideoId(url) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

export function getEmbedUrl(url) {
  const type = getVideoType(url);
  if (type === "youtube") {
    const id = getYouTubeVideoId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
  }
  if (type === "vimeo") {
    const id = getVimeoVideoId(url);
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : url;
  }
  return url; // direct video URL
}

export function getThumbnailUrl(url, customThumbnail = null) {
  if (customThumbnail) return customThumbnail;
  const type = getVideoType(url);
  if (type === "youtube") {
    const id = getYouTubeVideoId(url);
    // hqdefault is more reliable than maxresdefault (not all videos have it)
    return id
      ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      : "https://via.placeholder.com/640x360/263243/ffffff?text=Video";
  }
  if (type === "vimeo") {
    // Vimeo thumbnails require API - use placeholder
    return "https://via.placeholder.com/640x360/263243/ffffff?text=Video";
  }
  return "https://via.placeholder.com/640x360/263243/ffffff?text=Video";
}

export function isEmbeddable(url) {
  const type = getVideoType(url);
  return type === "youtube" || type === "vimeo";
}
