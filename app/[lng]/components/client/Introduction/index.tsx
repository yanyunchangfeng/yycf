import { useTranslation } from '@/app/i18n/client';
import { Lng } from '@/app/shared';

export const Introduction: React.FC<Lng> = ({ lng }) => {
  const { t } = useTranslation(lng, 'basic');
  return (
    <div className="flex flex-col justify-center items-center gap-2 mb-4">
      <h1 className="text-6xl font-bold" suppressHydrationWarning>
        {t('title')}
      </h1>
      <p className="text-lg" suppressHydrationWarning>
        {t('introduction')}
      </p>
    </div>
  );
};
