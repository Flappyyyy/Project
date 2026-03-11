import React from 'react';
import StatusBadge from './StatusBadge';

const DashboardTable = ({ clients, onTogglePayment15, onTogglePayment30, onSelectClient }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-pink-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-rose-600">
                    <thead className="bg-pink-50 text-rose-900 font-semibold border-b border-pink-200">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Date</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Client Name</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Items</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Month</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">15-Day Payment</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">30-Day Payment</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {clients.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center text-pink-500">
                                    No clients found.
                                </td>
                            </tr>
                        ) : (
                            clients.map((client, index) => (
                                <tr
                                    key={client.id}
                                    className={`hover:bg-pink-50/80 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-pink-50/40'}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{client.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-rose-900 text-center">{client.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{client.items}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-pink-500">{client.month}</td>

                                    {/* 15-Day Payment Toggle */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => onTogglePayment15(client.id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${client.payment15.paid
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                : 'bg-white text-rose-600 border-pink-200 hover:bg-pink-100'
                                                }`}
                                        >
                                            {client.payment15.paid ? '✅ Paid' : '❌ Unpaid'}
                                            <span className="text-xs text-pink-300 ml-1">
                                                (₱{client.payment15.amount.toLocaleString()})
                                            </span>
                                        </button>
                                    </td>

                                    {/* 30-Day Payment Toggle */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => onTogglePayment30(client.id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${client.payment30.paid
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                : 'bg-white text-rose-600 border-pink-200 hover:bg-pink-100'
                                                }`}
                                        >
                                            {client.payment30.paid ? '✅ Paid' : '❌ Unpaid'}
                                            <span className="text-xs text-pink-300 ml-1">
                                                (₱{client.payment30.amount.toLocaleString()})
                                            </span>
                                        </button>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <StatusBadge status={client.status} />
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => onSelectClient(client)}
                                            className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-400 hover:text-white hover:border-rose-400 font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer"
                                        >
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardTable;
