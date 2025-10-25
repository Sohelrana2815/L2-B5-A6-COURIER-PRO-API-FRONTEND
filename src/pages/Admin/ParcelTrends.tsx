import { useGetParcelTrendsQuery } from "@/redux/features/parcel/parcel.api";
import type { ParcelTrendsData } from "@/types/parcel.type";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ParcelTrends() {
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetParcelTrendsQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">
          Loading parcel trends...
        </div>
      </div>
    );
  }
  console.log(apiResponse);
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-destructive">
          Error loading parcel trends data
        </div>
      </div>
    );
  }

  const trendsData = apiResponse as ParcelTrendsData;
  if (!trendsData?.dailyTrends?.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground">
          No parcel trends data available
        </div>
      </div>
    );
  }

  const chartData = trendsData.dailyTrends.map((trend) => ({
    date: trend.formattedDate,
    count: trend.count,
  }));

  const mostActiveDay = trendsData.summary.mostActiveDay;

  return (
    <>
      <div className="space-y-6 mt-64">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold w-full text-center">
            Parcel Request Trends (7 Days)
          </h3>
        </div>

        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={16}
              />
              <YAxis fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "black" }}
                formatter={(value: number) => [value, "Requests"]}
                labelFormatter={(label: string) => `Date: ${label}`}
              />
              <Bar
                dataKey="count"
                fill="#FF500B"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Card for Most Active Day */}
      <div className="bg-card p-4 rounded-lg border border-primary/50 max-w-sm">
        <div className="text-sm text-foreground font-medium">
          Most Active Day
        </div>
        <div className="text-lg font-bold text-muted-foreground">
          {mostActiveDay.formattedDate}
        </div>
        <div className="text-sm text-muted-foreground">
          {mostActiveDay.count} requests
        </div>
      </div>
    </>
  );
}
