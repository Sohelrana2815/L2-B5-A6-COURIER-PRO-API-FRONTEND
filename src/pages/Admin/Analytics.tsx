import { useGetCurrentStatusCountsQuery } from "@/redux/features/parcel/parcel.api";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  type PieLabelRenderProps,
} from "recharts";
import ParcelTrends from "./ParcelTrends";
import { Truck } from "lucide-react";

const RADIAN = Math.PI / 180;
const COLORS = {
  delivered: "#00C49F", // Green
  cancelled: "#FF8042", // Orange/Red
  returned: "#FFBB28", // Yellow
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  // Type guard to ensure we have valid numeric values
  if (typeof percent !== "number" || percent < 0.05) return null;
  if (typeof cx !== "number" || typeof cy !== "number") return null;
  if (typeof innerRadius !== "number" || typeof outerRadius !== "number")
    return null;
  if (typeof midAngle !== "number") return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-muted p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{`${data.name}: ${data.value}`}</p>
        <p className="text-sm text-gray-300">{`Percentage: ${data.successRate}%`}</p>
      </div>
    );
  }
  return null;
};

export default function Analytics({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetCurrentStatusCountsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground flex items-center gap-4">
          <p>Loading analytics...</p>
          <Truck  className="text-xl text-primary"/>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-destructive">
          Error loading analytics data
        </div>
      </div>
    );
  }

  const statusCounts = apiResponse?.data;
  if (!statusCounts) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">No data available</div>
      </div>
    );
  }

  // Transform API data to chart format
  const chartData = [
    {
      name: "Delivered",
      value: statusCounts.delivered || 0,
      percentage:
        statusCounts.total > 0
          ? (statusCounts.delivered / statusCounts.total) * 100
          : 0,
      fill: COLORS.delivered,
    },
    {
      name: "Cancelled",
      value: statusCounts.cancelled || 0,
      percentage:
        statusCounts.total > 0
          ? (statusCounts.cancelled / statusCounts.total) * 100
          : 0,
      fill: COLORS.cancelled,
    },
    {
      name: "Returned",
      value: statusCounts.returned || 0,
      percentage:
        statusCounts.total > 0
          ? (statusCounts.returned / statusCounts.total) * 100
          : 0,
      fill: COLORS.returned,
    },
  ].filter((item) => item.value > 0); // Only show statuses that have values

  // If no data to display
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">
          No parcel data available
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-muted-foreground">
            Parcel Analytics
          </h2>
          <h2 className="font-semibold text-4xl">
            Parcel Delivery Success Rate
          </h2>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-2xl font-bold text-green-600">
              {statusCounts.successRate?.toFixed(1) || 0}%
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={isAnimationActive}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value, entry: any) => (
                    <span style={{ color: entry.color }}>
                      {value} ({entry.payload.value})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {statusCounts.delivered || 0}
                </div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {statusCounts.cancelled || 0}
                </div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {statusCounts.returned || 0}
                </div>
                <div className="text-sm text-muted-foreground">Returned</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {statusCounts.total || 0}
                </div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ParcelTrends />
    </>
  );
}
