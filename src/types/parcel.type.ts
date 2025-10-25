export interface StatusLog {
  status: string;
  timestamp: string;
  updatedBy: string;
  note: string;
}

export interface ParcelDetails {
  type: string;
  weightKg: number;
  description: string;
}

export interface Parcel {
  _id: string;
  trackingId: string;
  currentStatus: string;
  receiverInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  parcelDetails: ParcelDetails;
  fee: number;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  statusHistory: StatusLog[];
  isBlocked: boolean;
}

export interface ParcelTrackingData {
  parcelType: string;
  destinationCity: string;
  currentStatus: string;
  statusLogs: StatusLog[];
  trackingId: string;
  createdAt: string;
  isBlocked: boolean;
}

export interface ParcelTrackingResponse {
  success: boolean;
  message: string;
  data: ParcelTrackingData;
}

export interface DailyTrend {
  count: number;
  date: string;
  formattedDate: string;
  percentage: number;
  trend: string;
}

export interface MostActiveDay {
  count: number;
  date: string;
  formattedDate: string;
}

export interface ParcelTrendsSummary {
  totalRequests: number;
  averagePerDay: number;
  mostActiveDay: MostActiveDay;
  period: string;
  startDate: string;
  endDate: string;
}

export interface ParcelTrendsData {
  summary: ParcelTrendsSummary;
  dailyTrends: DailyTrend[];
  trends: {
    last7Days: DailyTrend[];
    last30Days: null;
  };
}

export interface ParcelTrendsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ParcelTrendsData;
}