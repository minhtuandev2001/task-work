module.exports.pagination = (objectPagination, query, countDocument) => {
  if (query.limit) {
    objectPagination.limit = Number(query.limit)
  }
  if (query.page) {
    objectPagination.currentPage = Number(query.page)
  }
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit
  objectPagination.totalPage = Math.ceil(countDocument / objectPagination.limit)
  return objectPagination;
}