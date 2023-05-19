
window.onerror = (message, source, lineno, colno, error) => {
  console.log("debug.window.onerror");
  console.log(`message: ${message}`);
  console.log(`source: ${source}`);
  console.log(`lineno: ${lineno}`);
  console.log(`colno: ${colno}`);
  console.log(`error: ${error}`);

  return true;
};
