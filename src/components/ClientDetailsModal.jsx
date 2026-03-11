import React from 'react';
import { X, Edit, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ClientDetailsModal = ({ isOpen, onClose, client, onEdit, onDelete }) => {
    if (!isOpen || !client) return null;

    const monthly = (client.payment15.amount + client.payment30.amount);
    const targetMonths = client.monthsToPay || 5;
    const totalPlan = monthly * targetMonths;

    let currentMonthPaid = 0;
    if (client.payment15.paid) currentMonthPaid += client.payment15.amount;
    if (client.payment30.paid) currentMonthPaid += client.payment30.amount;

    const monthsPaid = client.monthsPaid || 0;
    const totalPaid = (monthsPaid * monthly) + currentMonthPaid;
    const remaining = totalPlan - totalPaid;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-rose-950/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-pink-100">
                    <h2 className="text-xl font-bold text-rose-800">
                        Client Details
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-pink-300 hover:text-rose-600 hover:bg-pink-100 rounded-full transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6 text-rose-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-rose-900">{client.name}</h3>
                            <p className="text-pink-500 mt-1">{client.items}</p>
                        </div>
                        <StatusBadge status={client.status} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-pink-50 p-4 rounded-xl border border-pink-100">
                        <div>
                            <p className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">Start Month</p>
                            <p className="font-medium text-rose-800">{client.startMonth || client.month}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">Current Month</p>
                            <p className="font-medium text-rose-800">{client.month}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">Target Months</p>
                            <p className="font-medium text-rose-800">{targetMonths}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">Months Paid</p>
                            <p className="font-medium text-rose-500">{monthsPaid}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-pink-100 text-sm">
                            <span className="text-rose-600">Total Plan Amount</span>
                            <span className="font-semibold text-rose-900">₱{totalPlan.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-pink-100 text-sm">
                            <span className="text-rose-600">Total Paid Amount</span>
                            <span className="font-semibold text-emerald-600">₱{totalPaid.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-rose-800 font-bold">Remaining Balance</span>
                            <span className="font-bold text-rose-600 text-lg">₱{Math.max(0, remaining).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="pt-2 flex gap-3 justify-end mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                onEdit(client);
                            }}
                            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-pink-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        >
                            <Edit className="w-4 h-4" /> Edit Details
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                onDelete(client);
                            }}
                            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" /> Delete Client
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDetailsModal;
