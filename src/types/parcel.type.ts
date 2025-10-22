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
  parcelDetails: {
    type: string;
    weightKg: number;
    description: string;
  };
  fee: number;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    updatedBy: string;
    note: string;
  }>;
  isBlocked: boolean;
}