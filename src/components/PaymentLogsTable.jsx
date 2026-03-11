import React from 'react';
import StatusBadge from './StatusBadge';

const PaymentLogsTable = ({ logs }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Confirmed Payment Logs</h2>
                    <p className="text-sm text-slate-500 mt-1">A permanent record of all fully processed transactions.</p>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-pink-50 text-rose-900 font-semibold border-b border-pink-200">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Date Saved</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Client Name</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Item</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Paid Month</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">15-Day Amt</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">30-Day Amt</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Total Received</th>
                            <th className="px-6 py-4 whitespace-nowrap text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center text-slate-500">
                                    No payment logs found.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log, index) => {
                                const total = (log.payment15_amount?.amount || 0) + (log.payment30_amount?.amount || 0);

                                return (
                                    <tr key={log.id} className={`hover:bg-pink-50/80 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-pink-50/40'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-slate-500">
                                            {new Date(log.date_saved).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-rose-900 text-center">
                                            {log.client_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{log.items}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-pink-600">
                                            {log.month_paid_for}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-slate-500">
                                            ₱{log.payment15_amount?.amount?.toLocaleString() || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-slate-500">
                                            ₱{log.payment30_amount?.amount?.toLocaleString() || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-emerald-600">
                                            ₱{total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <StatusBadge status={log.status} />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentLogsTable;
