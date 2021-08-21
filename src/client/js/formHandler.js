import { validate } from './validator'

function getKey(getAnalysis, formText) {
    return fetch('http://localhost:8000/key', {
        mode: 'cors',
        headers: {
        'Access-Control-Allow-Origin':'*'
    }})
    .then(res => res.json())
    .then(function(res) {
        if (res.api_key != null) {
            getAnalysis(res.api_key, formText)
        }
        return null
    })
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('text').value
    const valid = validate(formText);
    if(valid != null){
        document.getElementById('error').innerHTML = valid
    } else {
        getKey(getAnalysis, formText);
    }
}

function getAnalysis(api_key, formText) {
    if (api_key != null) {
        const formData  = new FormData();
        formData.append('key', api_key);
        formData.append('lang', 'en');
        formData.append('txt', formText);
        fetch('https://api.meaningcloud.com/sentiment-2.1', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('agreement').innerHTML = `agreement: ${res.agreement} <br>`
            document.getElementById('confidence').innerHTML = `confidence: ${res.confidence} <br>`
            document.getElementById('irony').innerHTML = `irony: ${res.irony} <br>`
            document.getElementById('score_tag').innerHTML = `score_tag: ${res.score_tag} <br>`
            document.getElementById('subjectivity').innerHTML = `subjectivity: ${res.subjectivity} <br>`
            document.getElementById('error').innerHTML = ''
        })
        .catch((e) => {console.log(e)})
    } else {
        document.getElementById('error').innerHTML = "Please add api key"
    }
}

export { handleSubmit }
