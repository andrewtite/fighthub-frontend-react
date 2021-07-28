import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const displayName = 'Intro';
const Intro = props => {
    const classes = useStyles();
    return (
        <div>
            <hr/>
            <Typography variant={'h2'} align={'center'}>
                Character Browser
            </Typography>
            <p className={classes.textIntro}>
                Welcome to the character browser, which will hopefully grant Andrew Tite with a
                development position at FlightHub. I'm excited to have you here!
            </p>
            <hr/>
            <Typography align={'center'} className={classes.textInstruction}>
                Select one of the character universe logos above to begin.
            </Typography>
            <hr/>
        </div>
    )
};
const useStyles = makeStyles((theme) => ({
    textIntro: {
        margin: 10
    },
    textInstruction: {
        fontWeight: 600
    },
}));
Intro.displayName = displayName;
export default Intro;