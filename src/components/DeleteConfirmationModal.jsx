import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, clientName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-rose-950/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm relative z-10 p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>

                <h3 className="text-lg font-bold text-rose-900 mb-2">Delete Client</h3>
                <p className="text-sm text-pink-500 mb-6">
                    Are you sure you want to delete <span className="font-semibold text-rose-700">{clientName}</span>? This action cannot be undone.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-pink-100 rounded-lg transition-colors border border-pink-200 bg-white cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
