function extractVideoId(url: string | undefined): string | null {
    if (typeof url !== 'string') {
      console.error('Invalid URL provided:', url);
      return null;
    }
    
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
  }
  