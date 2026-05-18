'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
  title = 'Delete Request',
  message = 'Are you sure you want to delete this job request? This action cannot be undone.',
  confirmText = 'Delete Request',
  cancelText = 'Cancel',
  itemName = null,
}) {
  // Handle keyboard events (Esc to close, Enter to confirm)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
      if (e.key === 'Enter' && !isLoading) {
        onConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLoading, onCancel, onConfirm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1729] to-[#071226] p-8 shadow-2xl">

              {/* Close Button */}
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="absolute top-6 right-6 text-slate-400 hover:text-white disabled:opacity-50 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-500/20 to-rose-600/20 border border-red-500/30 flex items-center justify-center">
                  <Trash2 className="h-8 w-8 text-red-400" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-center mb-3">
                {title}
              </h2>

              {/* Message */}
              <p className="text-center text-slate-300 leading-relaxed mb-8">
                {message}
                {itemName && (
                  <span className="block mt-2 text-white font-semibold">
                    "{itemName}"
                  </span>
                )}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-2xl border border-white/10 text-white font-semibold hover:border-sky-500/50 hover:bg-sky-500/5 disabled:opacity-50 transition-all duration-200"
                >
                  {cancelText}
                </button>

                <motion.button
                  onClick={onConfirm}
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="flex-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/40 disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>{confirmText}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Keyboard Hint */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white text-xs font-mono">
                    Esc
                  </kbd>
                  <span>to cancel</span>
                </div>
                {!isLoading && (
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20 text-white text-xs font-mono">
                      Enter
                    </kbd>
                    <span>to delete</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
