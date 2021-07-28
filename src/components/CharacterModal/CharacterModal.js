import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, Fade, Modal} from "@material-ui/core";
import PropTypes from "prop-types";

const displayName = 'Character Modal';
const propTypes = {
    characterDetailsOpen: PropTypes.bool,
    handleCharacterDetailsClose: PropTypes.func,
    activeCharacterData: PropTypes.array,
};
const defaultProps = {
    characterDetailsOpen: false,
    handleCharacterDetailsClose: false,
    activeCharacterData: []
};
const CharacterModal = props => {
    const {characterDetailsOpen, handleCharacterDetailsClose, activeCharacterData} = props;
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="Character Modal"
            aria-describedby="Character Modal"
            className={classes.modal}
            open={characterDetailsOpen}
            onClose={handleCharacterDetailsClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={characterDetailsOpen}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">{activeCharacterData.name}</h2>
                    <div id="transition-modal-description">
                        {activeCharacterData.aliases && activeCharacterData.aliases.length > 0 && (
                            <p>
                                <strong>Aliases:</strong><br/>
                                <ul>
                                    {activeCharacterData.aliases.map((value, index) =>
                                        <li key={index}>{value}</li>
                                    )}
                                </ul>
                            </p>
                        )}
                        {activeCharacterData.gender && (
                            <p>
                                <strong>Gender:</strong> {activeCharacterData.gender ? activeCharacterData.gender.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()) : null}
                            </p>
                        )}
                        {activeCharacterData.appearedIn && activeCharacterData.appearedIn.length > 0 && (
                            <p>
                                <strong>Appeared In:</strong><br/>
                                <ul>
                                    {activeCharacterData.appearedIn.map((value, index) =>
                                        <li key={index}>{value}</li>
                                    )}
                                </ul>
                            </p>
                        )}
                        {activeCharacterData.starships && activeCharacterData.starships.length > 0 && (
                            <p>
                                <strong>Starships:</strong><br/>
                                <ul>
                                    {activeCharacterData.starships.map((value, index) =>
                                        <li key={index}>{value}</li>
                                    )}
                                </ul>
                            </p>
                        )}
                        {activeCharacterData.vehicles && activeCharacterData.vehicles.length > 0 && (
                            <p>
                                <strong>Vehicles:</strong><br/>
                                <ul>
                                    {activeCharacterData.vehicles.map((value, index) =>
                                        <li key={index}>{value}</li>
                                    )}
                                </ul>
                            </p>
                        )}
                        {activeCharacterData.allegiances && activeCharacterData.allegiances.length > 0 && (
                            <p>
                                <strong>Allegiances:</strong><br/>
                                <ul>
                                    {activeCharacterData.allegiances.map((value, index) =>
                                        <li key={index}>{value}</li>
                                    )}
                                </ul>
                            </p>
                        )}
                    </div>
                </div>
            </Fade>
        </Modal>
    )
};
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));
CharacterModal.displayName = displayName;
CharacterModal.propTypes = propTypes;
CharacterModal.defaultProps = defaultProps;
export default CharacterModal;