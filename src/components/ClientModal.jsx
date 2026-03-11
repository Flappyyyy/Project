import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';

const ClientModal = ({ isOpen, onClose, onSave, client }) => {
    const isEditing = !!client;

    const [formData, setFormData] = useState({
        name: '',
        items: '',
        monthlyPayment: '',
        monthsToPay: '',
        startMonth: 'January',
        monthsPaid: '0',
    });

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name,
                items: client.items,
                monthlyPayment: (client.payment15.amount + client.payment30.amount).toString(),
                monthsToPay: client.monthsToPay ? client.monthsToPay.toString() : '5',
                startMonth: client.startMonth || 'January',
                monthsPaid: client.monthsPaid ? client.monthsPaid.toString() : '0',
            });
        } else {
            setFormData({
                name: '',
                items: '',
                monthlyPayment: '',
                monthsToPay: '',
                startMonth: 'January',
                monthsPaid: '0',
            });
        }
    }, [client, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-rose-950/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-pink-100">
                    <h2 className="text-xl font-bold text-rose-800">
                        {isEditing ? 'Edit Client' : 'Add New Client'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-pink-300 hover:text-rose-600 hover:bg-pink-100 rounded-full transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-rose-800 mb-1.5">Client Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all placeholder:text-pink-300"
                            placeholder="e.g. Juan Dela Cruz"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-rose-800 mb-1.5">Item/Benefit</label>
                        <input
                            required
                            type="text"
                            name="items"
                            value={formData.items}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all placeholder:text-pink-300"
                            placeholder="e.g. iPhone 13 Pro"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-rose-800 mb-1.5">Monthly Payment (Total)</label>
                            <input
                                required
                                type="number"
                                name="monthlyPayment"
                                value={formData.monthlyPayment}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all placeholder:text-pink-300"
                                min="0"
                                placeholder="4000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-rose-800 mb-1.5">Months to Pay</label>
                            <input
                                required
                                type="number"
                                name="monthsToPay"
                                value={formData.monthsToPay}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all placeholder:text-pink-300"
                                min="1"
                                placeholder="5"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-rose-800 mb-1.5">Start Month</label>
                            <select
                                name="startMonth"
                                value={formData.startMonth}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all bg-white cursor-pointer"
                            >
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-rose-800 mb-1.5">Months Already Paid</label>
                            <input
                                required
                                type="number"
                                name="monthsPaid"
                                value={formData.monthsPaid}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none transition-all placeholder:text-pink-300"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-3.5 flex gap-3 text-sm text-rose-700 mt-2">
                        <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <p>Note: The total payment will be split in half (15th and 30th schedules).</p>
                    </div>

                    <div className="pt-2 flex gap-3 justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 text-sm font-medium text-rose-700 hover:bg-pink-50 rounded-lg transition-colors border border-pink-200 bg-white cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm font-medium text-white bg-rose-400 hover:bg-rose-500 rounded-lg transition-colors shadow-sm cursor-pointer"
                        >
                            {isEditing ? 'Save Changes' : 'Save Client'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientModal;
