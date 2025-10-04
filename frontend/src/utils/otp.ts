// Separate OTP-related functionality into its own module
export async function verifyOTP(mobile: string, otp: string): Promise<boolean> {
  // Simulate OTP verification
  // In production, this would make an API call to verify the OTP
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, any 6-digit OTP is considered valid
      resolve(otp.length === 6);
    }, 1000);
  });
}

export async function sendOTP(mobile: string): Promise<boolean> {
  // Simulate sending OTP
  // In production, this would make an API call to send the OTP
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}