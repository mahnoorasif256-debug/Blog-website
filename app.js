document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });


  /////////////////

  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.blog-row');
      row.style.opacity = '0';
      row.style.transform = 'translateX(-8px)';
      setTimeout(() => row.remove(), 200);
    });
  });

  ///////////////////////////


 document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    });
  });

  // Approve / reject (demo only, no backend)
  document.querySelectorAll('.btn-approve, .btn-reject').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.approval-row');
      row.style.opacity = '0';
      row.style.transform = 'translateY(-6px)';
      setTimeout(() => row.remove(), 200);
    });
  });

  // Delete (demo only)
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.mod-row');
      row.style.opacity = '0';
      setTimeout(() => row.remove(), 200);
    });
  });

  // Ban (demo only)
  document.querySelectorAll('.btn-ban').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Banned';
      btn.style.opacity = '0.6';
      btn.disabled = true;
    });
  });

