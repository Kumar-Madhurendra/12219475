export function generateUniqueCode(existingCodes = []) {
  let code;
  do {
    code = Math.random().toString(36).substring(2, 8);
  } while (existingCodes.includes(code));
  return code;
}