export interface GenericModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }