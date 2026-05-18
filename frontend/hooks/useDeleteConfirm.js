'use client';

import { useState, useCallback } from 'react';

export function useDeleteConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const openModal = useCallback((action) => {
    setPendingAction(action);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
    setPendingAction(null);
  }, []);

  const confirm = useCallback(async () => {
    if (!pendingAction) return;

    try {
      setIsLoading(true);
      await pendingAction();
      closeModal();
    } catch (error) {
      console.error('Delete error:', error);
      setIsLoading(false);
      throw error;
    }
  }, [pendingAction, closeModal]);

  return {
    isOpen,
    isLoading,
    openModal,
    closeModal,
    confirm,
  };
}
