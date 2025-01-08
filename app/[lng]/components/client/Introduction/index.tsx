import { useTranslation } from '@/app/i18n/client';

export const Introduction: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, 'basic');
  return (
    <div className="flex flex-col gap-2 mb-4">
      <h1 className="text-6xl font-bold self-center" suppressHydrationWarning>
        {t('title')}
      </h1>
      <p className="text-lg" suppressHydrationWarning>
        {t('introConfig.first')}
      </p>
      <p className="text-lg" suppressHydrationWarning>
        {t('introConfig.second')}
      </p>
    </div>
  );
};
