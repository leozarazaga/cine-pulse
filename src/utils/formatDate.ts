const dateFormatter = new Intl.DateTimeFormat(undefined, {
	// dateStyle: "full",
	// timeStyle: "short",
	year: "numeric",
	month: "long",
	day: "numeric",
	// hour: "numeric",
	// minute: "numeric",
	// second: "numeric",
	// timeZoneName: "short",
});

/**
 * Format a ISO Date to a string
 *
 * @param isoDate ISO Date
 */
export const isoToFormattedString = (isoDate: string | null | undefined) => {
  if (!isoDate) return "Unknown";

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    return "Unknown";
  }

  return dateFormatter.format(date);
};

/**
 * Format a Unix timestamp to a string
 *
 * @param timestamp Timestamp in milliseconds
 */
export const timestampToFormattedString = (timestamp: number) => {
	const date = new Date(timestamp);
	return dateFormatter.format(date);
}

/**
 * Calculates the current age based on birth date.
 *
 * @param birth - The person's birthdate (1985-06-20).
 * @returns The calculated age in years.
 *
 * Subtracts the birth year from the current year and adjusts for whether
 * the birthday has occurred yet this year.
 */
export const calculateCurrentAge = (birth: string): number => {
  const birthDate = new Date(birth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // If birthday hasn't happened yet this year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

/**
 * Calculates the age at death based on birth and death dates.
 *
 * @param birth - The person's birthdate (1915-12-07).
 * @param death - The person's death date (2014-06-24).
 * @returns The calculated age at death in years.
 *
 * Subtracts the birth year from the death year and adjusts for whether the birthday
 * had occurred yet in the death year.
 */
export const calculateAgeAtDeath = (birth: string, death: string): number => {
	const birthDate = new Date(birth);
	const deathDate = new Date(death);
	let age = deathDate.getFullYear() - birthDate.getFullYear();

	const monthDiff = deathDate.getMonth() - birthDate.getMonth();
	const dayDiff = deathDate.getDate() - birthDate.getDate();
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
};
