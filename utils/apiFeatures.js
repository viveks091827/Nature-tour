class apiFeatures {
    constructor (query, queryString) {
      this.query = query
      this.queryString = queryString
    } 
  
    filter() {
      const queryElements = this.queryString
      const excludeField = []
  
      excludeField.forEach((ele) => { delete queryElements[ele]})
  
      // 1B) Advance filtering
      this.queryString = JSON.stringify(queryElements)
      this.queryString = this.queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
      this.queryString = JSON.parse(this.queryString)
      
      this.query = this.query.find(this.queryString)
      return this
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ')
        this.query = this.query.sort(sortBy)
      }
      else {
        this.query = this.query.sort('createdAt -price')
      }
      return this
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const queryFields = this.queryString.fields.split(',').join(' ')
        this.query = this.query.select(queryFields)
      }
      else {
        this.query = this.query.select('-__v')
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 100
      const skip = (page - 1) * limit
      
      this.query = this.query.skip(skip).limit(limit)
  
    return this
    }
  
  }

  module.exports = apiFeatures