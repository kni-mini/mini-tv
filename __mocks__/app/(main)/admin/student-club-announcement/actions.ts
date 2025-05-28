// Mock for student-club-announcement actions
export const createClubAnnouncement = jest.fn().mockResolvedValue({
  success: true,
  message: 'Default mock message',
});
