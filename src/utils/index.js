// Convert number to thousand separated string
// eg: 100000 -> 100,000
export function thousands_separators(num) {
  if (num) {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
  return num;
}

export function formattedPrice(price) {
  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
}

export const capitalizeString = (str) => {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  else return "";
};
