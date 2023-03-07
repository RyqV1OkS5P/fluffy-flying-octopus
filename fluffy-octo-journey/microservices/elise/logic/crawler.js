
//TODO: Find a smarter way to import. Maybe using an object?

import  { getSummonerById, getMatchByMatchId, getLeagueEntries, getMatchesByPuuid } from "../utils/riot-api-wrapper.js"

enum States {
    START,
    GET_MATCHES,
    GET_MATCH_INFO,
    PARSE_DATA, //Comit every 400 matches
    END
}

// Transition function
const transition = (state, input) => {
    switch (state) {
        case States.START:
            switch (input) {
                case States.START:
                    // code for making request to get matches
                    return States.GET_MATCHES;
            }
        case States.GET_MATCHES:
            switch (input) {
                case States.SUCCESS:
                    // code for making request to get match by id
                    return States.GET_MATCH_BY_ID;
                case States.FAILURE:
                    // code for handling error
                    return States.END;
            }
        case States.GET_MATCH_BY_ID:
            switch (input) {
                case States.SUCCESS:
                    // code for parsing data
                    return States.PARSE_DATA;
                case States.FAILURE:
                    // code for handling error
                    return States.END;
            }
        case States.PARSE_DATA:
            switch (input) {
                case States.SUCCESS:
                    // code for handling success
                    return States.END;
                case States.FAILURE:
                    // code for handling error
                    return States.END;
            }
        case States.END:
            return States.END;
    }
};

// Run state machine
const run = () => {
    // Loop until state is final
    while (state !== States.END) {
        // Transition to next state
        state = transition(state, input);
    }
};




