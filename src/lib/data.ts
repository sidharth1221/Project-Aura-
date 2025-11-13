export const kpiData = [
    { title: "Total Capacity", value: "1,250 MW", change: "+12%", changeType: "positive" },
    { title: "Potential Capacity", value: "3,400 MW", change: "+5%", changeType: "positive" },
    { title: "Carbon Offset", value: "850k tons", change: "+20%", changeType: "positive" },
    { title: "Homes Powered", value: "450,000", change: "+8%", changeType: "positive" },
];

export const overviewChartData = [
    { name: "Jan", actual: 4000, potential: 2400 },
    { name: "Feb", actual: 3000, potential: 1398 },
    { name: "Mar", actual: 2000, potential: 9800 },
    { name: "Apr", actual: 2780, potential: 3908 },
    { name: "May", actual: 1890, potential: 4800 },
    { name: "Jun", actual: 2390, potential: 3800 },
    { name: "Jul", actual: 3490, potential: 4300 },
    { name: "Aug", actual: 3620, potential: 4500 },
    { name: "Sep", actual: 3120, potential: 4100 },
    { name: "Oct", actual: 2890, potential: 3900 },
    { name: "Nov", actual: 2540, potential: 3500 },
    { name: "Dec", actual: 2980, potential: 4100 },
];


export const districtChartData = [
    { name: "Northwood", value: 400, "fill": "hsl(var(--chart-1))" },
    { name: "Southside", value: 300, "fill": "hsl(var(--chart-2))" },
    { name: "Westend", value: 200, "fill": "hsl(var(--chart-3))" },
    { name: "Eastgate", value: 278, "fill": "hsl(var(--chart-4))" },
    { name: "Downtown", value: 189, "fill": "hsl(var(--chart-5))" },
];

export const recentActivityData = [
    {
        user: "Alex Johnson",
        action: "connected a new solar inverter.",
        timestamp: "5 minutes ago",
        district: "Northwood",
    },
    {
        user: "Maria Garcia",
        action: "generated a Solar API report.",
        timestamp: "1 hour ago",
        district: "Southside",
    },
    {
        user: "Chen Wei",
        action: "reached 1MWh of total production.",
        timestamp: "3 hours ago",
        district: "Westend",
    },
    {
        user: "Fatima Al-Sayed",
        action: "updated her user profile.",
        timestamp: "1 day ago",
        district: "Eastgate",
    },
    {
        user: "David Smith",
        action: "generated a Solar API report.",
        timestamp: "2 days ago",
        district: "Northwood",
    },
];

export const communityLeaderboardData = [
    { district: "Northwood", anonymizedUserId: "User-a4b1", production: 1250 },
    { district: "Southside", anonymizedUserId: "User-c2d3", production: 1180 },
    { district: "Northwood", anonymizedUserId: "User-e5f6", production: 1120 },
    { district: "Westend", anonymizedUserId: "User-g7h8", production: 1050 },
    { district: "Eastgate", anonymizedUserId: "User-i9j0", production: 980 },
    { district: "Downtown", anonymizedUserId: "User-k1l2", production: 950 },
    { district: "Southside", anonymizedUserId: "User-m3n4", production: 920 },
    { district: "Westend", anonymizedUserId: "User-o5p6", production: 880 },
];
