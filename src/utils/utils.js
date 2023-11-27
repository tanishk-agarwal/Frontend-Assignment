export const createResponseSchema = (uiSchema) => {
  var responseObject = {};
};

function compareItems(a, b) {
  return a.sort >= b.sort;
}
export const returnSortedBySort = (data) => {
  //data is an array of objects
  var curr = data;
  curr.sort(compareItems);

  return curr;
};
