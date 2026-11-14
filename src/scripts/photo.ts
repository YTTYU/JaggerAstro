const dialog = document.querySelector<HTMLDialogElement>('.photo-dialog')!;
document.querySelectorAll<HTMLAnchorElement>('.gallery-track a, [data-photo-grid] a').forEach((link) => link.addEventListener('click', (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const largePhoto = new Image();
  largePhoto.alt = link.querySelector('img')!.alt;
  largePhoto.src = link.href;
  dialog.append(largePhoto);
  dialog.showModal();
  dialog.addEventListener('close', () => largePhoto.remove(), { once: true });
}));
dialog.querySelector('button')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });


