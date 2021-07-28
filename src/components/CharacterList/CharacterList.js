import React, {useState} from "react";
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import {Backdrop, Box, Fade, Input, Modal, Typography} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";
import CharacterModal from "../CharacterModal";

const displayName = 'Character List';
const propTypes = {
    characters: PropTypes.array,
    selectUniverse: PropTypes.func,
    universeName: PropTypes.string,
    searchQuery: PropTypes.string,
    setSearchQuery: PropTypes.func
};
const defaultProps = {
    characters: [],
    selectUniverse: false,
    universeName: null,
    searchQuery: '',
    setSearchQuery: false
};
const CharacterList = props => {
    const {characters, selectUniverse, universeName, searchQuery, setSearchQuery} = props;
    const [characterDetailsOpen, setCharacterDetailsOpen] = useState(false);
    const [activeCharacterData, setActiveCharacterData] = useState(false);
    const classes = useStyles();
    const handleSetSearchQuery = e => {
        setSearchQuery(e.target.value ? e.target.value : '');
    }
    const handleCharacterDetailsOpen = i => {
        if (i !== undefined) {
            setActiveCharacterData(characters[i]);
            setCharacterDetailsOpen(true);
        }
    };
    const handleCharacterDetailsClose = () => {
        setCharacterDetailsOpen(false);
    };
    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <div>
                    <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                        <Typography variant={'h5'} className={classes.titleUniverse}>
                            <HomeIcon className={classes.homeIcon} onClick={() => {
                                selectUniverse(null);
                            }}/> {universeName ? universeName : null}
                        </Typography>
                        <div className={classes.searchWrapper}>
                            <Input name={'search'} type={'text'} placeholder={'Search'}
                                   onChange={handleSetSearchQuery}
                                   value={searchQuery}/>
                        </div>
                    </Box>
                </div>
                <Table aria-label={'Characters'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {characters.map((value, index) =>
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {value.name ? value.name : value.aliases && value.aliases[0] ? `${value.aliases[0]} (alias)` : 'Unknown'}
                                </TableCell>
                                <TableCell align="right">
                                    <div className={classes.linkDetails}
                                         onClick={() => handleCharacterDetailsOpen(index)}>
                                        Details...
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <CharacterModal characterDetailsOpen={characterDetailsOpen}
                            handleCharacterDetailsClose={handleCharacterDetailsClose}
                            activeCharacterData={activeCharacterData}/>
        </>
    )
};
const useStyles = makeStyles((theme) => ({
    homeIcon: {
        cursor: 'pointer',
        float: 'left'
    },
    titleUniverse: {
        padding: 5,
        textAlign: 'center'
    },
    tableContainer: {
        maxHeight: '70vh',
        overflow: 'hidden',
        overflowY: 'auto'
    },
    searchWrapper: {
        padding: 5,
        textAlign: 'right'
    },
    linkDetails: {
        cursor: 'pointer'
    },
}));
CharacterList.displayName = displayName;
CharacterList.propTypes = propTypes;
CharacterList.defaultProps = defaultProps;
export default CharacterList;