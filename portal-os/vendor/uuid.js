// Minimal uuid v4 generator (non-cryptographic) for WindowManager use.
// For production, replace with a proper UUID lib.
export function v4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = (c === 'x') ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export default { v4 };
