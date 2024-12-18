import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import React from 'react';
import { Loader2 } from 'lucide-react';
interface ConfirmProps {
  open: boolean;
  data?: Partial<{
    description: string;
  }>;
  onCancel: () => Promise<void>;
  onOk: () => Promise<void>;
}

export const Confirm: React.FC<ConfirmProps> = ({ open, data, onCancel, onOk }) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const handleCancel = async () => {
    setConfirmLoading(false);
    await onCancel();
  };
  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await onOk();
    } catch (err) {
      console.log(`${err}`);
    } finally {
      setConfirmLoading(false);
    }
  };
  const description = React.useMemo(() => {
    if (data?.description) {
      return <AlertDialogDescription className="whitespace-pre-line">{data?.description}</AlertDialogDescription>;
    }
  }, [data]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure? </AlertDialogTitle>
          {description}
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOk} disabled={confirmLoading}>
            {confirmLoading ? <Loader2 className="animate-spin" /> : null}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
