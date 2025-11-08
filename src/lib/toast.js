// Very small toast helper that creates a transient DOM toast.
export function showToast(message, { duration = 3000, type = 'info' } = {}) {
  try {
    const containerId = 'gpj-toast-container';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      Object.assign(container.style, {
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-end',
      });
      document.body.appendChild(container);
    }

    const el = document.createElement('div');
    el.textContent = message;
    Object.assign(el.style, {
      background: type === 'error' ? '#fee2e2' : type === 'success' ? '#dcfce7' : '#e0f2fe',
      color: '#0f172a',
      padding: '10px 14px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(2,6,23,0.08)',
      maxWidth: '320px',
      fontSize: '13px',
    });

    container.appendChild(el);

    setTimeout(() => {
      el.style.transition = 'opacity 300ms ease, transform 300ms ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    }, duration - 300);

    setTimeout(() => {
      try { container.removeChild(el); } catch (e) {}
    }, duration + 50);
  } catch (err) {
    // Fallback: console
    console.log('Toast:', message);
  }
}
