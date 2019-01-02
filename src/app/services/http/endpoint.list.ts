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
            url: "http://enterwebsite/nlp?id=1",
            cache: false,
            appendToURI: true
        }
    }
}