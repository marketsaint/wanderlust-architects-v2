export function applyPointerGlow(event: React.MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty('--mx', `${x}%`);
  event.currentTarget.style.setProperty('--my', `${y}%`);
}

export function resetPointerGlow(event: React.MouseEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--mx', '50%');
  event.currentTarget.style.setProperty('--my', '50%');
}
