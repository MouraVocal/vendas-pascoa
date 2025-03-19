export const getCacheBustedImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return imageUrl;

  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}v=${Date.now()}`;
};
