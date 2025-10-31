import { addMinutes, format, parse, isBefore, isAfter } from "date-fns";

/**
 * Calculate end time from start time and duration (minutes)
 */
export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const start = new Date();
  start.setHours(hours, minutes, 0, 0);
  const end = addMinutes(start, durationMinutes);
  return format(end, "HH:mm");
}

/**
 * Check if two time slots overlap
 */
export function slotsOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const parseTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m; // Convert to minutes since midnight
  };

  const s1 = parseTime(start1);
  const e1 = parseTime(end1);
  const s2 = parseTime(start2);
  const e2 = parseTime(end2);

  // Overlap: (s1 < e2) && (s2 < e1)
  return s1 < e2 && s2 < e1;
}

/**
 * Generate 30-minute time slots for a given date
 */
export function generateTimeSlots(date: Date, packageDurationMinutes: number): string[] {
  const slots: string[] = [];
  const slotDuration = 30; // Base slot duration
  const slotsNeeded = Math.ceil(packageDurationMinutes / slotDuration);

  // Start at 9:00 AM, end at 9:00 PM
  for (let hour = 9; hour < 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push(timeString);
    }
  }

  return slots;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "EEEE, MMMM d, yyyy");
}

/**
 * Format time for display
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

