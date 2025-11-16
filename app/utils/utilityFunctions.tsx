export function classNames(...classes :any) { return classes.filter(Boolean).join(' '); }
export const toTitleCase = (str: string): string => str?.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

export const getParamsStringFromHash = (
  searchAttrs: Record<string, string | number | boolean | undefined | null>
): string => {
  if (!searchAttrs || Object.keys(searchAttrs).length === 0) return "";

  const arr = Object.keys(searchAttrs)
    .map((key) => {
      const value = searchAttrs[key];
      if (value !== undefined && value !== null && value !== "") {
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      }
      return null;
    })
    .filter(Boolean); // removes nulls

  return arr.length ? `?${arr.join("&")}` : "";
};

export const confirmBeforeDeletion = () => { return window.confirm('Are you sure to delete this record ?'); }
