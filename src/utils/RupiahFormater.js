function ccyFormat(num) {
  var sign = num ? num.toString().charAt(0) : "";
  let reverse = num ? num.toString().split("").reverse().join("") : "";
  let ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan ? ribuan.join(".").split("").reverse().join("") : "";

  if (sign === "-") {
    ribuan = `-${ribuan}`;
  }

  return ` ${ribuan},00.`;
}

export default ccyFormat;
