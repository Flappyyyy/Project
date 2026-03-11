import React from 'react';

const StatusBadge = ({ status }) => {
    let badgeStyle = "bg-pink-100 text-rose-700 border-pink-200";
    let icon = "";

    if (status === "Paid") {
        badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
        icon = "✅";
    } else if (status === "Partially Paid") {
        badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
        icon = "⚠️";
    } else if (status === "Unpaid") {
        badgeStyle = "bg-rose-50 text-rose-700 border-rose-200";
        icon = "❌";
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyle}`}>
            <span>{icon}</span>
            {status}
        </span>
    );
};

export default StatusBadge;
