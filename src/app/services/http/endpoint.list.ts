export const ENDPOINTLIST:Object = {
bp:{
        getBillerList: {
            method: "GET",
            url: "/src/app/stub/biller-list.json",
            cache: false,
            appendToURI: false
        },
        getSubmitResponse: {
            method: "GET",
            url: "http://localhost:9000/nlp?",
            cache: false,
            appendToURI: true
        }
    }
}