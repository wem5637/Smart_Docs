import axios from 'axios'

export const executeRelationshipAnalysis = () => {
    // Will contain non-repetetive data
    let rawFilteredData = {};

    // filters data repetitions
    // saves unique instance as key in obj.
    // performs hasOwnProperty lookup in obj to avoid data repetition.
    this.state.nlpRelationships.forEach(item => {
      let connection = 'unknown'
      if(item.predicateId.substring(0, 3) === 'EDU'){
        connection = 'Educational Affiliation'
      } else if(item.predicateId === 'PER-EMPLOYEE-MEMBER-OF'){
        connection = 'Employee / Member of'
      } else if(item.predicateId === 'ORG-TOP-EMPLOYEES'){
        connection = 'Top Employee of Organization'
      } else if(item.predicateId === 'PER-RESIDENCE'){
        connection = 'Resedential'
      } else if(item.predicateId === 'PER-PARENTS'){
        connection = 'Parental'
      }

      if(!rawFilteredData.hasOwnProperty(item.arg1)){
        rawFilteredData[item.arg1] = {
          relatedTo: item.arg2,
          connection: connection,
          likelihood: Math.floor(item.confidence * 100) + '%'
        }
      }
    })

    console.log('rawFilteredData', rawFilteredData)
  }

  export const executeEntityAnalysis = () => {
    let mainEntities = [];
    this.state.nlpEntity.forEach(entity => {
      mainEntities.push(entity.normalized)
    })
    console.log('some the key words in this text are: ', mainEntities)
  }

  export const executeSentimentAnalysis = () => {
    let places = [];
    let people = [];
    let organizations = [];
    let products = [];
    let nationalities = [];
    let emails = [];
    let urls = [];

    this.state.nlpSentiment.forEach(function(word){
      if(word.type === 'PERSON'){
        people.push(word.normalized)
      } else if(word.type === 'LOCATION'){
        places.push(word.normalized)
      } else if(word.type === 'ORGANIZATION'){
        organizations.push(word.normalized)
      } else if(word.type === 'PRODUCT'){
        products.push(word.normalized)
      } else if(word.type === 'NATIONALITY'){
        nationalities.push(word.normalized)
      } else if(word.type === 'EMAIL'){
        emails.push(word.normalized)
      } else if(word.type === 'URL'){
        urls.push(word.normalized)
      }
    })

    console.log('results were: places', places, "people", people, "organizations", organizations)
  }

  export const findEntity = (text) => {
    return axios({
      method: 'post',
      url: 'http://localhost:3000/api/analyze/entity',
      data:{
        text: text
      }
    })
    .then(result => result)
    .then(result => {
      console.log('sent our text to nlp and back again!', result.data.entities)
      this.setState({nlpEntity: result.data.entities})
    })
  }

  export const findSentiment = (text) => {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/api/analyze/sentiment',
        data:{
          text: text
        }
      })
      .then(result => result)
      .then(result => {
        console.log('sent our text to nlp and back again!', result.data)
        this.setState({nlpSentiment: result.data.entities})
      })
    }

  export const findRelationships = (text) => {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/api/analyze/relationships',
        data:{
          text: text
        }
      })
      .then(result => result)
      .then(result => {
        console.log('sent our relationship text to nlp and back again!', result.data)
        this.setState({nlpRelationships: result.data.relationships})
      })
    }

  export const findResearchOnInput = (tags) => {
    return axios({
      method: 'post',
      url: 'http://localhost:3000/api/research',
      data: {
        tags: tags
      }
    })
    .then(result => result)
    .then(result => {
      console.log('found some research for you', result.data.message.items)
    })
  }
