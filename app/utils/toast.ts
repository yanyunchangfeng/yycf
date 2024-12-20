import { toast as defaultToast } from 'sonner';

export const toast = (message: React.ReactNode) => {
  defaultToast(message, {
    position: 'top-center',
    action: {
      label: 'Undo',
      onClick: () => {
        console.log('🚀 ~ toast ~ Undo:');
      }
    }
  });
};
