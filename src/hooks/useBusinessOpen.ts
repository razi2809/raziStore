import { useState, useEffect } from "react";
import { Day, IBusiness } from "../@types/business";

const useBusinessOpen = (business: IBusiness | null) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!business) return;
    const isBusinessOpen = (): boolean => {
      //get what day is
      const currentDay = new Date().getDay();
      //get what hour is
      const currentHour = new Date().getHours();
      // Map getDay() to IOpeningHours keys
      const dayOfWeek: Day[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const today: Day = dayOfWeek[currentDay];
      const openingHoursToday = business.OpeningHours[today];
      // If the business is closed all day
      if (openingHoursToday.close) {
        return false;
      }
      // Convert opening and closing hours to 24-hour format (0 - 23)

      if (!openingHoursToday.opening || !openingHoursToday.closing)
        return false;
      const openingHour = parseInt(openingHoursToday.opening.split(":")[0]);
      const closingHour = parseInt(openingHoursToday.closing.split(":")[0]);
      // Check if the current time is within the business hours

      if (currentHour >= openingHour && currentHour < closingHour) {
        return true;
      }

      return false;
    };
    setIsOpen(isBusinessOpen);
  }, [business]);

  return isOpen;
};
export default useBusinessOpen;
