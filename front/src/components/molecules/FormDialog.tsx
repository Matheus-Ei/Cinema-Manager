import { ReusableDialog } from "@/components/atoms/Dialog";
import { FormField, FormObj } from "@/components/atoms/Form";
import { SetStateType } from "@/types/global";

interface FormDialogProps {
  isOpen: { open: boolean };
  setIsOpen: SetStateType<{ open: boolean }>;
  title: string;
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void;
  fields: FormField[];
}

export const FormDialog = ({
  isOpen,
  setIsOpen,
  title,
  onSubmit,
  fields,
}: FormDialogProps) => {
  return (
    <ReusableDialog title={title} isOpen={isOpen} setOpen={setIsOpen}>
      <FormObj onSubmit={onSubmit} fields={fields} />
    </ReusableDialog>
  );
};
