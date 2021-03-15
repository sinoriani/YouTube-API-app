const queryToObj = (query) => {
    return {
        access_token: query.access_token,
        expiry_date : query.expiry_date,
        id_token : query.id_token,
        refresh_token : query.refresh_token,
        score: query.score,
        token_type : query.token_type
    }
}

exports.queryToObj = queryToObj;