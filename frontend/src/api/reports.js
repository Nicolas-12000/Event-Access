import api from './axiosInstance';
import { saveAs } from 'file-saver';

export const reportService = {
  generateReport: async (reportData) => {
    const response = await api.post('/reports', reportData, {
      responseType: 'blob'
    });
    
    // Create a filename based on the event and dates
    const filename = `report-event-${reportData.eventId}-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Use file-saver to download the Excel file
    saveAs(new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }), filename);
    
    return true;
  }
};
