function ccyFormat(num) {
  var sign = num.toString().charAt(0);
  let reverse = num.toString().split("").reverse().join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join(".").split("").reverse().join("");

  if (sign === "-") {
    ribuan = `-${ribuan}`;
  }

  return ` ${ribuan},00.`;
}

export default ccyFormat;
