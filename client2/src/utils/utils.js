export const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

export const calculateTotal = (items) => items.reduce((total, {
    price,
    quantity
}) => total + (price * quantity), 0).toFixed(2);