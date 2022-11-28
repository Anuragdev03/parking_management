class ArrayMethod {
  static getRandomElement(arr: [], n: number, notInclude?: any[]) {
    let result = new Array(n),
      len: number = arr.length,
      taken = new Array(len);

    let filteredArray = [];
    if(Array.isArray(notInclude) && notInclude?.length > 0) {
    filteredArray = Array.isArray(notInclude) &&  arr.filter((data) => {
      if(notInclude?.includes(data.id)) {
        return
      } else {
        return data
      }
     })
    } else {
      filteredArray = arr;
    }

    len = filteredArray?.length
    taken = new Array(len);    

    if (n > len) return;
    while (n--) {      
      let x = Math.floor(Math.random() * len);
      
      result[n] = filteredArray[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
  }
}

export default ArrayMethod;
