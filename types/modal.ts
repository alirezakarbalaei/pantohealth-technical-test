export type ModalType = 'stationSearch' | 'stationDetails' | 'settings';

export interface ModalInstance {
  isOpen: boolean;
  props?: Record<string, unknown>;
}

export interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
  title: string;
}

export interface ModalManager {
  set: (modal: ModalType, component: React.ComponentType | undefined) => void;
  remove: (modal: ModalType) => void;
  isTopModal: (modal: ModalType) => boolean;
  getTopModal: () => ModalType | undefined;
  getComponent: (modal: ModalType) => React.ComponentType | undefined;
  removeAll: () => void;
  getAllModals: () => Map<ModalType, React.ComponentType | undefined>;
}