document.addEventListener('DOMContentLoaded', async () => {
  const dropdownElementList = Array.from(document.querySelectorAll('.dropdown-toggle'));
  const dropdownSubmenuElementList = Array.from(document.querySelectorAll('.dropdown-submenu-toggle'));
  const dropdownMenus = Array.from(document.querySelectorAll('.dropdown-menu'));

  dropdownElementList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl);
  });

  dropdownSubmenuElementList.map(function (el: HTMLElement) {
    el.onclick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      el.parentNode?.querySelector('ul')?.classList.toggle('show');
    };
  });

  document.addEventListener('click', function (e) {
    // Function to remove show class from dropdowns that are open
    closeAllSubmenus();
    // Hamburger menu
    const target = e.target as HTMLElement;
    if (target.classList.contains('hamburger-toggle')) {
      target.children[0].classList.toggle('active');
    }
  });

  function closeAllSubmenus() {
    // Function to remove show class from dropdowns that are open
    dropdownMenus.map(function (menu) {
      menu.classList.remove('show');
    });
  }
});
