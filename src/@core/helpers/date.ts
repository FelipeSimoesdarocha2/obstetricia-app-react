const currentDate = new Date();

export enum TimeOfTheDay {
  Morning = 0,
  Afternoon = 1,
  Night = 2,
}

function getCurrentTimeOfTheDay(actualHour: number): TimeOfTheDay {
  if (actualHour < 12) {
    return TimeOfTheDay.Morning;
  }

  if (actualHour < 18) {
    return TimeOfTheDay.Afternoon;
  }

  return TimeOfTheDay.Night;
}

function getIntervalTimeToNextTimeOfTheDayInMs(actualHour: number): number {
  const timeOfTheDay = getCurrentTimeOfTheDay(actualHour);

  switch (timeOfTheDay) {
    case TimeOfTheDay.Morning:
      return 12 * 3600000 - actualHour * 3600000;
    case TimeOfTheDay.Afternoon:
      return 18 * 3600000 - actualHour * 3600000;
    case TimeOfTheDay.Night:
      return 24 * 3600000 - actualHour * 3600000;
    default:
      return 3600000;
  }
}

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const yearsList = (baseYear: number) => {
  return [baseYear - 4, baseYear - 3, baseYear - 2, baseYear - 1, baseYear];
};

const daysOfMonth = (month: number, year: number) => {
  const lastDateOfMonth = new Date(year, month + 1, 0);
  return Array.from({ length: lastDateOfMonth.getDate() }).map(
    (_, index) => index + 1
  );
};

const currentMonth = () => {
  return currentDate.getMonth();
};

const currentYear = () => {
  return currentDate.getFullYear();
};

export default {
  getCurrentTimeOfTheDay,
  getIntervalTimeToNextTimeOfTheDayInMs,
  monthNames,
  daysOfMonth,
  currentMonth,
  currentYear,
  yearsList,
};
