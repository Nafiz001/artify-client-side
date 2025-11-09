export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatPrice = (price) => {
  if (!price) return 'Price not specified';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isLongEnough = password.length >= 6;
  
  return {
    isValid: hasUpperCase && hasLowerCase && isLongEnough,
    errors: {
      uppercase: !hasUpperCase,
      lowercase: !hasLowerCase,
      length: !isLongEnough
    }
  };
};

export const getInitials = (name) => {
  if (!name) return '';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

export const getCategoryColor = (category) => {
  const colors = {
    'Painting': 'badge-primary',
    'Sculpture': 'badge-secondary',
    'Photography': 'badge-accent',
    'Digital Art': 'badge-info',
    'Drawing': 'badge-success',
    'Mixed Media': 'badge-warning',
    'Printmaking': 'badge-error',
    'Textile Art': 'badge-neutral'
  };
  return colors[category] || 'badge-ghost';
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
