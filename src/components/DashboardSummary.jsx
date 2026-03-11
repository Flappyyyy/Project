import React from 'react';
import { Users, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';

const SummaryCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="bg-white rounded-xl shadow-sm border border-pink-200 p-5 flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-pink-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-rose-900">{value}</h3>
            {subtitle && <p className="text-sm text-pink-300 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClass}`}>
            <Icon className="w-5 h-5" />
        </div>
    </div>
);

const DashboardSummary = ({ clients }) => {
    const totalClients = clients.length;
    const fullyPaid = clients.filter(c => c.status === "Paid").length;
    const partiallyPaid = clients.filter(c => c.status === "Partially Paid").length;
    const unpaid = clients.filter(c => c.status === "Unpaid").length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SummaryCard
                title="Total Clients"
                value={totalClients}
                icon={Users}
                colorClass="bg-rose-50 text-rose-500"
            />
            <SummaryCard
                title="Fully Paid"
                value={fullyPaid}
                icon={CheckCircle2}
                colorClass="bg-emerald-50 text-emerald-600"
            />
            <SummaryCard
                title="Partially Paid"
                value={partiallyPaid}
                icon={AlertCircle}
                colorClass="bg-amber-50 text-amber-600"
            />
            <SummaryCard
                title="Unpaid"
                value={unpaid}
                icon={CreditCard}
                colorClass="bg-rose-50 text-rose-600"
            />
        </div>
    );
};

export default DashboardSummary;
