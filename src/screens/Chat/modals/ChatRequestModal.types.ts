// ChatRequestModal.types.ts
export interface ChatRequestModalProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onReport: () => void;
}
