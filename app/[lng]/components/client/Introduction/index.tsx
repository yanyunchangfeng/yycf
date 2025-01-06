import { useTranslation } from '@/app/i18n/client';

export const Introduction: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, 'basic');
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="text-6xl font-bold" suppressHydrationWarning>
        {t('title')}
      </h1>
      <p className="text-lg" suppressHydrationWarning>
        {t('introduction')}
      </p>
    </div>
  );
};
