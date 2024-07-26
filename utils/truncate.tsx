export function truncateDescription(subtitle: string, maxLength = 20) {
  if (!subtitle) return '';
  return subtitle.length > maxLength ? `${subtitle.substring(0, maxLength)}...` : subtitle;
}
