'use client';

import type { ComponentType } from 'react';
import type { ModalType } from '@/types/modal';

class ModalManager {
  private static instance: ModalManager | null = null;
  private modals: Map<ModalType, ComponentType | undefined>;

  private constructor() {
    this.modals = new Map();
  }

  public static getInstance(): ModalManager {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager();
    }

    return ModalManager.instance;
  }

  set(modal: ModalType, component: ComponentType | undefined) {
    this.modals.set(modal, component);
    // Push the modal state to history
    window.history.pushState({ modal }, '', '');
  }

  remove(modal: ModalType) {
    this.modals.delete(modal);

    // If the modal being removed is the topmost modal, pop the state
    if (this.isTopModal(modal)) {
      window.history.back();
    }
  }

  isTopModal(modal: ModalType) {
    const modalsArray = Array.from(this.modals.keys());
    const topmostModal = modalsArray[modalsArray.length - 1];

    return topmostModal === modal;
  }

  getTopModal(): ModalType | undefined {
    const modalsArray = Array.from(this.modals.keys());

    return modalsArray[modalsArray.length - 1];
  }

  getComponent(modal: ModalType): ComponentType | undefined {
    return this.modals.get(modal);
  }

  removeAll() {
    this.modals.clear();
  }

  getAllModals() {
    return this.modals;
  }
}

export const modalManager = ModalManager.getInstance();