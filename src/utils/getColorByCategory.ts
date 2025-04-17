export const getColorByCategory = (category: string) => {
  switch (category) {
    case 'to-do':
      return {
        border: 'border-l-2 border-blue-400',
        background: 'bg-blue-400',
        hover: 'hover:bg-blue-400/20',
      };
    case 'in-progress':
      return {
        border: 'border-l-2 border-amber-400',
        background: 'bg-amber-400',
        hover: 'hover:bg-amber-400/20',
      };
    case 'completed':
      return {
        border: 'border-l-2 border-emerald-400',
        background: 'bg-emerald-400',
        hover: 'hover:bg-emerald-400/20',
      };
    default:
      return {
        border: 'border-l-2 border-gray-400',
        background: 'bg-gray-400',
        hover: 'hover:bg-gray-400/20',
      };
  }
};
