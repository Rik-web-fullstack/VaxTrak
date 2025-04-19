function toggleDropdown() {
    const dropdown = document.getElementById('menuDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  
    // Close sub-dropdown when main dropdown toggles
    document.getElementById('profileSubDropdown').style.display = 'none';
  }
  
  function toggleSubDropdown() {
    const subDropdown = document.getElementById('profileSubDropdown');
    subDropdown.style.display = subDropdown.style.display === 'block' ? 'none' : 'block';
  }