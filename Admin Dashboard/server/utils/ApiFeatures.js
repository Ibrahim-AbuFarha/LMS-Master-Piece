class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1)Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((ele) => delete queryObj[ele]);
    this.query = this.query.find(queryObj);
    //if we don't have any operator everything will work just fine
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; //convert query string into numb
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeatures;
