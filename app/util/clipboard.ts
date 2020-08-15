export default (str: string) => {
  const i = document.createElement('textarea');
  i.value = str;
  document.body.appendChild(i);
  i.select();
  document.execCommand('Copy');
  document.body.removeChild(i);
}
