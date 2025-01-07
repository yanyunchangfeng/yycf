import { useTranslation } from '@/app/i18n/client';
import { Lng } from '@/app/shared';
import { Separator } from '@/components/ui/separator';

export const Usage: React.FC<Lng> = ({ lng }) => {
  const { t } = useTranslation(lng, 'basic');
  return (
    <>
      <Separator className="my-8" />
      <div className="flex flex-col gap-4  w-1/2 mx-auto max-sm:w-full">
        <h2 className="text-xl self-center" suppressHydrationWarning>
          {t('usageConfig.title')}
        </h2>
        <p suppressHydrationWarning>{t('usageConfig.firstStep')}</p>
        <p suppressHydrationWarning>{t('usageConfig.secondStep')}</p>
        <p suppressHydrationWarning>{t('usageConfig.thirdStep')}</p>
      </div>
    </>
  );
};
