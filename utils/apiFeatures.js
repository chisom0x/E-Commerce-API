
class ApiFeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString
    }

    filter(){
        // build query
        // if filtering
        const queryObj = {...this.queryString}
        const excludedFields= ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el=> delete queryObj [el])
       
       // advanced filtering
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
    
    this.query = this.query.find(JSON.parse(queryStr))

    return this;
    }
    
}

module.exports =ApiFeatures;