export interface SizeRow {
  size: string;
  chest: string;
  waist: string;
  hips: string;
  sleeve: string;
}

export const SIZE_TABLE: Record<"women" | "men", SizeRow[]> = {
  women: [
    { size: "40", chest: "80–84", waist: "62–66", hips: "88–92", sleeve: "59" },
    { size: "42", chest: "84–88", waist: "66–70", hips: "92–96", sleeve: "60" },
    { size: "44", chest: "88–92", waist: "70–74", hips: "96–100", sleeve: "60" },
    { size: "46", chest: "92–96", waist: "74–78", hips: "100–104", sleeve: "61" },
    { size: "48", chest: "96–100", waist: "78–82", hips: "104–108", sleeve: "61" },
  ],
  men: [
    { size: "46", chest: "92–96", waist: "78–82", hips: "96–100", sleeve: "62" },
    { size: "48", chest: "96–100", waist: "82–86", hips: "100–104", sleeve: "63" },
    { size: "50", chest: "100–104", waist: "86–90", hips: "104–108", sleeve: "63" },
    { size: "52", chest: "104–108", waist: "90–94", hips: "108–112", sleeve: "64" },
    { size: "54", chest: "108–112", waist: "94–98", hips: "112–116", sleeve: "64" },
    { size: "56", chest: "112–116", waist: "98–102", hips: "116–120", sleeve: "65" },
  ],
};
